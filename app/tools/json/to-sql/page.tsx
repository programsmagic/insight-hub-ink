"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jsonToSQL, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";

export default function JSONToSQLPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tableName, setTableName] = useState("data");
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
      const sql = jsonToSQL(input, tableName || "data");
      setOutput(sql);
      toast.success("SQL INSERT statements generated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert JSON to SQL");
      setOutput("");
      toast.error("Failed to convert JSON to SQL");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      title="JSON to SQL"
      description="Convert JSON data to SQL INSERT statements quickly and accurately"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="tableName">Table Name:</Label>
            <Input
              id="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="data"
              className="w-48"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON (Array of Objects)</Label>
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
              placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
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
              <Label htmlFor="output">SQL INSERT Statements</Label>
              <div className="flex gap-2">
                {output && (
                  <>
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename="insert.sql" />
                  </>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="SQL INSERT statements will appear here..."
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste a JSON array of objects in the input field</li>
            <li>Set the table name (default: "data")</li>
            <li>Click "Convert" to generate SQL INSERT statements</li>
            <li>Copy or download the SQL statements</li>
            <li>Perfect for importing JSON data into SQL databases</li>
          </ul>
          <p className="font-semibold mt-4 mb-2">Example JSON format:</p>
          <pre className="text-xs bg-background p-2 rounded mt-2 overflow-x-auto">
{`[
  {"name": "John", "age": 30, "city": "New York"},
  {"name": "Jane", "age": 25, "city": "London"}
]`}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}











