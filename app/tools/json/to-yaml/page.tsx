"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { jsonToYAML, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";

export default function JSONToYAMLPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
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
      const yaml = jsonToYAML(input, indent);
      setOutput(yaml);
      toast.success("JSON converted to YAML successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert JSON to YAML");
      setOutput("");
      toast.error("Failed to convert JSON to YAML");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      title="JSON to YAML"
      description="Convert JSON data to YAML format with this free online converter"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON</Label>
              <div className="flex gap-2">
                <Button onClick={handleConvert} size="sm">
                  Convert
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
              <Label htmlFor="output">YAML Output</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="indent" className="text-xs">Indent:</Label>
                  <select
                    id="indent"
                    value={indent}
                    onChange={(e) => setIndent(Number(e.target.value))}
                    className="px-2 py-1 border rounded-md bg-background text-sm"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                  </select>
                </div>
                {output && (
                  <div className="flex gap-2">
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename="converted.yaml" />
                  </div>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="YAML output will appear here..."
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your JSON in the input field</li>
            <li>Choose indentation level (2 or 4 spaces)</li>
            <li>Click "Convert" to transform JSON to YAML format</li>
            <li>Copy or download the YAML result</li>
            <li>Perfect for Docker Compose, Kubernetes manifests, and CI/CD pipelines</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}








