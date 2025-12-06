"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { minifyJSON, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";

export default function JSONMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleMinify = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON to minify");
      return;
    }

    const validation = validateJSON(input);
    if (!validation.valid) {
      setError(validation.error || "Invalid JSON");
      setOutput("");
      toast.error("Invalid JSON");
      return;
    }

    try {
      setError("");
      const minified = minifyJSON(input);
      setOutput(minified);
      toast.success("JSON minified successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to minify JSON");
      setOutput("");
      toast.error("Failed to minify JSON");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      title="JSON Minifier"
      description="Minify JSON by removing whitespace and unnecessary characters to reduce file size"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input" className="text-base">Input JSON</Label>
              <div className="flex gap-2">
                <Button onClick={handleMinify} size="sm" className="shadow-md">
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
              placeholder='{"name": "John", "age": 30}'
              className="font-mono text-sm min-h-[300px] input-area"
            />
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border-2 border-destructive/20 p-4 rounded-md flex items-start gap-2 animate-slide-down">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output" className="text-base">Minified JSON</Label>
              <div className="flex gap-2">
                {output && (
                  <>
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename="minified.json" />
                  </>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] output-area"
              placeholder="Minified JSON will appear here..."
            />
            {output && (
              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md border border-border/50">
                Size: {input.length} → {output.length} characters (
                {Math.round((1 - output.length / input.length) * 100)}% reduction)
              </div>
            )}
          </div>
        </div>

        {/* Info */}
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
                  <span className="text-muted-foreground">Paste your JSON in the input field</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Click "Minify" to remove all whitespace and compress your JSON</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Copy or download the minified result</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Minified JSON is perfect for production environments and API responses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}



