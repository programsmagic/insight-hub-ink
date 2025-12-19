"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatHTML } from "@/lib/tools/html-utils";
import { toast } from "sonner";

export default function HTMLFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);

  const handleFormat = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML to format");
      return;
    }

    try {
      const formatted = formatHTML(input, indent);
      setOutput(formatted);
      toast.success("HTML formatted successfully!");
    } catch (err) {
      toast.error("Failed to format HTML");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="HTML Formatter"
      description="Format and beautify HTML code with proper indentation"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="indent">Indent:</Label>
            <Input
              id="indent"
              type="number"
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value) || 2)}
              className="w-24"
              min={1}
              max={8}
            />
            <span className="text-sm text-muted-foreground">spaces</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input HTML</Label>
              <div className="flex gap-2">
                <Button onClick={handleFormat} size="sm">
                  Format
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
              placeholder="<div><p>Hello World</p></div>"
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Formatted HTML</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="formatted.html" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Formatted HTML will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your HTML code in the input field</li>
            <li>Choose indentation level (default: 2 spaces)</li>
            <li>Click "Format" to beautify your HTML</li>
            <li>Copy or download the formatted result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}






