"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
// @ts-ignore - turndown doesn't have types
import TurndownService from "turndown";

export default function HTMLToMarkdownPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML to convert");
      return;
    }

    try {
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(input);
      setOutput(markdown);
      toast.success("HTML converted to Markdown successfully!");
    } catch (err) {
      toast.error("Failed to convert HTML to Markdown");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="HTML to Markdown"
      description="Convert HTML code to Markdown format instantly"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input HTML</Label>
              <div className="flex gap-2">
                <Button onClick={handleConvert} size="sm">
                  Convert
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
              placeholder="<h1>Hello</h1><p>World</p>"
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Markdown Output</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="converted.md" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Markdown will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your HTML code in the input field</li>
            <li>Click "Convert" to transform HTML to Markdown</li>
            <li>Copy or download the Markdown result</li>
            <li>Perfect for converting HTML content to Markdown format</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

