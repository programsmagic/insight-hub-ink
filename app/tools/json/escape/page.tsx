"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { escapeJSON, unescapeJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";

export default function JSONEscapePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter text to process");
      return;
    }

    try {
      if (mode === "escape") {
        const escaped = escapeJSON(input);
        setOutput(escaped);
        toast.success("JSON escaped successfully!");
      } else {
        const unescaped = unescapeJSON(input);
        setOutput(unescaped);
        toast.success("JSON unescaped successfully!");
      }
    } catch (err) {
      toast.error("Failed to process JSON");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="JSON Escape/Unescape"
      description="Escape or unescape special characters in JSON strings to ensure proper encoding"
      category="JSON Tools"
    >
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex gap-2">
          <Button
            onClick={() => setMode("escape")}
            variant={mode === "escape" ? "default" : "outline"}
            size="sm"
          >
            Escape
          </Button>
          <Button
            onClick={() => setMode("unescape")}
            variant={mode === "unescape" ? "default" : "outline"}
            size="sm"
          >
            Unescape
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">
                {mode === "escape" ? "Input Text" : "Escaped JSON"}
              </Label>
              <div className="flex gap-2">
                <Button onClick={handleConvert} size="sm">
                  {mode === "escape" ? "Escape" : "Unescape"}
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
              placeholder={
                mode === "escape"
                  ? 'Enter text with special characters like "quotes" and \\backslashes'
                  : 'Enter escaped JSON like \\"quoted\\" text'
              }
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">
                {mode === "escape" ? "Escaped Output" : "Unescaped Output"}
              </Label>
              <div className="flex gap-2">
                {output && (
                  <>
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename={`${mode === "escape" ? "escaped" : "unescaped"}.txt`} />
                  </>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder={`${mode === "escape" ? "Escaped" : "Unescaped"} output will appear here...`}
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Escape:</strong> Converts special characters (quotes, backslashes) to escaped format</li>
            <li><strong>Unescape:</strong> Converts escaped characters back to their original form</li>
            <li>Useful when embedding JSON in HTML, JavaScript, or other contexts</li>
            <li>Essential for preventing parsing errors and ensuring proper encoding</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}











