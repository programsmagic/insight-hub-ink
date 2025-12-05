"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { addWatermark, imageToBase64, base64ToBlob } from "@/lib/tools/image-utils";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { Droplet } from "lucide-react";

type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export default function ImageWatermarkPage() {
  const analytics = useToolAnalytics("image-watermark");
  const [baseImage, setBaseImage] = useState("");
  const [watermarkedImage, setWatermarkedImage] = useState("");
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkImage, setWatermarkImage] = useState("");
  const [position, setPosition] = useState<WatermarkPosition>("bottom-right");
  const [opacity, setOpacity] = useState([50]);
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [isProcessing, setIsProcessing] = useState(false);
  const baseFileInputRef = useRef<HTMLInputElement>(null);
  const watermarkFileInputRef = useRef<HTMLInputElement>(null);

  const handleBaseImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      const base64 = await imageToBase64(file);
      setBaseImage(base64);
      setWatermarkedImage("");
      analytics.trackInteraction("base-image", "upload");
    } catch (error) {
      toast.error("Failed to load image");
      analytics.trackError("Failed to load base image");
    }
  };

  const handleWatermarkImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      const base64 = await imageToBase64(file);
      setWatermarkImage(base64);
      analytics.trackInteraction("watermark-image", "upload");
    } catch (error) {
      toast.error("Failed to load watermark image");
      analytics.trackError("Failed to load watermark image");
    }
  };

  const handleApplyWatermark = async () => {
    if (!baseImage) {
      toast.error("Please upload a base image first");
      return;
    }

    if (watermarkType === "text" && !watermarkText.trim()) {
      toast.error("Please enter watermark text");
      return;
    }

    if (watermarkType === "image" && !watermarkImage) {
      toast.error("Please upload a watermark image");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await addWatermark(baseImage, {
        type: watermarkType,
        text: watermarkType === "text" ? watermarkText : undefined,
        watermarkImageUrl: watermarkType === "image" ? watermarkImage : undefined,
        position,
        opacity: (opacity[0] ?? 50) / 100,
        fontSize,
        fontColor,
      });

      setWatermarkedImage(result);
      toast.success("Watermark applied successfully!");
      analytics.trackUsage("apply", {
        type: watermarkType,
        position,
        opacity: opacity[0],
      });
    } catch (error) {
      toast.error("Failed to apply watermark");
      analytics.trackError("Failed to apply watermark", { type: watermarkType });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!watermarkedImage) return;

    const blob = base64ToBlob(watermarkedImage, "image/png");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "watermarked-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setBaseImage("");
    setWatermarkedImage("");
    setWatermarkText("");
    setWatermarkImage("");
    setPosition("bottom-right");
    setOpacity([50]);
    setFontSize(24);
    setFontColor("#FFFFFF");
    if (baseFileInputRef.current) baseFileInputRef.current.value = "";
    if (watermarkFileInputRef.current) watermarkFileInputRef.current.value = "";
  };

  return (
    <ToolLayout
      title="Image Watermark"
      description="Add text or image watermarks to your images with customizable position, opacity, and styling. Protect your images and add branding with professional watermarking."
      category="Image Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="base-image">Base Image</Label>
              <input
                id="base-image"
                ref={baseFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleBaseImageSelect}
                className="hidden"
                disabled={isProcessing}
              />
              <Button
                onClick={() => baseFileInputRef.current?.click()}
                variant="outline"
                disabled={isProcessing}
                className="w-full"
              >
                Choose Base Image
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="watermark-type">Watermark Type</Label>
              <Select
                value={watermarkType}
                onValueChange={(value: "text" | "image") => {
                  setWatermarkType(value);
                  analytics.trackInteraction("watermark-type", "change", { type: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Watermark</SelectItem>
                  <SelectItem value="image">Image Watermark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {watermarkType === "text" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="watermark-text">Watermark Text</Label>
                  <Input
                    id="watermark-text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="Enter watermark text"
                    disabled={isProcessing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                  <Slider
                    id="font-size"
                    min={12}
                    max={72}
                    step={2}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0] ?? 24)}
                    disabled={isProcessing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-color">Font Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="font-color"
                      type="color"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                      className="w-20 h-10"
                      disabled={isProcessing}
                    />
                    <Input
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                      placeholder="#FFFFFF"
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="watermark-image">Watermark Image</Label>
                <input
                  id="watermark-image"
                  ref={watermarkFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleWatermarkImageSelect}
                  className="hidden"
                  disabled={isProcessing}
                />
                <Button
                  onClick={() => watermarkFileInputRef.current?.click()}
                  variant="outline"
                  disabled={isProcessing}
                  className="w-full"
                >
                  Choose Watermark Image
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select
                value={position}
                onValueChange={(value: WatermarkPosition) => {
                  setPosition(value);
                  analytics.trackInteraction("position", "change", { position: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-center">Top Center</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="center-left">Center Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="center-right">Center Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-center">Bottom Center</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="opacity">Opacity: {opacity[0]}%</Label>
              <Slider
                id="opacity"
                min={0}
                max={100}
                step={5}
                value={opacity}
                onValueChange={setOpacity}
                disabled={isProcessing}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleApplyWatermark} disabled={isProcessing} className="flex-1">
                <Droplet className="w-4 h-4 mr-2" />
                {isProcessing ? "Processing..." : "Apply Watermark"}
              </Button>
              <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {baseImage && (
              <div className="space-y-2">
                <Label>Original Image</Label>
                <div className="border rounded-lg p-4 bg-muted flex justify-center">
                  <img
                    src={baseImage}
                    alt="Original"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
              </div>
            )}

            {watermarkedImage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Watermarked Image</Label>
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="border rounded-lg p-4 bg-muted flex justify-center">
                  <img
                    src={watermarkedImage}
                    alt="Watermarked"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
              </div>
            )}

            {!baseImage && !watermarkedImage && (
              <div className="border rounded-lg p-12 bg-muted flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-center">
                  Upload an image and apply watermark to see preview
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload your base image</li>
            <li>Choose text or image watermark type</li>
            <li>Enter text or upload watermark image</li>
            <li>Select position and adjust opacity</li>
            <li>For text watermarks: customize font size and color</li>
            <li>Click "Apply Watermark" to generate</li>
            <li>Download the watermarked image</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
