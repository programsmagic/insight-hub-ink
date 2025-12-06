"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";

export default function JSONValidatorPage() {
  const analytics = useToolAnalytics("json-validator");
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
      analytics.trackUsage("validate", { valid: true, inputLength: input.length });
    } else {
      toast.error("JSON is invalid");
      analytics.trackUsage("validate", { valid: false, inputLength: input.length, error: result.error });
    }
  };

  const handleClear = () => {
    setInput("");
    setValidation(null);
  };

  return (
    <ToolLayout
      title="JSON Validator"
      description="Validate JSON syntax and check for errors instantly with this free online JSON validator. This tool helps developers identify syntax errors, missing commas, unclosed brackets, and other common JSON issues before they cause problems in production."
      category="JSON Tools"
      content={{
        aboutText:
          "JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to read and write, and easy for machines to parse and generate. However, JSON has strict syntax rules, and even small errors can cause parsing failures. This validator checks your JSON for syntax errors, missing commas, unclosed brackets, incorrect quotes, and other common issues, helping you debug JSON data before using it in APIs, configuration files, or data processing.",
        useCases: [
          "API development: Validate JSON responses from APIs before processing",
          "Configuration files: Check JSON config files for syntax errors",
          "Data validation: Verify JSON data before storing in databases",
          "Debugging: Identify and fix JSON syntax errors quickly",
          "Code review: Validate JSON in pull requests and code reviews",
          "Data migration: Ensure JSON data is valid before migration",
          "Frontend development: Validate JSON before parsing in JavaScript",
        ],
        examples: [
          {
            input: '{"name": "John", "age": 30}',
            output: "Valid JSON",
            description: "Valid JSON object with proper syntax",
          },
          {
            input: '{"name": "John" "age": 30}',
            output: "Invalid JSON - Missing comma",
            description: "Common error: missing comma between properties",
          },
          {
            input: '{"name": "John", "age": 30',
            output: "Invalid JSON - Unclosed bracket",
            description: "Common error: missing closing brace",
          },
          {
            input: '{"name": "John", "hobbies": ["reading", "coding"]}',
            output: "Valid JSON",
            description: "Valid JSON with nested array",
          },
        ],
        faqs: [
          {
            question: "What are the most common JSON errors?",
            answer:
              "Common JSON errors include: missing commas between properties, unclosed brackets or braces, trailing commas (not allowed in JSON), using single quotes instead of double quotes, and invalid escape sequences. This validator identifies all of these issues.",
          },
          {
            question: "Does this validator check JSON schema?",
            answer:
              "No, this tool only validates JSON syntax (structure and formatting). It doesn't validate against a JSON schema or check data types, required fields, or value constraints. For schema validation, use a JSON Schema validator.",
          },
          {
            question: "Can I validate minified JSON?",
            answer:
              "Yes, this validator works with both formatted and minified JSON. However, formatted JSON is easier to debug when errors are found. Consider using a JSON formatter first if you're working with minified JSON.",
          },
          {
            question: "What's the difference between JSON and JavaScript objects?",
            answer:
              "JSON is a text format that follows strict rules: keys must be in double quotes, no trailing commas, no comments, and only specific data types are allowed. JavaScript objects are more flexible. JSON can be parsed into JavaScript objects, but not all JavaScript objects can be converted to valid JSON.",
          },
        ],
        relatedTools: [
          { id: "json-formatter", name: "JSON Formatter", route: "/tools/json/formatter" },
          { id: "json-minifier", name: "JSON Minifier", route: "/tools/json/minifier" },
          { id: "json-to-csv", name: "JSON to CSV", route: "/tools/json/to-csv" },
        ],
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input" className="text-base">Input JSON</Label>
              <div className="flex gap-2">
                <Button onClick={handleValidate} size="sm" className="shadow-md">
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
              className="font-mono text-sm min-h-[400px] input-area"
            />
          </div>

          {/* Result */}
          <div className="space-y-4">
            <Label className="text-base">Validation Result</Label>
            <div className="min-h-[400px] p-6 rounded-lg border-2 border-border/50 bg-muted/30 flex items-center justify-center transition-all duration-200">
              {validation === null ? (
                <div className="text-center text-muted-foreground">
                  <p className="text-base">Enter JSON and click Validate to check syntax</p>
                </div>
              ) : validation.valid ? (
                <div className="text-center space-y-4 animate-scale-in">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-scale-in" />
                  <div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">Valid JSON</h3>
                    <p className="text-muted-foreground">Your JSON syntax is correct!</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 w-full animate-scale-in">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto animate-scale-in" />
                  <div>
                    <h3 className="text-xl font-bold text-red-600 mb-2">Invalid JSON</h3>
                    <p className="text-muted-foreground mb-4">Found syntax errors:</p>
                    <div className="bg-destructive/10 border-2 border-destructive/20 rounded-md p-4 text-left">
                      <p className="text-sm text-destructive font-mono">{validation.error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-sm bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/10 p-6 rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-1.5 rounded bg-accent/10 flex-shrink-0">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-base mb-3 text-foreground">How to use:</p>
              <ul className="list-none space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Paste your JSON code in the input field</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Click "Validate" to check for syntax errors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">The tool will identify missing commas, unclosed brackets, and other common JSON issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Fix any errors and validate again until your JSON is valid</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

