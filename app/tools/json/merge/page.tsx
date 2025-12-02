"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mergeJSON, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

export default function JSONMergePage() {
  const [inputs, setInputs] = useState<string[]>([""]);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const removeInput = (index: number) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index));
    }
  };

  const updateInput = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleMerge = () => {
    const validInputs = inputs.filter((input) => input.trim());
    if (validInputs.length < 2) {
      toast.error("Please enter at least 2 JSON objects to merge");
      return;
    }

    // Validate all inputs
    for (let i = 0; i < validInputs.length; i++) {
      const input = validInputs[i];
      if (!input) continue;
      const validation = validateJSON(input);
      if (!validation.valid) {
        setError(`JSON ${i + 1} is invalid: ${validation.error}`);
        setOutput("");
        toast.error(`JSON ${i + 1} is invalid`);
        return;
      }
    }

    try {
      setError("");
      const merged = mergeJSON(...validInputs);
      setOutput(merged);
      toast.success("JSON objects merged successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to merge JSON");
      setOutput("");
      toast.error("Failed to merge JSON");
    }
  };

  const handleClear = () => {
    setInputs([""]);
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      title="JSON Merger"
      description="Merge multiple JSON objects into one unified structure"
      category="JSON Tools"
    >
      <div className="space-y-6">
        {/* Input Fields */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>JSON Objects to Merge</Label>
            <Button onClick={addInput} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add JSON
            </Button>
          </div>
          <div className="space-y-3">
            {inputs.map((input, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`input-${index}`}>JSON {index + 1}</Label>
                  {inputs.length > 1 && (
                    <Button
                      onClick={() => removeInput(index)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <Textarea
                  id={`input-${index}`}
                  value={input}
                  onChange={(e) => updateInput(index, e.target.value)}
                  placeholder='{"key": "value"}'
                  className="font-mono text-sm min-h-[120px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button onClick={handleMerge}>Merge JSON</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Merged JSON</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="merged.json" />
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
            />
          </div>
        )}

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter multiple JSON objects (one per field)</li>
            <li>Click "Add JSON" to add more objects</li>
            <li>Click "Merge JSON" to combine all objects</li>
            <li>Later objects will overwrite keys from earlier objects</li>
            <li>Copy or download the merged result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

