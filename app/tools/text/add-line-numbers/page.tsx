"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addLineNumbers } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function AddLineNumbersPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [startFrom, setStartFrom] = useState(1);

  const handleAdd = () => {
    if (!input.trim()) {
      toast.error("Please enter text");
      return;
    }

    try {
      const numbered = addLineNumbers(input, startFrom);
      setOutput(numbered);
      toast.success("Line numbers added successfully!");
    } catch (err) {
      toast.error("Failed to add line numbers");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Add Line Numbers"
      description="Add line numbers to each line of text for easy reference"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-3">
            <Label htmlFor="startFrom" className="font-medium">Start From:</Label>
            <Input
              id="startFrom"
              type="number"
              value={startFrom}
              onChange={(e) => setStartFrom(Number(e.target.value) || 1)}
              className="w-24"
              min={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input" className="text-base">Input Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleAdd} size="sm" className="shadow-md">
                  Add Line Numbers
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
              placeholder="Enter text, one item per line..."
              className="font-mono text-sm min-h-[300px] input-area"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output" className="text-base">Numbered Text</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="numbered.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] output-area"
              placeholder="Text with line numbers will appear here..."
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
                  <span className="text-muted-foreground">Enter text with one item per line</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Set the starting line number (default: 1)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Click "Add Line Numbers" to number each line</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Copy or download the numbered result</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Perfect for code snippets, lists, and documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}



