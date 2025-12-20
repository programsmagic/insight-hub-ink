"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function generateAltText(imageUrl: string, context?: string): string {
  // Extract filename from URL
  const filename = imageUrl.split("/").pop()?.split("?")[0] || "";
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

  // Generate descriptive alt text
  let altText = nameWithoutExt
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (context) {
    altText = `${context} - ${altText}`;
  }

  // If no meaningful name, provide generic description
  if (!altText || altText.length < 3) {
    altText = context || "Image";
  }

  return altText;
}

export default function ImageAltTextGeneratorPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!imageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }

    try {
      const altText = generateAltText(imageUrl, context);
      setOutput(altText);
      toast.success("Alt text generated successfully!");
    } catch (err) {
      toast.error("Failed to generate alt text");
    }
  };

  const handleClear = () => {
    setImageUrl("");
    setContext("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Image Alt Text Generator"
      description="Generate SEO-friendly alt text for images to improve accessibility and search rankings"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL:</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="context">Context (Optional):</Label>
            <Input
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Product photo, Blog post image, etc."
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate Alt Text</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Generated Alt Text</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="alt-text.txt" />
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[100px] bg-muted"
            />
            <div className="text-sm text-muted-foreground">
              HTML: <code className="bg-muted px-2 py-1 rounded">{`<img src="${imageUrl}" alt="${output}" />`}</code>
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter the image URL</li>
            <li>Optionally provide context about the image</li>
            <li>Click "Generate Alt Text" to create descriptive alt text</li>
            <li>Copy the alt text and add it to your image tags</li>
            <li>Alt text improves SEO and accessibility for screen readers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}







