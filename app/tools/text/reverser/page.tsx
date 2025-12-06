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
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
          <Label className="font-medium">Reverse Mode:</Label>
          <RadioGroup value={mode} onValueChange={(v) => setMode(v as "character" | "word")} className="flex gap-6">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="character" id="character" />
              <Label htmlFor="character" className="cursor-pointer font-medium">Character by Character</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="word" id="word" />
              <Label htmlFor="word" className="cursor-pointer font-medium">Word by Word</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input" className="text-base">Input Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleReverse} size="sm" className="shadow-md">
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
              className="font-mono text-sm min-h-[300px] input-area"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output" className="text-base">Reversed Text</Label>
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
              className="font-mono text-sm min-h-[300px] output-area"
              placeholder="Reversed text will appear here..."
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
                  <span className="text-muted-foreground">Choose to reverse by character or by word</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Click "Reverse" to flip your text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Copy or download the result</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}



