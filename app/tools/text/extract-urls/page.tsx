"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { extractURLs } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function ExtractURLsPage() {
  const [input, setInput] = useState("");
  const [urls, setUrls] = useState<string[]>([]);

  const handleExtract = () => {
    if (!input.trim()) {
      toast.error("Please enter text");
      return;
    }

    try {
      const extracted = extractURLs(input);
      setUrls(extracted);
      if (extracted.length > 0) {
        toast.success(`Found ${extracted.length} URL(s)!`);
      } else {
        toast.info("No URLs found");
      }
    } catch (err) {
      toast.error("Failed to extract URLs");
    }
  };

  const handleClear = () => {
    setInput("");
    setUrls([]);
  };

  return (
    <ToolLayout
      title="Extract URLs"
      description="Extract all URLs and links from text automatically"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input Text</Label>
            <div className="flex gap-2">
              <Button onClick={handleExtract} size="sm">
                Extract URLs
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
            placeholder="Enter text containing URLs..."
            className="font-mono text-sm min-h-[300px]"
          />
        </div>

        {urls.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label>Extracted URLs ({urls.length})</Label>
              <CopyButton text={urls.join("\n")} />
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {urls.map((url, index) => (
                <div key={index} className="p-2 bg-muted rounded text-sm break-all">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {url}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <DownloadButton content={urls.join("\n")} filename="extracted-urls.txt" />
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste text containing URLs</li>
            <li>Click "Extract URLs" to find all links</li>
            <li>Copy or download the extracted URLs</li>
            <li>Perfect for extracting links from documents, emails, or web pages</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

