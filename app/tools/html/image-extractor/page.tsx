"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { extractImages } from "@/lib/tools/html-utils";
import { toast } from "sonner";

export default function HTMLImageExtractorPage() {
  const [input, setInput] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleExtract = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML");
      return;
    }

    try {
      const extracted = extractImages(input);
      setImages(extracted);
      if (extracted.length > 0) {
        toast.success(`Found ${extracted.length} image(s)!`);
      } else {
        toast.info("No images found");
      }
    } catch (err) {
      toast.error("Failed to extract images");
    }
  };

  const handleClear = () => {
    setInput("");
    setImages([]);
  };

  return (
    <ToolLayout
      title="HTML Image Extractor"
      description="Extract all image sources from HTML code automatically"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input HTML</Label>
            <div className="flex gap-2">
              <Button onClick={handleExtract} size="sm">
                Extract Images
              </Button>
              <Button onClick={handleClear} variant="ghost" size="sm">
                Clear
              </Button>
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='<img src="image.jpg" alt="Image" />'
            className="font-mono text-sm min-h-[300px]"
          />
        </div>

        {images.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label>Extracted Images ({images.length})</Label>
              <CopyButton text={images.join("\n")} />
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {images.map((image, index) => (
                <div key={index} className="p-2 bg-muted rounded text-sm break-all">
                  <a href={image} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {image}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <DownloadButton content={images.join("\n")} filename="extracted-images.txt" />
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste HTML code containing images</li>
            <li>Click "Extract Images" to find all src URLs</li>
            <li>Copy or download the extracted image URLs</li>
            <li>Perfect for analyzing web pages and extracting image sources</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}





