"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { reverseText } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function TextReverserPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"character" | "word">("character");

  const handleReverse = () => {
    if (!input.trim()) {
      toast.error("Please enter text to reverse");
      return;
    }

    try {
      const reversed = reverseText(input, mode === "word");
      setOutput(reversed);
      toast.success("Text reversed successfully!");
    } catch (err) {
      toast.error("Failed to reverse text");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Text Reverser"
      description="Reverse text character by character or word by word instantly"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Label>Reverse Mode:</Label>
          <RadioGroup value={mode} onValueChange={(v) => setMode(v as "character" | "word")} className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="character" id="character" />
              <Label htmlFor="character">Character by Character</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="word" id="word" />
              <Label htmlFor="word">Word by Word</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleReverse} size="sm">
                  Reverse
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
              placeholder="Enter text to reverse..."
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Reversed Text</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="reversed.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Reversed text will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter text in the input field</li>
            <li>Choose to reverse by character or by word</li>
            <li>Click "Reverse" to flip your text</li>
            <li>Copy or download the result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

