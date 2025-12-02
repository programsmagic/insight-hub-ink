"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jsonPathQuery, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export default function JSONPathFinderPage() {
  const [input, setInput] = useState("");
  const [path, setPath] = useState("$");
  const [results, setResults] = useState<{ matches: any[]; error?: string } | null>(null);
  const [error, setError] = useState("");

  const handleQuery = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON to query");
      return;
    }

    if (!path.trim()) {
      toast.error("Please enter a JSONPath expression");
      return;
    }

    const validation = validateJSON(input);
    if (!validation.valid) {
      setError(validation.error || "Invalid JSON");
      setResults(null);
      toast.error("Invalid JSON");
      return;
    }

    try {
      setError("");
      const result = jsonPathQuery(input, path);
      setResults(result);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Found ${result.matches.length} match(es)`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to query JSON");
      setResults(null);
      toast.error("Failed to query JSON");
    }
  };

  const handleClear = () => {
    setInput("");
    setPath("$");
    setResults(null);
    setError("");
  };

  return (
    <ToolLayout
      title="JSON Path Finder"
      description="Find and extract values from JSON data using JSONPath expressions"
      category="JSON Tools"
    >
      <div className="space-y-6">
        {/* JSONPath Input */}
        <div className="space-y-2">
          <Label htmlFor="path">JSONPath Expression</Label>
          <div className="flex gap-2">
            <Input
              id="path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="$ or $.key or $.array[0]"
              className="font-mono"
            />
            <Button onClick={handleQuery}>Query</Button>
            <Button onClick={handleClear} variant="ghost">
              Clear
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Examples: $ (root), $.name, $.users[0], $.items.*
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <Label htmlFor="input">Input JSON</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "John", "users": [{"id": 1, "name": "Alice"}]}'
              className="font-mono text-sm min-h-[300px]"
            />
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-4">
            <Label>Query Results</Label>
            <Card className="p-4 min-h-[300px]">
              {results === null ? (
                <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                  <p>Enter JSON and a JSONPath expression, then click Query</p>
                </div>
              ) : results.error ? (
                <div className="text-destructive">
                  <p className="font-semibold">Error:</p>
                  <p>{results.error}</p>
                </div>
              ) : results.matches.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  <p>No matches found for the given path</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground mb-2">
                    Found {results.matches.length} match(es):
                  </div>
                  {results.matches.map((match, index) => (
                    <div key={index} className="bg-muted p-3 rounded">
                      <pre className="text-xs overflow-x-auto">
                        {JSON.stringify(match, null, 2)}
                      </pre>
                      <div className="mt-2">
                        <CopyButton text={JSON.stringify(match, null, 2)} label="Copy" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your JSON in the input field</li>
            <li>Enter a JSONPath expression (e.g., $.name, $.users[0], $.items.*)</li>
            <li>Click "Query" to extract matching values</li>
            <li>Copy the results for use in your code</li>
          </ul>
          <p className="font-semibold mt-4 mb-2">JSONPath Examples:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li><code>$</code> - Root element</li>
            <li><code>$.name</code> - Get "name" property</li>
            <li><code>$.users[0]</code> - First item in users array</li>
            <li><code>$.items.*</code> - All items in array</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

