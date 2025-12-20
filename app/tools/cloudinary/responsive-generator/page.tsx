"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ResponsiveGeneratorPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [widths, setWidths] = useState("320,640,1024,1920");
  const [result, setResult] = useState("");

  const generateResponsive = () => {
    if (!imageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }

    try {
      const widthArray = widths.split(",").map((w) => w.trim()).filter(Boolean);
      if (widthArray.length === 0) {
        toast.error("Please enter at least one width");
        return;
      }

      // Generate srcset
      const srcset = widthArray
        .map((width) => {
          // If it's already a Cloudinary URL, add width parameter
          if (imageUrl.includes("cloudinary.com")) {
            const url = new URL(imageUrl);
            url.searchParams.set("w", width);
            return `${url.toString()} ${width}w`;
          }
          // Otherwise, assume it's a base URL and add width
          return `${imageUrl}?w=${width} ${width}w`;
        })
        .join(",\n    ");

      // Generate img tag with srcset
      const imgTag = `<img
  src="${imageUrl}"
  srcset="${srcset}"
  sizes="(max-width: 320px) 320px,
         (max-width: 640px) 640px,
         (max-width: 1024px) 1024px,
         1920px"
  alt="Responsive image"
/>`;

      setResult(imgTag);
      toast.success("Responsive image code generated!");
    } catch (err) {
      toast.error("Failed to generate responsive code");
    }
  };

  const handleClear = () => {
    setImageUrl("");
    setWidths("320,640,1024,1920");
    setResult("");
  };

  return (
    <ToolLayout
      title="Responsive Image Generator"
      description="Generate responsive image URLs with srcset"
      category="Cloudinary Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://res.cloudinary.com/your-cloud/image/upload/example.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="widths">Widths (comma-separated)</Label>
            <Input
              id="widths"
              value={widths}
              onChange={(e) => setWidths(e.target.value)}
              placeholder="320,640,1024,1920"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={generateResponsive} className="flex-1">
              Generate Responsive Code
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="result">Generated HTML</Label>
              <CopyButton text={result} />
            </div>
            <Textarea
              id="result"
              value={result}
              readOnly
              className="font-mono text-sm min-h-[200px] bg-muted"
            />
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter a Cloudinary image URL or base image URL</li>
            <li>Specify widths as comma-separated values (e.g., 320,640,1024)</li>
            <li>Click "Generate Responsive Code" to create the HTML</li>
            <li>The generated code includes srcset and sizes attributes</li>
            <li>Copy and paste the HTML into your website</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}









