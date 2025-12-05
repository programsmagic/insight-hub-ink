"use client";

import { useState, useRef } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { extractImageMetadata, formatMetadata } from "@/lib/tools/exif-utils";
import type { ImageMetadata } from "@/lib/tools/exif-utils";

export default function ImageMetadataPage() {
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [formattedOutput, setFormattedOutput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;
        setImagePreview(imageUrl);

        try {
          const extractedMetadata = await extractImageMetadata(file);
          setMetadata(extractedMetadata);
          const formatted = formatMetadata(extractedMetadata);
          setFormattedOutput(formatted);
          toast.success("Metadata extracted successfully!");
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Failed to extract metadata");
          setMetadata(null);
          setFormattedOutput("");
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to read file");
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setMetadata(null);
    setFormattedOutput("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image Metadata Extractor"
      description="Extract EXIF and other metadata from images. View camera settings, GPS location, creation date, and more. Perfect for photographers and content creators."
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
              {isProcessing ? "Processing..." : "Choose Image"}
            </Button>
            <Button onClick={handleClear} variant="ghost" size="sm" disabled={isProcessing}>
              Clear
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Supported formats: JPEG, TIFF (EXIF data). PNG and GIF may have limited metadata.
          </p>
        </div>

        {imagePreview && (
          <div className="space-y-4">
            <Label>Image Preview</Label>
            <div className="border rounded-lg p-4 bg-muted flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
          </div>
        )}

        {metadata && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Extracted Metadata</Label>
              <div className="flex gap-2">
                {formattedOutput && (
                  <>
                    <CopyButton text={formattedOutput} />
                    <DownloadButton
                      content={JSON.stringify(metadata, null, 2)}
                      filename="image-metadata.json"
                    />
                  </>
                )}
              </div>
            </div>
            <Card className="p-6">
              <div className="space-y-4">
                {metadata.make && (
                  <div>
                    <span className="font-semibold">Camera:</span> {metadata.make}{" "}
                    {metadata.model}
                  </div>
                )}
                {metadata.width && metadata.height && (
                  <div>
                    <span className="font-semibold">Dimensions:</span> {metadata.width} ×{" "}
                    {metadata.height} pixels
                  </div>
                )}
                {(metadata.dateTimeOriginal || metadata.dateTime) && (
                  <div>
                    <span className="font-semibold">Date:</span>{" "}
                    {metadata.dateTimeOriginal || metadata.dateTime}
                  </div>
                )}
                {metadata.exposureTime && (
                  <div>
                    <span className="font-semibold">Exposure:</span> {metadata.exposureTime}s
                  </div>
                )}
                {metadata.fNumber && (
                  <div>
                    <span className="font-semibold">Aperture:</span> f/{metadata.fNumber}
                  </div>
                )}
                {metadata.iso && (
                  <div>
                    <span className="font-semibold">ISO:</span> {metadata.iso}
                  </div>
                )}
                {metadata.focalLength && (
                  <div>
                    <span className="font-semibold">Focal Length:</span> {metadata.focalLength}mm
                  </div>
                )}
                {metadata.software && (
                  <div>
                    <span className="font-semibold">Software:</span> {metadata.software}
                  </div>
                )}
                {metadata.artist && (
                  <div>
                    <span className="font-semibold">Artist:</span> {metadata.artist}
                  </div>
                )}
                {metadata.copyright && (
                  <div>
                    <span className="font-semibold">Copyright:</span> {metadata.copyright}
                  </div>
                )}
                {metadata.gps && (
                  <div>
                    <span className="font-semibold">GPS Location:</span>{" "}
                    {metadata.gps.latitude?.toFixed(6)}, {metadata.gps.longitude?.toFixed(6)}
                    {metadata.gps.altitude && ` (${metadata.gps.altitude}m)`}
                  </div>
                )}
              </div>
            </Card>
            {formattedOutput && (
              <Textarea
                value={formattedOutput}
                readOnly
                className="font-mono text-sm min-h-[200px] bg-muted"
              />
            )}
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload an image file (JPEG or TIFF for best results)</li>
            <li>Metadata will be extracted automatically</li>
            <li>View camera settings, GPS location, and image properties</li>
            <li>Copy or download metadata as JSON</li>
            <li>Note: Some images may not contain EXIF data</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
