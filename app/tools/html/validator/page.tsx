"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { validateHTML } from "@/lib/tools/html-utils";
import { toast } from "sonner";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function HTMLValidatorPage() {
  const [input, setInput] = useState("");
  const [validation, setValidation] = useState<{
    valid: boolean;
    errors: string[];
    warnings: string[];
  } | null>(null);

  const handleValidate = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML to validate");
      return;
    }

    try {
      const result = validateHTML(input);
      setValidation(result);
      if (result.valid) {
        toast.success("HTML is valid!");
      } else {
        toast.error(`Found ${result.errors.length} error(s)`);
      }
    } catch (err) {
      toast.error("Failed to validate HTML");
    }
  };

  const handleClear = () => {
    setInput("");
    setValidation(null);
  };

  return (
    <ToolLayout
      title="HTML Validator"
      description="Validate HTML code for errors and warnings"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input HTML</Label>
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
              placeholder="<div><p>Hello</p></div>"
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <Label>Validation Results</Label>
            <Card className="p-4 min-h-[300px]">
              {validation === null ? (
                <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                  <p>Enter HTML and click Validate</p>
                </div>
              ) : validation.valid ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Valid HTML</h3>
                    <p className="text-muted-foreground">Your HTML code is valid!</p>
                  </div>
                  {validation.warnings.length > 0 && (
                    <div className="mt-4 text-left">
                      <Label className="text-yellow-600">Warnings:</Label>
                      {validation.warnings.map((warning, index) => (
                        <div key={index} className="text-sm text-yellow-600 mt-1">
                          {warning}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-red-500" />
                    <div>
                      <h3 className="text-xl font-semibold text-red-600">Invalid HTML</h3>
                      <p className="text-sm text-muted-foreground">
                        Found {validation.errors.length} error(s)
                      </p>
                    </div>
                  </div>

                  {validation.errors.length > 0 && (
                    <div className="space-y-2">
                      <Label>Errors:</Label>
                      {validation.errors.map((error, index) => (
                        <div key={index} className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                          <Badge variant="destructive" className="mb-2">Error {index + 1}</Badge>
                          <p className="text-sm">{error}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {validation.warnings.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-yellow-600 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Warnings:
                      </Label>
                      {validation.warnings.map((warning, index) => (
                        <div key={index} className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">{warning}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your HTML code in the input field</li>
            <li>Click "Validate" to check for errors</li>
            <li>Review errors and warnings</li>
            <li>Fix issues and validate again</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


