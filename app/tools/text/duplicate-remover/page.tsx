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
        <div className="flex items-center gap-4">
          <Label>Remove Mode:</Label>
          <RadioGroup value={mode} onValueChange={(v) => setMode(v as "line" | "word")} className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="line" id="line" />
              <Label htmlFor="line">Duplicate Lines</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="word" id="word" />
              <Label htmlFor="word">Duplicate Words</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleRemove} size="sm">
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
              placeholder="Cleaned text will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter text with duplicates</li>
            <li>Choose to remove duplicate lines or duplicate words</li>
            <li>Click "Remove Duplicates" to clean your text</li>
            <li>Copy or download the cleaned result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


