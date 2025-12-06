"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generateSlug } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function URLSlugGeneratorPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!input.trim()) {
      toast.error("Please enter text to convert");
      return;
    }

    try {
      const slug = generateSlug(input);
      setOutput(slug);
      toast.success("URL slug generated successfully!");
    } catch (err) {
      toast.error("Failed to generate slug");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="URL Slug Generator"
      description="Generate SEO-friendly URL slugs from text for use in web addresses"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleGenerate} size="sm">
                  Generate Slug
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
              placeholder="Enter text to convert to a URL slug..."
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Generated Slug</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="slug.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="SEO-friendly URL slug will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter text in the input field</li>
            <li>Click "Generate Slug" to create a URL-friendly version</li>
            <li>Special characters are removed and spaces become hyphens</li>
            <li>Copy or download the slug result</li>
            <li>Perfect for creating SEO-friendly URLs and permalinks</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}



