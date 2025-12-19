"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function TransformationBuilderPage() {
  const [baseUrl, setBaseUrl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [crop, setCrop] = useState("fill");
  const [quality, setQuality] = useState("");
  const [format, setFormat] = useState("");
  const [result, setResult] = useState("");

  const buildTransformation = () => {
    if (!baseUrl.trim()) {
      toast.error("Please enter a base image URL");
      return;
    }

    try {
      const transformations: string[] = [];

      if (width) transformations.push(`w_${width}`);
      if (height) transformations.push(`h_${height}`);
      if (crop) transformations.push(`c_${crop}`);
      if (quality) transformations.push(`q_${quality}`);
      if (format) transformations.push(`f_${format}`);

      const transformString = transformations.join(",");
      
      // Parse the base URL
      let url: URL;
      try {
        url = new URL(baseUrl);
      } catch {
        // If it's not a full URL, assume it's a Cloudinary path
        const parts = baseUrl.split("/upload/");
        if (parts.length === 2) {
          const newUrl = `https://res.cloudinary.com/${parts[0]}/upload/${transformString}/${parts[1]}`;
          setResult(newUrl);
          toast.success("Transformation URL generated!");
          return;
        }
        throw new Error("Invalid URL format");
      }

      // If it's a Cloudinary URL, insert transformations
      if (url.hostname.includes("cloudinary.com")) {
        const pathParts = url.pathname.split("/upload/");
        if (pathParts.length === 2) {
          const newPath = `/upload/${transformString}/${pathParts[1]}`;
          url.pathname = newPath;
          setResult(url.toString());
          toast.success("Transformation URL generated!");
        } else {
          throw new Error("Invalid Cloudinary URL format");
        }
      } else {
        // For non-Cloudinary URLs, append as query params
        if (transformString) {
          url.searchParams.set("transform", transformString);
        }
        setResult(url.toString());
        toast.success("Transformation URL generated!");
      }
    } catch (err) {
      toast.error("Failed to build transformation URL");
    }
  };

  const handleClear = () => {
    setBaseUrl("");
    setWidth("");
    setHeight("");
    setCrop("fill");
    setQuality("");
    setFormat("");
    setResult("");
  };

  return (
    <ToolLayout
      title="Image Transformation Builder"
      description="Build Cloudinary transformation URLs visually"
      category="Cloudinary Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="base-url">Base Image URL</Label>
              <Input
                id="base-url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/cloud/image/upload/example.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop">Crop Mode</Label>
              <select
                id="crop"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="fill">Fill</option>
                <option value="fit">Fit</option>
                <option value="scale">Scale</option>
                <option value="crop">Crop</option>
                <option value="thumb">Thumbnail</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quality">Quality (1-100)</Label>
                <Input
                  id="quality"
                  type="number"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  placeholder="80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="">Auto</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                  <option value="gif">GIF</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={buildTransformation} className="flex-1">
                Build Transformation URL
              </Button>
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="result">Transformation URL</Label>
            {result ? (
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">Result</p>
                  <CopyButton text={result} />
                </div>
                <Textarea
                  id="result"
                  value={result}
                  readOnly
                  className="font-mono text-sm min-h-[200px] bg-muted"
                />
              </Card>
            ) : (
              <Card className="p-4 min-h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Transformation URL will appear here
                </p>
              </Card>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter a Cloudinary image URL or base path</li>
            <li>Set width, height, crop mode, quality, and format</li>
            <li>Click "Build Transformation URL" to generate the URL</li>
            <li>Copy the generated URL to use in your application</li>
            <li>Supports common Cloudinary transformation parameters</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}






