"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Base64ToImagePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleProcess = () => {
    if (!input.trim()) {
      toast.error("Please enter input");
      return;
    }
    // TODO: Implement functionality
    toast.info("Feature coming soon");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Base64 to Image"
      description="Convert Base64 data URLs to images"
      category="Image Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input</Label>
              <div className="flex gap-2">
                <Button onClick={handleProcess} size="sm">Process</Button>
                <Button onClick={handleClear} variant="ghost" size="sm">Clear</Button>
              </div>
            </div>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input..."
              className="font-mono text-sm min-h-[300px]"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Output</Label>
              {output && <CopyButton text={output} />}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Output will appear here..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
