"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { removeBackground, imageToBase64, base64ToBlob } from "@/lib/tools/image-utils";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { Scissors, Download, Upload, X } from "lucide-react";

export default function ImageBackgroundRemoverPage() {
  const analytics = useToolAnalytics("image-background-remover");
  const [originalImage, setOriginalImage] = useState("");
  const [processedImage, setProcessedImage] = useState("");
  const [threshold, setThreshold] = useState([128]);
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
      setProcessedImage("");
      analytics.trackInteraction("image", "upload");
    } catch (error) {
      toast.error("Failed to load image");
      analytics.trackError("Failed to load image");
    }
  };

  const handleRemoveBackground = async () => {
    if (!originalImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await removeBackground(originalImage, threshold[0]);
      setProcessedImage(result);
      toast.success("Background removed successfully!");
      analytics.trackUsage("remove-background", {
        threshold: threshold[0],
      });
    } catch (error) {
      toast.error("Failed to remove background");
      analytics.trackError("Failed to remove background", { threshold: threshold[0] });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const blob = base64ToBlob(processedImage, "image/png");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image-no-background.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setOriginalImage("");
    setProcessedImage("");
    setThreshold([128]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Background Remover"
      description="Remove backgrounds from images to create transparent PNGs. Perfect for product photos, portraits, and creating images with transparent backgrounds. All processing happens in your browser."
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
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
            </div>

            {originalImage && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Brightness Threshold: {threshold[0]}</Label>
                  <Slider
                    value={threshold}
                    onValueChange={setThreshold}
                    min={0}
                    max={255}
                    step={5}
                    disabled={isProcessing}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Lower (removes more)</span>
                    <span>Higher (removes less)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adjust this value based on your image. Lower values remove lighter backgrounds, higher values keep more of the image.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleRemoveBackground}
                    disabled={isProcessing || !originalImage}
                    className="flex-1"
                  >
                    <Scissors className="w-4 h-4 mr-2" />
                    {isProcessing ? "Processing..." : "Remove Background"}
                  </Button>
                  <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 font-semibold mb-2">
                    Note: Basic Background Removal
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    This tool uses a basic algorithm that works best with images that have light or uniform backgrounds. 
                    For complex backgrounds or professional results, consider using AI-powered services. 
                    Adjust the threshold slider to fine-tune the results.
                  </p>
                </div>
              </div>
            )}
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

            {processedImage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Processed Image (Transparent Background)</Label>
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                </div>
                <div className="border rounded-lg p-4 bg-muted flex justify-center" style={{
                  backgroundImage: "repeating-conic-gradient(#f0f0f0 0% 25%, #ffffff 0% 50%) 50% / 20px 20px",
                }}>
                  <img
                    src={processedImage}
                    alt="Background Removed"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  The checkerboard pattern shows transparency
                </p>
              </div>
            )}

            {!originalImage && !processedImage && (
              <div className="border rounded-lg p-12 bg-muted flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-center">
                  Upload an image and remove its background to see preview
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload an image with a background you want to remove</li>
            <li>Adjust the brightness threshold slider to fine-tune the removal</li>
            <li>Click "Remove Background" to process the image</li>
            <li>Download the result as a PNG with transparent background</li>
            <li>Works best with images that have light or uniform backgrounds</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
