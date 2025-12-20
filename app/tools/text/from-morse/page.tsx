"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { morseToText } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function MorseToTextPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter Morse code to decode");
      return;
    }

    try {
      const text = morseToText(input);
      setOutput(text);
      toast.success("Morse code decoded successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to decode Morse code");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Morse Code to Text"
      description="Decode Morse code back to readable text instantly"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Morse Code (space-separated)</Label>
              <div className="flex gap-2">
                <Button onClick={handleConvert} size="sm">
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
              placeholder=".... . .-.. .-.. ---"
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
            <li>Enter Morse code (dots and dashes, space-separated)</li>
            <li>Click "Decode" to convert to text</li>
            <li>Copy or download the decoded result</li>
            <li>Format: Use dots (.) for short signals and dashes (-) for long signals</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}







