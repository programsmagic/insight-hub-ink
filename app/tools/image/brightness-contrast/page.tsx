"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { adjustBrightnessContrast, base64ToBlob } from "@/lib/tools/image-utils";
import { Sun } from "lucide-react";

export default function ImageBrightnessContrastPage() {
  const [imagePreview, setImagePreview] = useState("");
  const [adjustedImage, setAdjustedImage] = useState("");
  const [brightness, setBrightness] = useState([0]);
  const [contrast, setContrast] = useState([0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImagePreview(imageUrl);
      setAdjustedImage("");
    };
    reader.readAsDataURL(file);
  };

  const handleApply = async () => {
    if (!imagePreview) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const bright = brightness[0] ?? 0;
      const cont = contrast[0] ?? 0;
      const adjusted = await adjustBrightnessContrast(imagePreview, bright, cont);
      setAdjustedImage(adjusted);
      toast.success("Adjustments applied successfully!");
    } catch (error) {
      toast.error("Failed to apply adjustments");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!adjustedImage) return;
    const blob = base64ToBlob(adjustedImage, "image/png");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "adjusted-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
  };

  const handleClear = () => {
    setImagePreview("");
    setAdjustedImage("");
    setBrightness([0]);
    setContrast([0]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Brightness & Contrast"
      description="Adjust brightness and contrast of images with precise controls. Perfect for photo editing, correcting exposure, and enhancing image quality. All processing happens in your browser."
      category="Image Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="file-input">Upload Image</Label>
          <input
            id="file-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              disabled={isProcessing}
            >
              Choose Image
            </Button>
            <Button onClick={handleClear} variant="ghost" size="sm" disabled={isProcessing}>
              Clear
            </Button>
          </div>
        </div>

        {imagePreview && (
          <div className="space-y-4">
            <div>
              <Label>Brightness: {brightness[0] ?? 0 > 0 ? "+" : ""}{brightness[0] ?? 0}</Label>
              <Slider
                value={brightness}
                onValueChange={setBrightness}
                min={-100}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Contrast: {contrast[0] ?? 0 > 0 ? "+" : ""}{contrast[0] ?? 0}</Label>
              <Slider
                value={contrast}
                onValueChange={setContrast}
                min={-100}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
            <Button onClick={handleApply} disabled={isProcessing}>
              <Sun className="w-4 h-4 mr-2" />
              {isProcessing ? "Applying..." : "Apply Adjustments"}
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {imagePreview && (
            <div className="space-y-4">
              <Label>Original Image</Label>
              <div className="border rounded-lg p-4 bg-muted flex justify-center">
                <img
                  src={imagePreview}
                  alt="Original"
                  className="max-w-full max-h-[400px] object-contain"
                />
              </div>
            </div>
          )}

          {adjustedImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Adjusted Image</Label>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <div className="border rounded-lg p-4 bg-muted flex justify-center">
                <img
                  src={adjustedImage}
                  alt="Adjusted"
                  className="max-w-full max-h-[400px] object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload an image file</li>
            <li>Adjust brightness slider (-100 to +100)</li>
            <li>Adjust contrast slider (-100 to +100)</li>
            <li>Click "Apply Adjustments" to process the image</li>
            <li>Download the adjusted image</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
