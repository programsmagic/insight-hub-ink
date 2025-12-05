"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { rotateImage, base64ToBlob } from "@/lib/tools/image-utils";
import { RotateCw } from "lucide-react";

export default function ImageRotatorPage() {
  const [imagePreview, setImagePreview] = useState("");
  const [rotatedImage, setRotatedImage] = useState("");
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
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
      setRotatedImage("");
    };
    reader.readAsDataURL(file);
  };

  const handleRotate = async () => {
    if (!imagePreview) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const rotated = await rotateImage(imagePreview, rotation);
      setRotatedImage(rotated);
      toast.success(`Image rotated ${rotation}° successfully!`);
    } catch (error) {
      toast.error("Failed to rotate image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!rotatedImage) return;
    const blob = base64ToBlob(rotatedImage, "image/png");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rotated-${rotation}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
  };

  const handleClear = () => {
    setImagePreview("");
    setRotatedImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image Rotator"
      description="Rotate images by 90, 180, or 270 degrees instantly. Perfect for correcting image orientation or creating rotated versions of your photos. All processing happens in your browser."
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
            <div className="flex items-center gap-4">
              <Label>Rotation Angle:</Label>
              <div className="flex gap-2">
                {([90, 180, 270] as const).map((angle) => (
                  <Button
                    key={angle}
                    variant={rotation === angle ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRotation(angle)}
                  >
                    {angle}°
                  </Button>
                ))}
              </div>
              <Button onClick={handleRotate} disabled={isProcessing}>
                <RotateCw className="w-4 h-4 mr-2" />
                {isProcessing ? "Rotating..." : "Rotate"}
              </Button>
            </div>
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

          {rotatedImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Rotated Image</Label>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <div className="border rounded-lg p-4 bg-muted flex justify-center">
                <img
                  src={rotatedImage}
                  alt="Rotated"
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
            <li>Select rotation angle (90°, 180°, or 270°)</li>
            <li>Click "Rotate" to apply the rotation</li>
            <li>Download the rotated image</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
