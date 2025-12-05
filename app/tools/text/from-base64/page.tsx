"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { decodeBase64 } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function Base64ToTextPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleDecode = () => {
    if (!input.trim()) {
      toast.error("Please enter Base64 to decode");
      return;
    }

    try {
      const decoded = decodeBase64(input);
      setOutput(decoded);
      toast.success("Base64 decoded successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to decode Base64");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Base64 to Text"
      description="Decode Base64 encoded text back to original format instantly"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Base64 Encoded Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleDecode} size="sm">
                  Decode
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
              placeholder="Enter Base64 encoded text..."
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Decoded Text</Label>
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
              placeholder="Decoded text will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter Base64 encoded text in the input field</li>
            <li>Click "Decode" to convert back to original text</li>
            <li>Copy or download the decoded result</li>
            <li>Use this to decode Base64 encoded data from APIs or files</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


