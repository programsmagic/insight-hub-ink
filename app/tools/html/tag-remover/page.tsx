"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { removeHTMLTags } from "@/lib/tools/html-utils";
import { toast } from "sonner";

export default function HTMLTagRemoverPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRemove = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML with tags");
      return;
    }

    try {
      const cleaned = removeHTMLTags(input);
      setOutput(cleaned);
      toast.success("HTML tags removed successfully!");
    } catch (err) {
      toast.error("Failed to remove HTML tags");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="HTML Tag Remover"
      description="Remove HTML tags from text to extract plain text content"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input HTML</Label>
              <div className="flex gap-2">
                <Button onClick={handleRemove} size="sm">
                  Remove Tags
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
              placeholder="<div><p>Hello <strong>World</strong></p></div>"
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Plain Text</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="plain-text.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Plain text without HTML tags will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste HTML code in the input field</li>
            <li>Click "Remove Tags" to strip all HTML tags</li>
            <li>Copy or download the plain text result</li>
            <li>Perfect for extracting text content from HTML documents</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}





