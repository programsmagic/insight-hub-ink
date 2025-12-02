"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { jsonDiff, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function JSONDiffPage() {
  const [json1, setJson1] = useState("");
  const [json2, setJson2] = useState("");
  const [diff, setDiff] = useState<{
    added: any[];
    removed: any[];
    modified: Array<{ key: string; oldValue: any; newValue: any }>;
  } | null>(null);
  const [error, setError] = useState("");

  const handleCompare = () => {
    if (!json1.trim() || !json2.trim()) {
      toast.error("Please enter both JSON objects to compare");
      return;
    }

    const validation1 = validateJSON(json1);
    const validation2 = validateJSON(json2);

    if (!validation1.valid) {
      setError(`First JSON is invalid: ${validation1.error}`);
      setDiff(null);
      toast.error("First JSON is invalid");
      return;
    }

    if (!validation2.valid) {
      setError(`Second JSON is invalid: ${validation2.error}`);
      setDiff(null);
      toast.error("Second JSON is invalid");
      return;
    }

    try {
      setError("");
      const result = jsonDiff(json1, json2);
      setDiff(result);
      toast.success("Comparison completed!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to compare JSON");
      setDiff(null);
      toast.error("Failed to compare JSON");
    }
  };

  const handleClear = () => {
    setJson1("");
    setJson2("");
    setDiff(null);
    setError("");
  };

  return (
    <ToolLayout
      title="JSON Diff"
      description="Compare two JSON objects and highlight differences side-by-side"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input 1 */}
          <div className="space-y-4">
            <Label htmlFor="json1">First JSON</Label>
            <Textarea
              id="json1"
              value={json1}
              onChange={(e) => setJson1(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="font-mono text-sm min-h-[250px]"
            />
          </div>

          {/* Input 2 */}
          <div className="space-y-4">
            <Label htmlFor="json2">Second JSON</Label>
            <Textarea
              id="json2"
              value={json2}
              onChange={(e) => setJson2(e.target.value)}
              placeholder='{"name": "Jane", "age": 25}'
              className="font-mono text-sm min-h-[250px]"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button onClick={handleCompare}>Compare JSON</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Diff Results */}
        {diff && (
          <div className="space-y-4">
            {diff.added.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default" className="bg-green-600">
                    Added ({diff.added.length})
                  </Badge>
                </div>
                <div className="space-y-2">
                  {diff.added.map((item, index) => (
                    <div key={index} className="text-sm bg-green-50 dark:bg-green-950/20 p-2 rounded">
                      <span className="font-semibold">{item.path}:</span>{" "}
                      <span className="font-mono">{JSON.stringify(item.value)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {diff.removed.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="destructive">
                    Removed ({diff.removed.length})
                  </Badge>
                </div>
                <div className="space-y-2">
                  {diff.removed.map((item, index) => (
                    <div key={index} className="text-sm bg-red-50 dark:bg-red-950/20 p-2 rounded">
                      <span className="font-semibold">{item.path}:</span>{" "}
                      <span className="font-mono">{JSON.stringify(item.value)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {diff.modified.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                    Modified ({diff.modified.length})
                  </Badge>
                </div>
                <div className="space-y-3">
                  {diff.modified.map((item, index) => (
                    <div key={index} className="text-sm bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded">
                      <div className="font-semibold mb-2">{item.key}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-xs text-muted-foreground">Old:</span>
                          <div className="font-mono text-xs bg-background p-2 rounded mt-1">
                            {JSON.stringify(item.oldValue)}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">New:</span>
                          <div className="font-mono text-xs bg-background p-2 rounded mt-1">
                            {JSON.stringify(item.newValue)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {diff.added.length === 0 && diff.removed.length === 0 && diff.modified.length === 0 && (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">No differences found. JSON objects are identical.</p>
              </Card>
            )}
          </div>
        )}

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste two JSON objects in the input fields</li>
            <li>Click "Compare JSON" to find differences</li>
            <li>View added, removed, and modified fields</li>
            <li>Perfect for tracking API changes and debugging configuration updates</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

