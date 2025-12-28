"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CanonicalURLPage() {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      const canonicalTag = `<link rel="canonical" href="${url}" />`;
      setOutput(canonicalTag);
      toast.success("Canonical URL tag generated!");
    } catch (err) {
      toast.error("Failed to generate tag");
    }
  };

  const handleClear = () => {
    setUrl("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Canonical URL Generator"
      description="Generate canonical URL tags to prevent duplicate content issues"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="url">Canonical URL:</Label>
          <div className="flex gap-2">
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="flex-1"
            />
            <Button onClick={handleGenerate}>Generate</Button>
            <Button onClick={handleClear} variant="ghost">
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Canonical Tag</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="canonical.html" />
              </div>
            </div>
            <div className="p-4 bg-muted rounded-md font-mono text-sm">
              {output}
            </div>
            <div className="text-sm text-muted-foreground">
              Add this tag to your HTML page's &lt;head&gt; section
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter the canonical (preferred) URL for your page</li>
            <li>Click "Generate" to create the canonical tag</li>
            <li>Add the tag to your HTML page's &lt;head&gt; section</li>
            <li>Helps prevent duplicate content issues in SEO</li>
            <li>Useful when you have multiple URLs pointing to the same content</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}











