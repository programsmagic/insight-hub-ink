"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { encodeHTMLEntities, decodeHTMLEntities } from "@/lib/tools/html-utils";
import { toast } from "sonner";

export default function HTMLEntityEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter text to process");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = encodeHTMLEntities(input);
        setOutput(encoded);
        toast.success("Text encoded successfully!");
      } else {
        const decoded = decodeHTMLEntities(input);
        setOutput(decoded);
        toast.success("Text decoded successfully!");
      }
    } catch (err) {
      toast.error("Failed to process text");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="HTML Entity Encoder/Decoder"
      description="Encode or decode HTML entities to ensure proper display and security"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button
            onClick={() => setMode("encode")}
            variant={mode === "encode" ? "default" : "outline"}
            size="sm"
          >
            Encode
          </Button>
          <Button
            onClick={() => setMode("decode")}
            variant={mode === "decode" ? "default" : "outline"}
            size="sm"
          >
            Decode
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">
                {mode === "encode" ? "Input Text" : "Encoded HTML Entities"}
              </Label>
              <div className="flex gap-2">
                <Button onClick={handleConvert} size="sm">
                  {mode === "encode" ? "Encode" : "Decode"}
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
                mode === "encode"
                  ? 'Enter text like: <div>Hello & "World"</div>'
                  : "Enter encoded entities like: &lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;"
              }
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">
                {mode === "encode" ? "Encoded Output" : "Decoded Output"}
              </Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename={`${mode === "encode" ? "encoded" : "decoded"}.txt`} />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder={`${mode === "encode" ? "Encoded" : "Decoded"} output will appear here...`}
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Encode:</strong> Converts special characters to HTML entities (e.g., &lt; becomes &amp;lt;)</li>
            <li><strong>Decode:</strong> Converts HTML entities back to regular characters</li>
            <li>Essential for displaying HTML code in web pages and preventing XSS attacks</li>
            <li>Copy or download the result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}











