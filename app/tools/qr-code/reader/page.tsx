"use client";

import { useState, useRef } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsQR from "jsqr";

export default function QRCodeReaderPage() {
  const [decodedText, setDecodedText] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setDecodedText(code.data);
          toast.success("QR code decoded successfully!");
        } else {
          setDecodedText("");
          toast.error("No QR code found in the image");
        }
      };
      img.src = imageUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setImagePreview("");
    setDecodedText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="QR Code Reader"
      description="Read and decode QR codes from images"
      category="QR Code Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="file-input">Upload QR Code Image</Label>
          <input
            id="file-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
            >
              Choose Image
            </Button>
            <Button onClick={handleClear} variant="ghost" size="sm">
              Clear
            </Button>
          </div>
        </div>

        {imagePreview && (
          <div className="space-y-4">
            <Label>Image Preview</Label>
            <div className="border rounded-lg p-4 bg-muted flex justify-center">
              <img
                src={imagePreview}
                alt="QR Code"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
          </div>
        )}

        {decodedText && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="decoded">Decoded Text</Label>
              <CopyButton text={decodedText} />
            </div>
            <Textarea
              id="decoded"
              value={decodedText}
              readOnly
              className="font-mono text-sm min-h-[100px] bg-muted"
              placeholder="Decoded QR code content will appear here..."
            />
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Click "Choose Image" to upload a QR code image</li>
            <li>Supported formats: PNG, JPG, GIF, WebP</li>
            <li>The decoded text will appear automatically</li>
            <li>Copy the decoded text to use it</li>
            <li>Works entirely in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}








