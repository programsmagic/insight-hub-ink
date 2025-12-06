"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sortLines } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function TextSortLinesPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    if (!input.trim()) {
      toast.error("Please enter text to sort");
      return;
    }

    try {
      const sorted = sortLines(input, order);
      setOutput(sorted);
      toast.success("Lines sorted successfully!");
    } catch (err) {
      toast.error("Failed to sort lines");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Sort Text Lines"
      description="Sort lines of text alphabetically in ascending or descending order"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
          <Label className="font-medium">Sort Order:</Label>
          <RadioGroup value={order} onValueChange={(v) => setOrder(v as "asc" | "desc")} className="flex gap-6">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="asc" id="asc" />
              <Label htmlFor="asc" className="cursor-pointer font-medium">Ascending (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="desc" id="desc" />
              <Label htmlFor="desc" className="cursor-pointer font-medium">Descending (Z-A)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input" className="text-base">Input Text (One per line)</Label>
              <div className="flex gap-2">
                <Button onClick={handleSort} size="sm" className="shadow-md">
                  Sort Lines
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
              <Label htmlFor="output" className="text-base">Sorted Text</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="sorted.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] output-area"
              placeholder="Sorted lines will appear here..."
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
                  <span className="text-muted-foreground">Choose ascending (A-Z) or descending (Z-A) order</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Click "Sort Lines" to organize your text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Copy or download the sorted result</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}



