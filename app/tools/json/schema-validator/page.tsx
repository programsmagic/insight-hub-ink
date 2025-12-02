"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { validateJSONSchema, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function JSONSchemaValidatorPage() {
  const [json, setJson] = useState("");
  const [schema, setSchema] = useState("");
  const [validation, setValidation] = useState<{ valid: boolean; errors: string[] } | null>(null);
  const [error, setError] = useState("");

  const handleValidate = () => {
    if (!json.trim()) {
      toast.error("Please enter JSON to validate");
      return;
    }

    if (!schema.trim()) {
      toast.error("Please enter a JSON Schema");
      return;
    }

    const jsonValidation = validateJSON(json);
    if (!jsonValidation.valid) {
      setError(`JSON is invalid: ${jsonValidation.error}`);
      setValidation(null);
      toast.error("Invalid JSON");
      return;
    }

    const schemaValidation = validateJSON(schema);
    if (!schemaValidation.valid) {
      setError(`Schema is invalid: ${schemaValidation.error}`);
      setValidation(null);
      toast.error("Invalid JSON Schema");
      return;
    }

    try {
      setError("");
      const result = validateJSONSchema(json, schema);
      setValidation(result);
      if (result.valid) {
        toast.success("JSON is valid according to the schema!");
      } else {
        toast.error(`Validation failed: ${result.errors.length} error(s)`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to validate");
      setValidation(null);
      toast.error("Failed to validate");
    }
  };

  const handleClear = () => {
    setJson("");
    setSchema("");
    setValidation(null);
    setError("");
  };

  const loadExample = () => {
    setJson('{"name": "John", "age": 30, "email": "john@example.com"}');
    setSchema(`{
  "type": "object",
  "required": ["name", "age"],
  "properties": {
    "name": {"type": "string"},
    "age": {"type": "number"},
    "email": {"type": "string"}
  }
}`);
  };

  return (
    <ToolLayout
      title="JSON Schema Validator"
      description="Validate JSON data against a JSON Schema to ensure it meets your structure and validation rules"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button onClick={loadExample} variant="outline" size="sm">
            Load Example
          </Button>
          <Button onClick={handleClear} variant="ghost" size="sm">
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* JSON Input */}
          <div className="space-y-4">
            <Label htmlFor="json">JSON Data</Label>
            <Textarea
              id="json"
              value={json}
              onChange={(e) => setJson(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="font-mono text-sm min-h-[250px]"
            />
          </div>

          {/* Schema Input */}
          <div className="space-y-4">
            <Label htmlFor="schema">JSON Schema</Label>
            <Textarea
              id="schema"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder='{"type": "object", "properties": {...}}'
              className="font-mono text-sm min-h-[250px]"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button onClick={handleValidate}>Validate</Button>
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Validation Results */}
        {validation && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {validation.valid ? (
                <>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-600">Valid</h3>
                    <p className="text-sm text-muted-foreground">
                      JSON conforms to the schema
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8 text-red-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-600">Invalid</h3>
                    <p className="text-sm text-muted-foreground">
                      Found {validation.errors.length} error(s)
                    </p>
                  </div>
                </>
              )}
            </div>

            {validation.errors.length > 0 && (
              <div className="space-y-2">
                <Label>Validation Errors:</Label>
                {validation.errors.map((err, index) => (
                  <div key={index} className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                    <Badge variant="destructive" className="mb-2">Error {index + 1}</Badge>
                    <p className="text-sm">{err}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter your JSON data in the first field</li>
            <li>Enter a JSON Schema in the second field</li>
            <li>Click "Validate" to check if JSON conforms to the schema</li>
            <li>View validation errors if any are found</li>
            <li>Click "Load Example" to see a sample validation</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

