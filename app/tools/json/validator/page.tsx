"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

export default function JSONValidatorPage() {
  const [input, setInput] = useState("");
  const [validation, setValidation] = useState<{ valid: boolean; error?: string } | null>(null);

  const handleValidate = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON to validate");
      return;
    }

    const result = validateJSON(input);
    setValidation(result);
    if (result.valid) {
      toast.success("JSON is valid!");
    } else {
      toast.error("JSON is invalid");
    }
  };

  const handleClear = () => {
    setInput("");
    setValidation(null);
  };

  return (
    <ToolLayout
      title="JSON Validator"
      description="Validate JSON syntax and check for errors instantly with this free online JSON validator"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON</Label>
              <div className="flex gap-2">
                <Button onClick={handleValidate} size="sm">
                  Validate
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
              className="font-mono text-sm min-h-[400px]"
            />
          </div>

          {/* Result */}
          <div className="space-y-4">
            <Label>Validation Result</Label>
            <div className="min-h-[400px] p-6 rounded-lg border bg-muted/50 flex items-center justify-center">
              {validation === null ? (
                <div className="text-center text-muted-foreground">
                  <p>Enter JSON and click Validate to check syntax</p>
                </div>
              ) : validation.valid ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Valid JSON</h3>
                    <p className="text-muted-foreground">Your JSON syntax is correct!</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 w-full">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-600 mb-2">Invalid JSON</h3>
                    <p className="text-muted-foreground mb-4">Found syntax errors:</p>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 text-left">
                      <p className="text-sm text-destructive font-mono">{validation.error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your JSON code in the input field</li>
            <li>Click "Validate" to check for syntax errors</li>
            <li>The tool will identify missing commas, unclosed brackets, and other common JSON issues</li>
            <li>Fix any errors and validate again until your JSON is valid</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

