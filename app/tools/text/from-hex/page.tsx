"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { hexToText } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function HexToTextPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter hex to convert");
      return;
    }

    try {
      const text = hexToText(input);
      setOutput(text);
      toast.success("Hex converted to text successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to convert hex");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Hex to Text"
      description="Convert hexadecimal code back to readable text instantly"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Hexadecimal Input (space-separated)</Label>
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
              placeholder="48 65 6c 6c 6f"
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Text Output</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="decoded.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Converted text will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter hexadecimal code (space-separated hex values)</li>
            <li>Click "Convert" to transform to text</li>
            <li>Copy or download the decoded result</li>
            <li>Format: Each two-digit hex value represents one character</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}









