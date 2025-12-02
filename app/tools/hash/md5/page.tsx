"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

export default function MD5HashPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generateHash = () => {
    if (!input.trim()) {
      toast.error("Please enter text to hash");
      return;
    }

    try {
      const hash = CryptoJS.MD5(input).toString();
      setOutput(hash);
      toast.success("MD5 hash generated!");
    } catch (err) {
      toast.error("Failed to generate hash");
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      try {
        const hash = CryptoJS.MD5(value).toString();
        setOutput(hash);
      } catch (err) {
        // Ignore errors during typing
      }
    } else {
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="MD5 Hash Generator"
      description="Generate MD5 hash from text instantly"
      category="Hash Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input Text</Label>
            <div className="flex gap-2">
              <Button onClick={generateHash} size="sm">
                Generate Hash
              </Button>
              <Button onClick={handleClear} variant="ghost" size="sm">
                Clear
              </Button>
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter text to generate MD5 hash..."
            className="font-mono text-sm min-h-[200px]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="output">MD5 Hash</Label>
            {output && (
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="md5-hash.txt" />
              </div>
            )}
          </div>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="font-mono text-sm min-h-[100px] bg-muted"
            placeholder="MD5 hash will appear here..."
          />
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">About MD5:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>MD5</strong> produces a 128-bit (32-character) hash</li>
            <li>Fast but not cryptographically secure</li>
            <li>Use for checksums and non-security purposes only</li>
            <li>For security, use SHA256 or SHA512 instead</li>
            <li>Hash is generated in real-time as you type</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

