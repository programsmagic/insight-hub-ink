"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { extractLinks } from "@/lib/tools/html-utils";
import { toast } from "sonner";

export default function HTMLLinkExtractorPage() {
  const [input, setInput] = useState("");
  const [links, setLinks] = useState<string[]>([]);

  const handleExtract = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML");
      return;
    }

    try {
      const extracted = extractLinks(input);
      setLinks(extracted);
      if (extracted.length > 0) {
        toast.success(`Found ${extracted.length} link(s)!`);
      } else {
        toast.info("No links found");
      }
    } catch (err) {
      toast.error("Failed to extract links");
    }
  };

  const handleClear = () => {
    setInput("");
    setLinks([]);
  };

  return (
    <ToolLayout
      title="HTML Link Extractor"
      description="Extract all links and URLs from HTML code automatically"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input HTML</Label>
            <div className="flex gap-2">
              <Button onClick={handleExtract} size="sm">
                Extract Links
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
            placeholder='<a href="https://example.com">Link</a>'
            className="font-mono text-sm min-h-[300px]"
          />
        </div>

        {links.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label>Extracted Links ({links.length})</Label>
              <CopyButton text={links.join("\n")} />
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {links.map((link, index) => (
                <div key={index} className="p-2 bg-muted rounded text-sm break-all">
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {link}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <DownloadButton content={links.join("\n")} filename="extracted-links.txt" />
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste HTML code containing links</li>
            <li>Click "Extract Links" to find all href URLs</li>
            <li>Copy or download the extracted links</li>
            <li>Perfect for analyzing web pages and extracting URLs</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


