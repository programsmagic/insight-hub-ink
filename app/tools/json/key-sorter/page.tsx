"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sortJSONKeys, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";

export default function JSONKeySorterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleSort = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON to sort");
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
      const sorted = sortJSONKeys(input);
      setOutput(sorted);
      toast.success("JSON keys sorted successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sort JSON keys");
      setOutput("");
      toast.error("Failed to sort JSON keys");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      title="JSON Key Sorter"
      description="Sort JSON object keys alphabetically to organize and standardize your JSON data structure"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON</Label>
              <div className="flex gap-2">
                <Button onClick={handleSort} size="sm">
                  Sort Keys
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
              placeholder='{"zebra": 1, "apple": 2, "banana": 3}'
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
              <Label htmlFor="output">Sorted JSON</Label>
              <div className="flex gap-2">
                {output && (
                  <>
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename="sorted.json" />
                  </>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Sorted JSON will appear here..."
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your JSON in the input field</li>
            <li>Click "Sort Keys" to alphabetically sort all object keys</li>
            <li>Nested objects are also sorted recursively</li>
            <li>Copy or download the sorted result</li>
            <li>Perfect for maintaining consistent data formats and easier comparisons</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}







