"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { buildCloudinaryUrl } from "@/lib/tools/cloudinary-utils";
import type { CloudinaryTransformOptions } from "@/lib/tools/cloudinary-utils";

export default function CloudinaryUrlGeneratorPage() {
  const [cloudName, setCloudName] = useState("");
  const [publicId, setPublicId] = useState("sample");
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [crop, setCrop] = useState("scale");
  const [quality, setQuality] = useState<number | string>(80);
  const [format, setFormat] = useState("auto");
  const [blur, setBlur] = useState<number | undefined>(undefined);
  const [brightness, setBrightness] = useState<number | undefined>(undefined);
  const [contrast, setContrast] = useState<number | undefined>(undefined);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!publicId.trim()) {
      toast.error("Please enter a public ID");
      return;
    }

    // For the URL generator tool, we allow "demo" as a fallback for testing
    // If user leaves cloud name empty, we use "demo" for convenience
    const finalCloudName = cloudName.trim() || "demo";

    try {
      const options: CloudinaryTransformOptions = {};
      if (width) options.width = width;
      if (height) options.height = height;
      if (crop) options.crop = crop;
      if (quality) options.quality = quality;
      if (format && format !== "auto") options.format = format;
      if (blur) options.blur = blur;
      if (brightness) options.brightness = brightness;
      if (contrast) options.contrast = contrast;

      const url = buildCloudinaryUrl(publicId, options, finalCloudName);
      setOutput(url);
      toast.success("Cloudinary URL generated!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate URL");
    }
  };

  const handleClear = () => {
    setCloudName("");
    setPublicId("sample");
    setWidth(undefined);
    setHeight(undefined);
    setCrop("scale");
    setQuality(80);
    setFormat("auto");
    setBlur(undefined);
    setBrightness(undefined);
    setContrast(undefined);
    setOutput("");
  };

  return (
    <ToolLayout
      title="Image Delivery URL Generator"
      description="Generate Cloudinary delivery URLs with transformations. Build optimized image URLs with resizing, cropping, quality adjustments, and effects. Perfect for developers using Cloudinary."
      category="Cloudinary Tools"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Basic Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cloud-name">Cloud Name *</Label>
                <Input
                  id="cloud-name"
                  value={cloudName}
                  onChange={(e) => setCloudName(e.target.value)}
                  placeholder="your-cloud-name"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your Cloudinary cloud name (e.g., "demo" for testing)
                </p>
              </div>
              <div>
                <Label htmlFor="public-id">Public ID *</Label>
                <Input
                  id="public-id"
                  value={publicId}
                  onChange={(e) => setPublicId(e.target.value)}
                  placeholder="sample or folder/image"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The public ID of your image in Cloudinary
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width || ""}
                    onChange={(e) =>
                      setWidth(e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    placeholder="Auto"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height || ""}
                    onChange={(e) =>
                      setHeight(e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    placeholder="Auto"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="crop">Crop Mode</Label>
                <select
                  id="crop"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="scale">Scale</option>
                  <option value="fill">Fill</option>
                  <option value="fit">Fit</option>
                  <option value="crop">Crop</option>
                  <option value="thumb">Thumbnail</option>
                </select>
              </div>
              <div>
                <Label htmlFor="format">Format</Label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="auto">Auto (WebP/AVIF)</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                  <option value="avif">AVIF</option>
                </select>
              </div>
              <div>
                <Label htmlFor="quality">Quality: {typeof quality === "number" ? quality : String(quality)}</Label>
                <Slider
                  id="quality"
                  value={[typeof quality === "number" ? quality : parseInt(String(quality)) || 80]}
                  onValueChange={(value) => setQuality(value[0] as number)}
                  min={1}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Effects (Optional)</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="blur">Blur: {blur ?? 0}</Label>
                <Slider
                  id="blur"
                  value={[blur ?? 0]}
                  onValueChange={(value) => {
                    const val = value[0] ?? 0;
                    setBlur(val > 0 ? val : undefined);
                  }}
                  min={0}
                  max={2000}
                  step={10}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="brightness">Brightness: {brightness || 0}</Label>
                <Slider
                  id="brightness"
                  value={[brightness || 0]}
                  onValueChange={(value) => {
                    const val = value[0] ?? 0;
                    setBrightness(val !== 0 ? val : undefined);
                  }}
                  min={-100}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="contrast">Contrast: {contrast || 0}</Label>
                <Slider
                  id="contrast"
                  value={[contrast || 0]}
                  onValueChange={(value) => {
                    const val = value[0] ?? 0;
                    setContrast(val !== 0 ? val : undefined);
                  }}
                  min={-100}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate URL</Button>
          <Button onClick={handleClear} variant="outline">
            Clear All
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Generated Cloudinary URL</Label>
              <CopyButton text={output} />
            </div>
            <div className="p-4 bg-muted rounded-md">
              <code className="text-sm break-all">{output}</code>
            </div>
            {output && (
              <div className="border rounded-lg p-4 bg-muted flex justify-center">
                <img src={output} alt="Preview" className="max-w-full max-h-[400px] object-contain" />
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter your Cloudinary cloud name (or use "demo" for testing)</li>
            <li>Enter your Cloudinary public ID (e.g., "sample" or "folder/image")</li>
            <li>Configure dimensions, crop mode, format, and quality</li>
            <li>Add optional effects like blur, brightness, and contrast</li>
            <li>Click "Generate URL" to create the Cloudinary delivery URL</li>
            <li>Copy the URL to use in your application</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
