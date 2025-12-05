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
        <div className="flex items-center gap-4">
          <Label>Sort Order:</Label>
          <RadioGroup value={order} onValueChange={(v) => setOrder(v as "asc" | "desc")} className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="asc" id="asc" />
              <Label htmlFor="asc">Ascending (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="desc" id="desc" />
              <Label htmlFor="desc">Descending (Z-A)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input Text (One per line)</Label>
              <div className="flex gap-2">
                <Button onClick={handleSort} size="sm">
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
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Sorted Text</Label>
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
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Sorted lines will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter text with one item per line</li>
            <li>Choose ascending (A-Z) or descending (Z-A) order</li>
            <li>Click "Sort Lines" to organize your text</li>
            <li>Copy or download the sorted result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


