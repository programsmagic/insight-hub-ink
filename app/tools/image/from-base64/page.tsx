"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { base64ToBlob } from "@/lib/tools/image-utils";

export default function Base64ToImagePage() {
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  const handleProcess = () => {
    if (!input.trim()) {
      toast.error("Please enter a Base64 string");
      return;
    }

    try {
      setError("");
      // Validate Base64 format
      let base64String = input.trim();
      
      // Remove data URL prefix if present
      if (base64String.includes(",")) {
        const parts = base64String.split(",");
        base64String = parts[1] || base64String;
      }

      // Validate Base64 characters
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      if (!base64Regex.test(base64String)) {
        throw new Error("Invalid Base64 format");
      }

      // Try to decode
      const originalInput = input.trim();
      const previewUrl = originalInput.includes("data:") ? originalInput : `data:image/png;base64,${base64String}`;
      setImagePreview(previewUrl);
      toast.success("Base64 decoded successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid Base64 string";
      setError(errorMessage);
      setImagePreview("");
      toast.error(errorMessage);
    }
  };

  const handleDownload = () => {
    if (!imagePreview) {
      toast.error("No image to download");
      return;
    }

    try {
      const parts = imagePreview.includes(",") ? imagePreview.split(",") : [imagePreview];
      const base64String = parts[1] || parts[0] || "";
      if (!base64String) {
        throw new Error("Invalid base64 string");
      }
      const mimeMatch = imagePreview.match(/data:([^;]+);/);
      const mimeType = mimeMatch && mimeMatch[1] ? mimeMatch[1] : "image/png";
      const blob = base64ToBlob(base64String, mimeType);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const extension = mimeType.split("/")[1] || "png";
      a.download = `image.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download image");
    }
  };

  const handleClear = () => {
    setInput("");
    setImagePreview("");
    setError("");
  };

  return (
    <ToolLayout
      title="Base64 to Image"
      description="Convert Base64 data URLs to images. Decode Base64 strings and download as image files. Perfect for extracting images from Base64 encoded data."
      category="Image Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Base64 String</Label>
            <div className="flex gap-2">
              <Button onClick={handleProcess} size="sm">Decode</Button>
              <Button onClick={handleClear} variant="ghost" size="sm">Clear</Button>
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
              setImagePreview("");
            }}
            placeholder="Paste Base64 string or data URL (e.g., data:image/png;base64,iVBORw0KGgo...)"
            className="font-mono text-sm min-h-[200px]"
          />
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        {imagePreview && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Image Preview</Label>
              <div className="flex gap-2">
                <CopyButton text={imagePreview} label="Copy Data URL" />
                <Button onClick={handleDownload} variant="outline" size="sm">
                  Download Image
                </Button>
              </div>
            </div>
            <div className="border rounded-lg p-4 bg-muted flex justify-center">
              <img
                src={imagePreview}
                alt="Decoded"
                className="max-w-full max-h-[500px] object-contain"
                onError={() => {
                  setError("Failed to display image. Please check the Base64 string.");
                  setImagePreview("");
                }}
              />
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste a Base64 string or data URL in the input field</li>
            <li>Click "Decode" to convert Base64 to image</li>
            <li>The image will be displayed in the preview</li>
            <li>Click "Download Image" to save the image file</li>
            <li>Supports all image formats: PNG, JPG, GIF, WebP, SVG</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
