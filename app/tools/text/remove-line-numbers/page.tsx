"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { removeLineNumbers } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function RemoveLineNumbersPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRemove = () => {
    if (!input.trim()) {
      toast.error("Please enter text");
      return;
    }

    try {
      const cleaned = removeLineNumbers(input);
      setOutput(cleaned);
      toast.success("Line numbers removed successfully!");
    } catch (err) {
      toast.error("Failed to remove line numbers");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Remove Line Numbers"
      description="Remove line numbers from text to clean up numbered content"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input Text (with line numbers)</Label>
              <div className="flex gap-2">
                <Button onClick={handleRemove} size="sm">
                  Remove Line Numbers
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
              placeholder="1: First line&#10;2: Second line&#10;3: Third line..."
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Cleaned Text</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="cleaned.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Text without line numbers will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste text with line numbers (format: "1: text", "2: text", etc.)</li>
            <li>Click "Remove Line Numbers" to strip the numbers</li>
            <li>Copy or download the cleaned result</li>
            <li>Perfect for cleaning up copied code or documents</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

