"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { minifyHTML } from "@/lib/tools/html-utils";
import { toast } from "sonner";

export default function HTMLMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML to minify");
      return;
    }

    try {
      const minified = minifyHTML(input);
      setOutput(minified);
      const reduction = Math.round((1 - minified.length / input.length) * 100);
      toast.success(`HTML minified! ${reduction}% size reduction`);
    } catch (err) {
      toast.error("Failed to minify HTML");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="HTML Minifier"
      description="Minify HTML by removing whitespace and comments to reduce file size"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input HTML</Label>
              <div className="flex gap-2">
                <Button onClick={handleMinify} size="sm">
                  Minify
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
              placeholder="<div>  <p>Hello</p>  </div>"
              className="font-mono text-sm min-h-[300px]"
            />
            {input && (
              <div className="text-xs text-muted-foreground">
                Size: {input.length} characters
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Minified HTML</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="minified.html" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Minified HTML will appear here..."
            />
            {output && (
              <div className="text-xs text-muted-foreground">
                Size: {output.length} characters (
                {Math.round((1 - output.length / input.length) * 100)}% reduction)
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your HTML in the input field</li>
            <li>Click "Minify" to remove whitespace and comments</li>
            <li>Copy or download the minified result</li>
            <li>Perfect for production to reduce file size and improve load times</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}










