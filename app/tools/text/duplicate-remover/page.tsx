"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { removeDuplicates } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function TextDuplicateRemoverPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"line" | "word">("line");

  const handleRemove = () => {
    if (!input.trim()) {
      toast.error("Please enter text");
      return;
    }

    try {
      const cleaned = removeDuplicates(input, mode === "line");
      setOutput(cleaned);
      const removed = mode === "line" 
        ? input.split("\n").length - cleaned.split("\n").length
        : input.split(/\s+/).length - cleaned.split(/\s+/).length;
      toast.success(`Removed ${removed} duplicate(s)!`);
    } catch (err) {
      toast.error("Failed to remove duplicates");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Remove Duplicates"
      description="Remove duplicate lines or words from text quickly and easily"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
          <Label className="font-medium">Remove Mode:</Label>
          <RadioGroup value={mode} onValueChange={(v) => setMode(v as "line" | "word")} className="flex gap-6">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="line" id="line" />
              <Label htmlFor="line" className="cursor-pointer font-medium">Duplicate Lines</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="word" id="word" />
              <Label htmlFor="word" className="cursor-pointer font-medium">Duplicate Words</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input" className="text-base">Input Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleRemove} size="sm" className="shadow-md">
                  Remove Duplicates
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
              placeholder={mode === "line" ? "Enter text with duplicate lines..." : "Enter text with duplicate words..."}
              className="font-mono text-sm min-h-[300px] input-area"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output" className="text-base">Cleaned Text</Label>
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
              className="font-mono text-sm min-h-[300px] output-area"
              placeholder="Cleaned text will appear here..."
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
                  <span className="text-muted-foreground">Enter text with duplicates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Choose to remove duplicate lines or duplicate words</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Click "Remove Duplicates" to clean your text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Copy or download the cleaned result</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}



