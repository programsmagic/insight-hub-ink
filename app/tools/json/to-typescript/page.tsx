"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jsonToTypeScript, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";

export default function JSONToTypeScriptPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [interfaceName, setInterfaceName] = useState("GeneratedType");
  const [error, setError] = useState("");

  const handleGenerate = () => {
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
      const typescript = jsonToTypeScript(input, interfaceName || "GeneratedType");
      setOutput(typescript);
      toast.success("TypeScript interface generated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate TypeScript");
      setOutput("");
      toast.error("Failed to generate TypeScript");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      title="JSON to TypeScript"
      description="Generate TypeScript interfaces and type definitions from JSON data automatically"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="interfaceName">Interface Name:</Label>
            <Input
              id="interfaceName"
              value={interfaceName}
              onChange={(e) => setInterfaceName(e.target.value)}
              placeholder="GeneratedType"
              className="w-48"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON</Label>
              <div className="flex gap-2">
                <Button onClick={handleGenerate} size="sm">
                  Generate
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
              placeholder='{"name": "John", "age": 30, "active": true}'
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
              <Label htmlFor="output">TypeScript Interface</Label>
              <div className="flex gap-2">
                {output && (
                  <>
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename={`${interfaceName || "GeneratedType"}.ts`} />
                  </>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="TypeScript interface will appear here..."
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your JSON in the input field</li>
            <li>Optionally set a custom interface name</li>
            <li>Click "Generate" to create TypeScript interface</li>
            <li>Copy or download the generated TypeScript code</li>
            <li>Save hours of manual typing when working with TypeScript projects</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}








