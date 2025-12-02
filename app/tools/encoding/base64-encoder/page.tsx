"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { encodeBase64, decodeBase64 } from "@/lib/tools/encoding-utils";
import { toast } from "sonner";

export default function Base64EncoderPage() {
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
        const encoded = encodeBase64(input);
        setOutput(encoded);
        toast.success("Text encoded successfully!");
      } else {
        const decoded = decodeBase64(input);
        setOutput(decoded);
        toast.success("Text decoded successfully!");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to process text");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode or decode Base64 strings for data transmission and storage"
      category="Encoding Tools"
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
                {mode === "encode" ? "Input Text" : "Base64 Encoded"}
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
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string..."}
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">
                {mode === "encode" ? "Base64 Encoded" : "Decoded Text"}
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
            <li><strong>Encode:</strong> Converts text to Base64 format</li>
            <li><strong>Decode:</strong> Converts Base64 back to original text</li>
            <li>Commonly used for data transmission and embedding binary data</li>
            <li>Copy or download the result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

