"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cropImage, base64ToBlob, imageToBase64 } from "@/lib/tools/image-utils";
import { InteractiveCropper } from "@/components/tools/interactive-cropper";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { Crop } from "lucide-react";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function ImageCropperPage() {
  const analytics = useToolAnalytics("image-cropper");
  const [imagePreview, setImagePreview] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState<"free" | "1:1" | "16:9" | "4:3" | "3:2">("free");
  const [isProcessing, setIsProcessing] = useState(false);
  const [useManualInput, setUseManualInput] = useState(false);
  const [manualCrop, setManualCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      const base64 = await imageToBase64(file);
      setImagePreview(base64);
      setCroppedImage("");

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        const initialCrop = {
          x: Math.floor(img.width * 0.1),
          y: Math.floor(img.height * 0.1),
          width: Math.floor(img.width * 0.8),
          height: Math.floor(img.height * 0.8),
        };
        setCropArea(initialCrop);
        setManualCrop(initialCrop);
      };
      img.src = base64;
      analytics.trackInteraction("image", "upload");
    } catch (error) {
      toast.error("Failed to load image");
      analytics.trackError("Failed to load image");
    }
  };

  const handleCropChange = (crop: CropArea) => {
    setCropArea(crop);
    setManualCrop(crop);
  };

  const handleCrop = async () => {
    if (!imagePreview) {
      toast.error("Please upload an image first");
      return;
    }

    const crop = useManualInput ? manualCrop : cropArea;

    if (crop.x < 0 || crop.y < 0 || crop.width <= 0 || crop.height <= 0) {
      toast.error("Invalid crop dimensions");
      return;
    }

    if (crop.x + crop.width > imageDimensions.width || crop.y + crop.height > imageDimensions.height) {
      toast.error("Crop area exceeds image dimensions");
      return;
    }

    setIsProcessing(true);
    try {
      const cropped = await cropImage(imagePreview, crop.x, crop.y, crop.width, crop.height);
      setCroppedImage(cropped);
      toast.success("Image cropped successfully!");
      analytics.trackUsage("crop", {
        method: useManualInput ? "manual" : "interactive",
        aspectRatio,
        dimensions: `${crop.width}x${crop.height}`,
      });
    } catch (error) {
      toast.error("Failed to crop image");
      analytics.trackError("Failed to crop image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!croppedImage) return;
    const blob = base64ToBlob(croppedImage, "image/png");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cropped-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setImagePreview("");
    setCroppedImage("");
    setCropArea({ x: 0, y: 0, width: 100, height: 100 });
    setManualCrop({ x: 0, y: 0, width: 100, height: 100 });
    setImageDimensions({ width: 0, height: 0 });
    setAspectRatio("free");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image Cropper"
      description="Crop images with interactive drag-to-select interface or precise manual controls. Choose aspect ratios, drag to position, and resize the crop area visually. Perfect for image editing and preparation."
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

        {imagePreview && imageDimensions.width > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
              <Select
                value={aspectRatio}
                onValueChange={(value: "free" | "1:1" | "16:9" | "4:3" | "3:2") => {
                  setAspectRatio(value);
                  analytics.trackInteraction("aspect-ratio", "change", { ratio: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free (No constraint)</SelectItem>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                  <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                  <SelectItem value="3:2">3:2 (Photo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={useManualInput ? "manual" : "interactive"} onValueChange={(v) => setUseManualInput(v === "manual")}>
              <TabsList>
                <TabsTrigger value="interactive">Interactive (Drag & Drop)</TabsTrigger>
                <TabsTrigger value="manual">Manual Input</TabsTrigger>
              </TabsList>

              <TabsContent value="interactive" className="space-y-4">
                <InteractiveCropper
                  imageUrl={imagePreview}
                  imageWidth={imageDimensions.width}
                  imageHeight={imageDimensions.height}
                  onCropChange={handleCropChange}
                  aspectRatio={aspectRatio}
                  disabled={isProcessing}
                />
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="crop-x">X Position (px)</Label>
                    <Input
                      id="crop-x"
                      type="number"
                      value={manualCrop.x}
                      onChange={(e) => {
                        const x = Math.max(0, parseInt(e.target.value) || 0);
                        setManualCrop({ ...manualCrop, x: Math.min(x, imageDimensions.width - manualCrop.width) });
                      }}
                      min={0}
                      max={imageDimensions.width - manualCrop.width}
                    />
                  </div>
                  <div>
                    <Label htmlFor="crop-y">Y Position (px)</Label>
                    <Input
                      id="crop-y"
                      type="number"
                      value={manualCrop.y}
                      onChange={(e) => {
                        const y = Math.max(0, parseInt(e.target.value) || 0);
                        setManualCrop({ ...manualCrop, y: Math.min(y, imageDimensions.height - manualCrop.height) });
                      }}
                      min={0}
                      max={imageDimensions.height - manualCrop.height}
                    />
                  </div>
                  <div>
                    <Label htmlFor="crop-width">Width (px)</Label>
                    <Input
                      id="crop-width"
                      type="number"
                      value={manualCrop.width}
                      onChange={(e) => {
                        const width = Math.max(1, parseInt(e.target.value) || 1);
                        const constrainedWidth = Math.min(width, imageDimensions.width - manualCrop.x);
                        let height = manualCrop.height;
                        if (aspectRatio !== "free") {
                          const ratio = aspectRatio === "1:1" ? 1 : aspectRatio === "16:9" ? 16 / 9 : aspectRatio === "4:3" ? 4 / 3 : 3 / 2;
                          height = constrainedWidth / ratio;
                        }
                        setManualCrop({ ...manualCrop, width: constrainedWidth, height });
                      }}
                      min={1}
                      max={imageDimensions.width - manualCrop.x}
                    />
                  </div>
                  <div>
                    <Label htmlFor="crop-height">Height (px)</Label>
                    <Input
                      id="crop-height"
                      type="number"
                      value={manualCrop.height}
                      onChange={(e) => {
                        const height = Math.max(1, parseInt(e.target.value) || 1);
                        const constrainedHeight = Math.min(height, imageDimensions.height - manualCrop.y);
                        let width = manualCrop.width;
                        if (aspectRatio !== "free") {
                          const ratio = aspectRatio === "1:1" ? 1 : aspectRatio === "16:9" ? 16 / 9 : aspectRatio === "4:3" ? 4 / 3 : 3 / 2;
                          width = constrainedHeight * ratio;
                        }
                        setManualCrop({ ...manualCrop, width, height: constrainedHeight });
                      }}
                      min={1}
                      max={imageDimensions.height - manualCrop.y}
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Image size: {imageDimensions.width} × {imageDimensions.height} pixels
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={handleCrop} disabled={isProcessing} className="w-full">
              <Crop className="w-4 h-4 mr-2" />
              {isProcessing ? "Cropping..." : "Crop Image"}
            </Button>
          </div>
        )}

        {croppedImage && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Cropped Image</Label>
              <Button onClick={handleDownload} variant="outline" size="sm">
                Download
              </Button>
            </div>
            <div className="border rounded-lg p-4 bg-muted flex justify-center">
              <img
                src={croppedImage}
                alt="Cropped"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload an image file</li>
            <li><strong>Interactive Mode:</strong> Drag the crop area to move it, drag the corner handle to resize</li>
            <li><strong>Manual Mode:</strong> Enter precise pixel values for position and dimensions</li>
            <li>Select an aspect ratio to lock proportions (optional)</li>
            <li>Click "Crop Image" to apply the crop</li>
            <li>Download the cropped image</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
