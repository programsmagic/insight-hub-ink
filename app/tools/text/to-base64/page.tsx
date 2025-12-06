"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { encodeBase64 } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function TextToBase64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    if (!input.trim()) {
      toast.error("Please enter text to encode");
      return;
    }

    try {
      const encoded = encodeBase64(input);
      setOutput(encoded);
      toast.success("Text encoded to Base64 successfully!");
    } catch (err) {
      toast.error("Failed to encode text");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Text to Base64"
      description="Encode text to Base64 format instantly for safe transmission and storage"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input" className="text-base">Input Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleEncode} size="sm" className="shadow-md">
                  Encode
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
              placeholder="Enter text to encode to Base64..."
              className="font-mono text-sm min-h-[300px] input-area"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output" className="text-base">Base64 Encoded</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="encoded.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] output-area"
              placeholder="Base64 encoded text will appear here..."
            />
          </div>
        </div>

        <div className="text-sm bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/10 p-6 rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-1.5 rounded bg-accent/10 flex-shrink-0">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-base mb-3 text-foreground">How to use:</p>
              <ul className="list-none space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Enter text in the input field</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Click "Encode" to convert to Base64</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Copy or download the encoded result</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Base64 encoding is commonly used for data transmission and storage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}



