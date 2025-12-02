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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="startFrom">Start From:</Label>
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
              <Label htmlFor="input">Input Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleAdd} size="sm">
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
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Numbered Text</Label>
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
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Text with line numbers will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter text with one item per line</li>
            <li>Set the starting line number (default: 1)</li>
            <li>Click "Add Line Numbers" to number each line</li>
            <li>Copy or download the numbered result</li>
            <li>Perfect for code snippets, lists, and documentation</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

