"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

type HashType = "md5" | "sha1" | "sha256" | "sha512";

const hashTypes: Array<{ value: HashType; label: string; description: string }> = [
  { value: "md5", label: "MD5", description: "128-bit hash (fast, not secure)" },
  { value: "sha1", label: "SHA1", description: "160-bit hash (deprecated)" },
  { value: "sha256", label: "SHA256", description: "256-bit hash (recommended)" },
  { value: "sha512", label: "SHA512", description: "512-bit hash (most secure)" },
];

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<Record<HashType, string>>({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  });

  const generateHashes = () => {
    if (!input.trim()) {
      toast.error("Please enter text to hash");
      return;
    }

    try {
      setOutput({
        md5: CryptoJS.MD5(input).toString(),
        sha1: CryptoJS.SHA1(input).toString(),
        sha256: CryptoJS.SHA256(input).toString(),
        sha512: CryptoJS.SHA512(input).toString(),
      });
      toast.success("Hashes generated successfully!");
    } catch (err) {
      toast.error("Failed to generate hashes");
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      try {
        setOutput({
          md5: CryptoJS.MD5(value).toString(),
          sha1: CryptoJS.SHA1(value).toString(),
          sha256: CryptoJS.SHA256(value).toString(),
          sha512: CryptoJS.SHA512(value).toString(),
        });
      } catch (err) {
        // Ignore errors during typing
      }
    } else {
      setOutput({
        md5: "",
        sha1: "",
        sha256: "",
        sha512: "",
      });
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput({
      md5: "",
      sha1: "",
      sha256: "",
      sha512: "",
    });
  };

  return (
    <ToolLayout
      title="Text Hash Generator"
      description="Generate MD5, SHA1, SHA256, and SHA512 cryptographic hashes from text"
      category="Text Tools"
    >
      <div className="space-y-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input Text</Label>
            <div className="flex gap-2">
              <Button onClick={generateHashes} size="sm">
                Generate
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
            placeholder="Enter text to generate hash..."
            className="font-mono text-sm min-h-[150px]"
          />
        </div>

        {/* Hash Outputs */}
        <div className="space-y-4">
          <Label>Generated Hashes</Label>
          <div className="grid grid-cols-1 gap-4">
            {hashTypes.map((hashType) => (
              <div key={hashType.value} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{hashType.label}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {hashType.description}
                    </span>
                  </div>
                  {output[hashType.value] && (
                    <CopyButton text={output[hashType.value]} label={`Copy ${hashType.label}`} />
                  )}
                </div>
                <Textarea
                  value={output[hashType.value]}
                  readOnly
                  className="font-mono text-sm bg-muted"
                  placeholder={`${hashType.label} hash will appear here...`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">About Hash Functions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>MD5:</strong> Fast but not cryptographically secure. Use for checksums only.</li>
            <li><strong>SHA1:</strong> Deprecated for security purposes. Use SHA256 instead.</li>
            <li><strong>SHA256:</strong> Recommended for most use cases. Good balance of security and performance.</li>
            <li><strong>SHA512:</strong> Most secure option. Use for high-security applications.</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

