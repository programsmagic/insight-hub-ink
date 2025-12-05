"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { applyAdvancedFilter, imageToBase64, base64ToBlob } from "@/lib/tools/image-utils";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { Filter } from "lucide-react";

type FilterType = "grayscale" | "sepia" | "invert" | "vintage" | "blackwhite" | "sharpen";

export default function ImageFiltersPage() {
  const analytics = useToolAnalytics("image-filters");
  const [originalImage, setOriginalImage] = useState("");
  const [filteredImage, setFilteredImage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("grayscale");
  const [intensity, setIntensity] = useState([100]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setFilteredImage("");
      analytics.trackInteraction("image", "upload");
    } catch (error) {
      toast.error("Failed to load image");
      analytics.trackError("Failed to load image");
    }
  };

  const handleApplyFilter = async () => {
    if (!originalImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await applyAdvancedFilter(originalImage, selectedFilter, intensity[0] ?? 100);
      setFilteredImage(result);
      toast.success("Filter applied successfully!");
      analytics.trackUsage("apply", {
        filter: selectedFilter,
        intensity: intensity[0],
      });
    } catch (error) {
      toast.error("Failed to apply filter");
      analytics.trackError("Failed to apply filter", { filter: selectedFilter });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFilteredImage("");
    setSelectedFilter("grayscale");
    setIntensity([100]);
    analytics.trackInteraction("filter", "reset");
  };

  const handleDownload = () => {
    if (!filteredImage) return;

    const blob = base64ToBlob(filteredImage, "image/png");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Image downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setOriginalImage("");
    setFilteredImage("");
    setSelectedFilter("grayscale");
    setIntensity([100]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Image Filters"
      description="Apply professional filters and effects to your images. Choose from grayscale, sepia, invert, vintage, black & white, and sharpen filters with adjustable intensity controls."
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
                Choose Image
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter">Filter</Label>
              <Select
                value={selectedFilter}
                onValueChange={(value: FilterType) => {
                  setSelectedFilter(value);
                  analytics.trackInteraction("filter", "select", { filter: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grayscale">Grayscale</SelectItem>
                  <SelectItem value="sepia">Sepia</SelectItem>
                  <SelectItem value="invert">Invert</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="blackwhite">Black & White</SelectItem>
                  <SelectItem value="sharpen">Sharpen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intensity">Intensity: {intensity[0]}%</Label>
              <Slider
                id="intensity"
                min={0}
                max={100}
                step={5}
                value={intensity}
                onValueChange={setIntensity}
                disabled={isProcessing}
              />
              <p className="text-xs text-muted-foreground">
                Adjust the intensity of the filter effect
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleApplyFilter} disabled={isProcessing || !originalImage} className="flex-1">
                <Filter className="w-4 h-4 mr-2" />
                {isProcessing ? "Processing..." : "Apply Filter"}
              </Button>
              <Button onClick={handleReset} variant="outline" disabled={isProcessing || !filteredImage}>
                Reset
              </Button>
              <Button onClick={handleClear} variant="ghost" size="sm" disabled={isProcessing}>
                Clear
              </Button>
            </div>
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

            {filteredImage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Filtered Image</Label>
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="border rounded-lg p-4 bg-muted flex justify-center">
                  <img
                    src={filteredImage}
                    alt="Filtered"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
              </div>
            )}

            {!originalImage && !filteredImage && (
              <div className="border rounded-lg p-12 bg-muted flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-center">
                  Upload an image and apply filters to see preview
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">Available Filters:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Grayscale:</strong> Convert image to shades of gray</li>
            <li><strong>Sepia:</strong> Apply warm brown tone for vintage look</li>
            <li><strong>Invert:</strong> Invert all colors in the image</li>
            <li><strong>Vintage:</strong> Apply retro vintage effect with reduced saturation</li>
            <li><strong>Black & White:</strong> Convert to pure black and white (high contrast)</li>
            <li><strong>Sharpen:</strong> Enhance image sharpness and detail</li>
          </ul>
          <p className="mt-2">
            <strong>Tip:</strong> Adjust the intensity slider to control how strong the filter effect is applied. You can apply filters multiple times for different effects.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
