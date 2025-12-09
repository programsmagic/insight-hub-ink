"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { compressImage, imageToBase64, base64ToBlob } from "@/lib/tools/image-utils";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { Minimize2, Download, Upload, X } from "lucide-react";

export default function ImageCompressorPage() {
  const analytics = useToolAnalytics("image-compressor");
  const [originalImage, setOriginalImage] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [quality, setQuality] = useState([80]);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp" | "image/png">("image/jpeg");
  const [maxWidth, setMaxWidth] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

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
      setCompressedImage("");
      setCompressionStats(null);
      analytics.trackInteraction("image", "upload");
    } catch (error) {
      toast.error("Failed to load image");
      analytics.trackError("Failed to load image");
    }
  };

  const handleCompress = async () => {
    if (!originalImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await compressImage(
        originalImage,
        quality[0] / 100,
        format,
        maxWidth ? parseInt(maxWidth) : undefined,
        maxHeight ? parseInt(maxHeight) : undefined
      );

      setCompressedImage(result.dataUrl);
      setCompressionStats({
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        compressionRatio: result.compressionRatio,
      });

      toast.success("Image compressed successfully!");
      analytics.trackUsage("compress", {
        quality: quality[0],
        format,
        maxWidth: maxWidth || "none",
        maxHeight: maxHeight || "none",
        compressionRatio: result.compressionRatio,
      });
    } catch (error) {
      toast.error("Failed to compress image");
      analytics.trackError("Failed to compress image", { quality: quality[0], format });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedImage) return;

    const formatExtension = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";
    const blob = base64ToBlob(compressedImage, format);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-image.${formatExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setOriginalImage("");
    setCompressedImage("");
    setCompressionStats(null);
    setQuality([80]);
    setFormat("image/jpeg");
    setMaxWidth("");
    setMaxHeight("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress images to reduce file size while maintaining quality. Perfect for optimizing images for web, social media, or email. All processing happens in your browser."
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
                  <Label>Quality: {quality[0]}%</Label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    min={10}
                    max={100}
                    step={5}
                    disabled={isProcessing}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Lower (smaller file)</span>
                    <span>Higher (better quality)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Output Format</Label>
                  <Select
                    value={format}
                    onValueChange={(value) => setFormat(value as typeof format)}
                    disabled={isProcessing}
                  >
                    <SelectTrigger id="format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image/jpeg">JPEG</SelectItem>
                      <SelectItem value="image/webp">WebP</SelectItem>
                      <SelectItem value="image/png">PNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-width">Max Width (px, optional)</Label>
                    <Input
                      id="max-width"
                      type="number"
                      min={1}
                      max={10000}
                      value={maxWidth}
                      onChange={(e) => setMaxWidth(e.target.value)}
                      placeholder="Auto"
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-height">Max Height (px, optional)</Label>
                    <Input
                      id="max-height"
                      type="number"
                      min={1}
                      max={10000}
                      value={maxHeight}
                      onChange={(e) => setMaxHeight(e.target.value)}
                      placeholder="Auto"
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleCompress}
                    disabled={isProcessing || !originalImage}
                    className="flex-1"
                  >
                    <Minimize2 className="w-4 h-4 mr-2" />
                    {isProcessing ? "Compressing..." : "Compress Image"}
                  </Button>
                  <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {compressionStats && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Original Size:</span>
                      <span className="font-semibold">{formatFileSize(compressionStats.originalSize)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Compressed Size:</span>
                      <span className="font-semibold text-green-600">
                        {formatFileSize(compressionStats.compressedSize)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Size Reduction:</span>
                      <span className="font-semibold text-accent">
                        {compressionStats.compressionRatio.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
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

            {compressedImage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Compressed Image</Label>
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="border rounded-lg p-4 bg-muted flex justify-center">
                  <img
                    src={compressedImage}
                    alt="Compressed"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
              </div>
            )}

            {!originalImage && !compressedImage && (
              <div className="border rounded-lg p-12 bg-muted flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-center">
                  Upload an image and compress it to see preview
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload an image file (JPEG, PNG, WebP, etc.)</li>
            <li>Adjust quality slider (lower = smaller file, higher = better quality)</li>
            <li>Choose output format (JPEG for photos, WebP for modern browsers, PNG for transparency)</li>
            <li>Optionally set maximum width/height to resize while compressing</li>
            <li>Click "Compress Image" to process</li>
            <li>Download the compressed image</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
