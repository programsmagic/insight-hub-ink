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
              <Label htmlFor="input">Input JSON</Label>
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
              placeholder='{"name": "John", "age": 30}'
              className="font-mono text-sm min-h-[300px]"
            />
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Minified JSON</Label>
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
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Minified JSON will appear here..."
            />
            {output && (
              <div className="text-xs text-muted-foreground">
                Size: {input.length} → {output.length} characters (
                {Math.round((1 - output.length / input.length) * 100)}% reduction)
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your JSON in the input field</li>
            <li>Click "Minify" to remove all whitespace and compress your JSON</li>
            <li>Copy or download the minified result</li>
            <li>Minified JSON is perfect for production environments and API responses</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


