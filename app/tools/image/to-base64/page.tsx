"use client";

import { useState, useRef } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { imageToBase64 } from "@/lib/tools/image-utils";

export default function ImageToBase64Page() {
  const [output, setOutput] = useState("");
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

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setIsProcessing(true);
    try {
      const base64 = await imageToBase64(file);
      setOutput(base64);
      setImagePreview(base64);
      toast.success("Image converted to Base64 successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to convert image");
      setOutput("");
      setImagePreview("");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setOutput("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image to Base64"
      description="Convert images to Base64 data URLs instantly. Perfect for embedding images in HTML, CSS, or data URIs. Supports PNG, JPG, GIF, WebP, and more."
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
            Supported formats: PNG, JPG, JPEG, GIF, WebP, SVG (max 10MB)
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

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Base64 Data URL</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="image-base64.txt" />
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[200px] bg-muted"
              placeholder="Base64 data URL will appear here..."
            />
            <p className="text-xs text-muted-foreground">
              Use this Base64 string in HTML img src, CSS background-image, or data URIs
            </p>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Click "Choose Image" to upload an image file</li>
            <li>The image will be converted to Base64 format automatically</li>
            <li>Copy the Base64 string to use in your code</li>
            <li>Use in HTML: &lt;img src="data:image/png;base64,..." /&gt;</li>
            <li>Use in CSS: background-image: url(data:image/png;base64,...)</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
