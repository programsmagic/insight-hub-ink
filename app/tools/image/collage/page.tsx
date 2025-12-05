"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { createCollage, imageToBase64, base64ToBlob } from "@/lib/tools/image-utils";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { Grid3x3, X } from "lucide-react";

type LayoutType = "grid" | "horizontal" | "vertical";

export default function ImageCollagePage() {
  const analytics = useToolAnalytics("image-collage");
  const [images, setImages] = useState<string[]>([]);
  const [collageImage, setCollageImage] = useState("");
  const [layout, setLayout] = useState<LayoutType>("grid");
  const [gridColumns, setGridColumns] = useState(2);
  const [gridRows, setGridRows] = useState(2);
  const [spacing, setSpacing] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      toast.error("Please select image files");
      return;
    }

    if (images.length + imageFiles.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }

    try {
      const newImages = await Promise.all(imageFiles.map((file) => imageToBase64(file)));
      setImages([...images, ...newImages]);
      analytics.trackInteraction("image", "upload", { count: imageFiles.length });
    } catch (error) {
      toast.error("Failed to load some images");
      analytics.trackError("Failed to load images");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    analytics.trackInteraction("image", "remove", { index });
  };

  const handleCreateCollage = async () => {
    if (images.length < 2) {
      toast.error("Please upload at least 2 images");
      return;
    }

    setIsProcessing(true);
    try {
      const options: Parameters<typeof createCollage>[1] = {
        layout,
        spacing,
        backgroundColor,
      };

      if (layout === "grid") {
        options.gridColumns = gridColumns;
        options.gridRows = gridRows;
      }

      const result = await createCollage(images, options);
      setCollageImage(result);
      toast.success("Collage created successfully!");
      analytics.trackUsage("create", {
        layout,
        imageCount: images.length,
        gridColumns: layout === "grid" ? gridColumns : undefined,
        gridRows: layout === "grid" ? gridRows : undefined,
      });
    } catch (error) {
      toast.error("Failed to create collage");
      analytics.trackError("Failed to create collage", { layout, imageCount: images.length });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!collageImage) return;

    const blob = base64ToBlob(collageImage, "image/png");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "collage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Collage downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setImages([]);
    setCollageImage("");
    setLayout("grid");
    setGridColumns(2);
    setGridRows(2);
    setSpacing(10);
    setBackgroundColor("#FFFFFF");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image Collage Maker"
      description="Create beautiful collages from multiple images. Choose from grid, horizontal, or vertical layouts. Customize spacing, background color, and grid dimensions for perfect compositions."
      category="Image Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-input">Upload Images (2-6 images)</Label>
              <input
                id="file-input"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                disabled={isProcessing || images.length >= 6}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                disabled={isProcessing || images.length >= 6}
                className="w-full"
              >
                Choose Images ({images.length}/6)
              </Button>
            </div>

            {images.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Images</Label>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Image ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        onClick={() => handleRemoveImage(index)}
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="layout">Layout</Label>
              <Select
                value={layout}
                onValueChange={(value: LayoutType) => {
                  setLayout(value);
                  analytics.trackInteraction("layout", "change", { layout: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                  <SelectItem value="vertical">Vertical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {layout === "grid" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grid-columns">Columns</Label>
                    <Input
                      id="grid-columns"
                      type="number"
                      min={1}
                      max={4}
                      value={gridColumns}
                      onChange={(e) => setGridColumns(Math.max(1, Math.min(4, parseInt(e.target.value) || 2)))}
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grid-rows">Rows</Label>
                    <Input
                      id="grid-rows"
                      type="number"
                      min={1}
                      max={4}
                      value={gridRows}
                      onChange={(e) => setGridRows(Math.max(1, Math.min(4, parseInt(e.target.value) || 2)))}
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="spacing">Spacing (pixels)</Label>
              <Input
                id="spacing"
                type="number"
                min={0}
                max={50}
                value={spacing}
                onChange={(e) => setSpacing(Math.max(0, Math.min(50, parseInt(e.target.value) || 10)))}
                disabled={isProcessing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="background-color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="background-color"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-20 h-10"
                  disabled={isProcessing}
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  placeholder="#FFFFFF"
                  disabled={isProcessing}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCreateCollage}
                disabled={isProcessing || images.length < 2}
                className="flex-1"
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                {isProcessing ? "Creating..." : "Create Collage"}
              </Button>
              <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {collageImage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Collage Preview</Label>
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="border rounded-lg p-4 bg-muted flex justify-center">
                  <img
                    src={collageImage}
                    alt="Collage"
                    className="max-w-full max-h-[500px] object-contain"
                  />
                </div>
              </div>
            )}

            {!collageImage && (
              <div className="border rounded-lg p-12 bg-muted flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-center">
                  Upload 2-6 images and create collage to see preview
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">Layout Options:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Grid:</strong> Arrange images in a grid layout with customizable columns and rows</li>
            <li><strong>Horizontal:</strong> Arrange images side by side in a horizontal row</li>
            <li><strong>Vertical:</strong> Stack images vertically in a column</li>
          </ul>
          <p className="mt-2">
            <strong>Tips:</strong> Adjust spacing to control gaps between images. Choose background color that complements your images. For grid layout, ensure you have enough images to fill the grid (columns × rows).
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
