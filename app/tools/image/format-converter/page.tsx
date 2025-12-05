"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { convertImageFormat, base64ToBlob } from "@/lib/tools/image-utils";
import { RefreshCw } from "lucide-react";

type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

export default function ImageFormatConverterPage() {
  const [imagePreview, setImagePreview] = useState("");
  const [convertedImage, setConvertedImage] = useState("");
  const [format, setFormat] = useState<ImageFormat>("image/jpeg");
  const [quality, setQuality] = useState([92]);
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
      setConvertedImage("");
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = async () => {
    if (!imagePreview) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const qual = quality[0] ?? 92;
      const converted = await convertImageFormat(imagePreview, format, qual / 100);
      setConvertedImage(converted);
      toast.success("Image converted successfully!");
    } catch (error) {
      toast.error("Failed to convert image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedImage) return;
    const extension = format.split("/")[1] || "jpg";
    const blob = base64ToBlob(convertedImage, format);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
  };

  const handleClear = () => {
    setImagePreview("");
    setConvertedImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatName = format === "image/jpeg" ? "JPG" : format === "image/png" ? "PNG" : "WebP";

  return (
    <ToolLayout
      title="Image Format Converter"
      description="Convert images between JPG, PNG, and WebP formats instantly. Adjust quality settings and download in your preferred format. Perfect for optimizing images for web use."
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
              <Label>Target Format</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={format === "image/jpeg" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormat("image/jpeg")}
                >
                  JPG
                </Button>
                <Button
                  variant={format === "image/png" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormat("image/png")}
                >
                  PNG
                </Button>
                <Button
                  variant={format === "image/webp" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormat("image/webp")}
                >
                  WebP
                </Button>
              </div>
            </div>
            {format === "image/jpeg" && (
              <div>
                <Label>Quality: {quality[0]}%</Label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  min={1}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            )}
            <Button onClick={handleConvert} disabled={isProcessing}>
              <RefreshCw className="w-4 h-4 mr-2" />
              {isProcessing ? "Converting..." : "Convert"}
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

          {convertedImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Converted Image ({formatName})</Label>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <div className="border rounded-lg p-4 bg-muted flex justify-center">
                <img
                  src={convertedImage}
                  alt="Converted"
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
            <li>Select target format (JPG, PNG, or WebP)</li>
            <li>Adjust quality for JPG format (1-100%)</li>
            <li>Click "Convert" to convert the image</li>
            <li>Download the converted image</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
