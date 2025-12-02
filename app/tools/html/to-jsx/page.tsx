"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function htmlToJSX(html: string): string {
  let jsx = html;

  // Convert class to className
  jsx = jsx.replace(/\sclass=/g, " className=");

  // Convert for to htmlFor
  jsx = jsx.replace(/\sfor=/g, " htmlFor=");

  // Convert inline styles object format (basic)
  jsx = jsx.replace(/style="([^"]*)"/g, (_match, styles) => {
    const styleObj = styles
      .split(";")
      .filter((s: string) => s.trim())
      .map((s: string) => {
        const parts = s.split(":").map((x: string) => x.trim());
        const key = parts[0];
        const value = parts[1] || "";
        if (!key) return "";
        const camelKey = key.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
        return `"${camelKey}": "${value}"`;
      })
      .filter((s: string) => s)
      .join(", ");
    return `style={{${styleObj}}}`;
  });

  // Convert self-closing tags
  jsx = jsx.replace(/<(\w+)([^>]*)\s*>\s*<\/\1>/g, "<$1$2 />");

  return jsx;
}

export default function HTMLToJSXPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML to convert");
      return;
    }

    try {
      const jsx = htmlToJSX(input);
      setOutput(jsx);
      toast.success("HTML converted to JSX successfully!");
    } catch (err) {
      toast.error("Failed to convert HTML to JSX");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="HTML to JSX"
      description="Convert HTML code to JSX format for React components"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input HTML</Label>
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
              placeholder='<div class="container"><p>Hello</p></div>'
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">JSX Output</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="converted.jsx" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="JSX will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your HTML code in the input field</li>
            <li>Click "Convert" to transform HTML to JSX</li>
            <li>Converts class to className, for to htmlFor, and more</li>
            <li>Copy or download the JSX result</li>
            <li>Perfect for React development</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

