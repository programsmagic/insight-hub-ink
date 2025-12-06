"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronDown } from "lucide-react";

function JSONTreeNode({ data, path = "" }: { data: any; path?: string }) {
  const [expanded, setExpanded] = useState(true);

  if (data === null) {
    return <span className="text-muted-foreground">null</span>;
  }

  if (typeof data !== "object") {
    return (
      <span className={typeof data === "string" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}>
        {typeof data === "string" ? `"${data}"` : String(data)}
      </span>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="ml-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 hover:text-accent"
        >
          {expanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="text-purple-600 dark:text-purple-400">Array</span>
          <span className="text-muted-foreground text-sm">({data.length})</span>
        </button>
        {expanded && (
          <div className="ml-6 mt-1 space-y-1">
            {data.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-muted-foreground text-sm">[{index}]:</span>
                <JSONTreeNode data={item} path={`${path}[${index}]`} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const keys = Object.keys(data);
  return (
    <div className="ml-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 hover:text-accent"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
        <span className="text-orange-600 dark:text-orange-400">Object</span>
        <span className="text-muted-foreground text-sm">({keys.length} keys)</span>
      </button>
      {expanded && (
        <div className="ml-6 mt-1 space-y-1">
          {keys.map((key) => (
            <div key={key} className="flex items-start gap-2">
              <span className="text-accent font-semibold">"{key}":</span>
              <JSONTreeNode data={data[key]} path={path ? `${path}.${key}` : key} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JSONTreeViewerPage() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<any>(null);
  const [error, setError] = useState("");

  const handleParse = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON to view");
      return;
    }

    const validation = validateJSON(input);
    if (!validation.valid) {
      setError(validation.error || "Invalid JSON");
      setParsed(null);
      toast.error("Invalid JSON");
      return;
    }

    try {
      setError("");
      const parsedData = JSON.parse(input);
      setParsed(parsedData);
      toast.success("JSON parsed successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse JSON");
      setParsed(null);
      toast.error("Failed to parse JSON");
    }
  };

  const handleClear = () => {
    setInput("");
    setParsed(null);
    setError("");
  };

  return (
    <ToolLayout
      title="JSON Tree Viewer"
      description="Visualize JSON data in an interactive tree structure that makes complex nested data easy to navigate"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON</Label>
              <div className="flex gap-2">
                <Button onClick={handleParse} size="sm">
                  View Tree
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
              placeholder='{"name": "John", "users": [{"id": 1, "name": "Alice"}]}'
              className="font-mono text-sm min-h-[400px]"
            />
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
          </div>

          {/* Tree View */}
          <div className="space-y-4">
            <Label>Tree View</Label>
            <Card className="p-4 min-h-[400px] bg-muted/50 overflow-auto">
              {parsed === null ? (
                <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                  <p>Enter JSON and click "View Tree" to visualize</p>
                </div>
              ) : (
                <div className="font-mono text-sm">
                  <JSONTreeNode data={parsed} />
                </div>
              )}
            </Card>
            {parsed && (
              <div className="flex gap-2">
                <CopyButton text={JSON.stringify(parsed, null, 2)} label="Copy JSON" />
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your JSON in the input field</li>
            <li>Click "View Tree" to visualize the structure</li>
            <li>Click on nodes to expand/collapse nested structures</li>
            <li>Perfect for exploring large JSON files and understanding data relationships</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}



