"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { resizeImage, imageToBase64, base64ToBlob } from "@/lib/tools/image-utils";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { Maximize2 } from "lucide-react";

export default function ImageResizerPage() {
  const analytics = useToolAnalytics("image-resizer");
  const [originalImage, setOriginalImage] = useState("");
  const [resizedImage, setResizedImage] = useState("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
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
      setOriginalImage(base64);
      setResizedImage("");

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        if (maintainAspectRatio) {
          const aspectRatio = img.width / img.height;
          if (width / height > aspectRatio) {
            setHeight(Math.round(width / aspectRatio));
          } else {
            setWidth(Math.round(height * aspectRatio));
          }
        } else {
          setWidth(img.width);
          setHeight(img.height);
        }
      };
      img.src = base64;
      analytics.trackInteraction("image", "upload");
    } catch (error) {
      toast.error("Failed to load image");
      analytics.trackError("Failed to load image");
    }
  };

  const handleResize = async () => {
    if (!originalImage) {
      toast.error("Please upload an image first");
      return;
    }

    if (width <= 0 || height <= 0) {
      toast.error("Width and height must be greater than 0");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await resizeImage(originalImage, width, height, maintainAspectRatio);
      setResizedImage(result);
      toast.success("Image resized successfully!");
      analytics.trackUsage("resize", {
        width,
        height,
        maintainAspectRatio,
        originalWidth: imageDimensions.width,
        originalHeight: imageDimensions.height,
      });
    } catch (error) {
      toast.error("Failed to resize image");
      analytics.trackError("Failed to resize image", { width, height });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedImage) return;

    const blob = base64ToBlob(resizedImage, "image/png");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resized-image-${width}x${height}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setOriginalImage("");
    setResizedImage("");
    setWidth(800);
    setHeight(600);
    setMaintainAspectRatio(true);
    setImageDimensions({ width: 0, height: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to specific dimensions while maintaining aspect ratio. Perfect for optimizing images for web, social media, or print. All processing happens in your browser."
      category="Image Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
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
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                disabled={isProcessing}
                className="w-full"
              >
                Choose Image
              </Button>
            </div>

            {originalImage && imageDimensions.width > 0 && (
              <div className="text-sm text-muted-foreground">
                Original size: {imageDimensions.width} × {imageDimensions.height} pixels
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="maintain-aspect">Maintain Aspect Ratio</Label>
                <Switch
                  id="maintain-aspect"
                  checked={maintainAspectRatio}
                  onCheckedChange={(checked) => {
                    setMaintainAspectRatio(checked);
                    analytics.trackInteraction("aspect-ratio", "toggle", { enabled: checked });
                    if (checked && originalImage && imageDimensions.width > 0) {
                      const aspectRatio = imageDimensions.width / imageDimensions.height;
                      if (width / height > aspectRatio) {
                        setHeight(Math.round(width / aspectRatio));
                      } else {
                        setWidth(Math.round(height * aspectRatio));
                      }
                    }
                  }}
                  disabled={isProcessing || !originalImage}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    min={1}
                    max={10000}
                    value={width}
                    onChange={(e) => {
                      const w = Math.max(1, parseInt(e.target.value) || 1);
                      setWidth(w);
                      if (maintainAspectRatio && originalImage && imageDimensions.width > 0) {
                        const aspectRatio = imageDimensions.width / imageDimensions.height;
                        setHeight(Math.round(w / aspectRatio));
                      }
                    }}
                    disabled={isProcessing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    min={1}
                    max={10000}
                    value={height}
                    onChange={(e) => {
                      const h = Math.max(1, parseInt(e.target.value) || 1);
                      setHeight(h);
                      if (maintainAspectRatio && originalImage && imageDimensions.width > 0) {
                        const aspectRatio = imageDimensions.width / imageDimensions.height;
                        setWidth(Math.round(h * aspectRatio));
                      }
                    }}
                    disabled={isProcessing}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleResize}
                  disabled={isProcessing || !originalImage}
                  className="flex-1"
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  {isProcessing ? "Resizing..." : "Resize Image"}
                </Button>
                <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {originalImage && (
              <div className="space-y-2">
                <Label>Original Image</Label>
                <div className="border rounded-lg p-4 bg-muted flex justify-center">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
              </div>
            )}

            {resizedImage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Resized Image ({width} × {height}px)</Label>
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="border rounded-lg p-4 bg-muted flex justify-center">
                  <img
                    src={resizedImage}
                    alt="Resized"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
              </div>
            )}

            {!originalImage && !resizedImage && (
              <div className="border rounded-lg p-12 bg-muted flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-center">
                  Upload an image and resize it to see preview
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload an image file</li>
            <li>Set desired width and height in pixels</li>
            <li>Toggle "Maintain Aspect Ratio" to keep proportions or allow distortion</li>
            <li>Click "Resize Image" to generate the resized version</li>
            <li>Download the resized image</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
