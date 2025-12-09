"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { textToMorse } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function TextToMorsePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter text to convert");
      return;
    }

    try {
      const morse = textToMorse(input);
      setOutput(morse);
      toast.success("Text converted to Morse code successfully!");
    } catch (err) {
      toast.error("Failed to convert text");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Text to Morse Code"
      description="Convert text to Morse code instantly for communication and learning"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input Text</Label>
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
              placeholder="Enter text to convert to Morse code..."
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Morse Code</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="morse.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Morse code will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter text in the input field</li>
            <li>Click "Convert" to transform to Morse code</li>
            <li>Letters are converted to dots (.) and dashes (-)</li>
            <li>Copy or download the Morse code result</li>
            <li>Perfect for learning Morse code or communication</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}




