"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { applyBlur, base64ToBlob } from "@/lib/tools/image-utils";
import { Sparkles } from "lucide-react";

export default function ImageBlurPage() {
  const [imagePreview, setImagePreview] = useState("");
  const [blurredImage, setBlurredImage] = useState("");
  const [blurAmount, setBlurAmount] = useState([10]);
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
      setBlurredImage("");
    };
    reader.readAsDataURL(file);
  };

  const handleApplyBlur = async () => {
    if (!imagePreview) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const amount = blurAmount[0] ?? 10;
      const blurred = await applyBlur(imagePreview, amount);
      setBlurredImage(blurred);
      toast.success("Blur applied successfully!");
    } catch (error) {
      toast.error("Failed to apply blur");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!blurredImage) return;
    const blob = base64ToBlob(blurredImage, "image/png");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blurred-${blurAmount[0]}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
  };

  const handleClear = () => {
    setImagePreview("");
    setBlurredImage("");
    setBlurAmount([10]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image Blur Tool"
      description="Apply blur effects to images with adjustable intensity. Perfect for creating privacy effects, background blur, or artistic effects. All processing happens in your browser."
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
              <Label>Blur Amount: {blurAmount[0]}px</Label>
              <Slider
                value={blurAmount}
                onValueChange={setBlurAmount}
                min={0}
                max={50}
                step={1}
                className="mt-2"
              />
            </div>
            <Button onClick={handleApplyBlur} disabled={isProcessing}>
              <Sparkles className="w-4 h-4 mr-2" />
              {isProcessing ? "Applying Blur..." : "Apply Blur"}
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

          {blurredImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Blurred Image</Label>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <div className="border rounded-lg p-4 bg-muted flex justify-center">
                <img
                  src={blurredImage}
                  alt="Blurred"
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
            <li>Adjust blur amount using the slider (0-50px)</li>
            <li>Click "Apply Blur" to process the image</li>
            <li>Download the blurred image</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
