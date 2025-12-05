"use client";

import { useState, useRef } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { getPixelColor, extractColorPalette } from "@/lib/tools/image-utils";

export default function ImageColorPickerPage() {
  const [imagePreview, setImagePreview] = useState("");
  const [selectedColor, setSelectedColor] = useState<{
    r: number;
    g: number;
    b: number;
    a: number;
    hex: string;
  } | null>(null);
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target?.result as string;
      setImagePreview(imageUrl);

      try {
        // Extract color palette
        const palette = await extractColorPalette(imageUrl, 8);
        setColorPalette(palette);
        toast.success("Image loaded! Click on the image to pick colors.");
      } catch (error) {
        toast.error("Failed to process image");
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imagePreview) return;

    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (img.naturalWidth / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (img.naturalHeight / rect.height));

    try {
      const color = await getPixelColor(imagePreview, x, y);
      setSelectedColor(color);
      toast.success(`Color picked: ${color.hex}`);
    } catch (error) {
      toast.error("Failed to pick color");
    }
  };

  const handleClear = () => {
    setImagePreview("");
    setSelectedColor(null);
    setColorPalette([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image Color Picker"
      description="Pick colors from images and generate color palettes. Click anywhere on an image to get the exact color value in HEX, RGB, and HSL formats. Perfect for designers and developers."
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
        </div>

        {imagePreview && (
          <div className="space-y-4">
            <Label>Click on the image to pick a color</Label>
            <div className="border rounded-lg p-4 bg-muted flex justify-center cursor-crosshair">
              <img
                src={imagePreview}
                alt="Color picker"
                className="max-w-full max-h-[500px] object-contain"
                onClick={handleImageClick}
              />
            </div>
          </div>
        )}

        {selectedColor && (
          <Card className="p-6">
            <div className="space-y-4">
              <Label>Selected Color</Label>
              <div className="flex items-center gap-4">
                <div
                  className="w-24 h-24 rounded-lg border-2 border-border"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">HEX:</span>
                    <code className="bg-muted px-2 py-1 rounded">{selectedColor.hex}</code>
                    <CopyButton text={selectedColor.hex} label="Copy HEX" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">RGB:</span>
                    <code className="bg-muted px-2 py-1 rounded">
                      rgb({selectedColor.r}, {selectedColor.g}, {selectedColor.b})
                    </code>
                    <CopyButton
                      text={`rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`}
                      label="Copy RGB"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">RGBA:</span>
                    <code className="bg-muted px-2 py-1 rounded">
                      rgba({selectedColor.r}, {selectedColor.g}, {selectedColor.b}, {selectedColor.a})
                    </code>
                    <CopyButton
                      text={`rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`}
                      label="Copy RGBA"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {colorPalette.length > 0 && (
          <div className="space-y-4">
            <Label>Color Palette (Dominant Colors)</Label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {colorPalette.map((color, index) => (
                <div key={index} className="space-y-1">
                  <div
                    className="w-full h-16 rounded border-2 border-border cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      // Extract RGB from hex
                      const r = parseInt(color.slice(1, 3), 16);
                      const g = parseInt(color.slice(3, 5), 16);
                      const b = parseInt(color.slice(5, 7), 16);
                      setSelectedColor({ r, g, b, a: 1, hex: color });
                      toast.success(`Color selected: ${color}`);
                    }}
                  />
                  <code className="text-xs block text-center">{color}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload an image file</li>
            <li>Click anywhere on the image to pick a color</li>
            <li>View the color in HEX, RGB, and RGBA formats</li>
            <li>Copy color values to use in your designs</li>
            <li>See dominant colors automatically extracted from the image</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
