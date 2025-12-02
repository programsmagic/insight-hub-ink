"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatJSON, minifyJSON, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");

  const handleFormat = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON to format");
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
      const formatted = formatJSON(input, indent);
      setOutput(formatted);
      toast.success("JSON formatted successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to format JSON");
      setOutput("");
      toast.error("Failed to format JSON");
    }
  };

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
      title="JSON Formatter"
      description="Format and beautify JSON with proper indentation and syntax highlighting"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON</Label>
              <div className="flex gap-2">
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
              <Label htmlFor="output">Formatted JSON</Label>
              <div className="flex gap-2">
                {output && (
                  <>
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename="formatted.json" />
                  </>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Formatted JSON will appear here..."
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="indent">Indent:</Label>
            <select
              id="indent"
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="px-3 py-1.5 border rounded-md bg-background"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>
          <Button onClick={handleFormat}>Format JSON</Button>
          <Button onClick={handleMinify} variant="outline">
            Minify JSON
          </Button>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your JSON in the input field</li>
            <li>Click "Format JSON" to beautify with indentation</li>
            <li>Click "Minify JSON" to remove all whitespace</li>
            <li>Copy or download the formatted result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

