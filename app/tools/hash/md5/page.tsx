"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CryptoJS from "crypto-js";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";

export default function MD5HashPage() {
  const analytics = useToolAnalytics("md5-generator");
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
      analytics.trackUsage("generate", { inputLength: input.length });
    } catch (err) {
      toast.error("Failed to generate hash");
      analytics.trackError("Failed to generate hash");
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
      description="Generate MD5 hash from text instantly. MD5 produces a 128-bit (32-character) hexadecimal hash. Fast and efficient for checksums and non-security purposes."
      category="Hash Tools"
      content={{
        aboutText:
          "MD5 (Message Digest Algorithm 5) is a widely-used cryptographic hash function that produces a 128-bit (32-character hexadecimal) hash value. While MD5 is fast and efficient, it is no longer considered cryptographically secure due to vulnerability to collision attacks. However, it remains useful for checksums, data integrity verification, and non-security applications like generating unique identifiers or file fingerprints.",
        useCases: [
          "File integrity verification: Generate checksums to verify files haven't been corrupted",
          "Data deduplication: Identify duplicate files or data using hash values",
          "Non-security identifiers: Create unique IDs for database records or cache keys",
          "ETags: Generate entity tags for HTTP caching mechanisms",
          "Quick data comparison: Compare large datasets using hash values",
          "Legacy system compatibility: Work with systems that still use MD5",
          "Development and testing: Quick hash generation during development",
        ],
        examples: [
          {
            input: "Hello, World!",
            output: "65a8e27d8879283831b664bd8b7f0ad4",
            description: "MD5 hash of a simple text string",
          },
          {
            input: "password123",
            output: "482c811da5d5b4bc6d497ffa98491e38",
            description: "MD5 hash of a password (not recommended for security)",
          },
          {
            input: "The quick brown fox jumps over the lazy dog",
            output: "9e107d9d372bb6826bd81d3542a419d6",
            description: "MD5 hash of a longer text string",
          },
        ],
        faqs: [
          {
            question: "Is MD5 secure for passwords?",
            answer:
              "No, MD5 should not be used for password hashing. It's vulnerable to collision attacks and rainbow table attacks. Use bcrypt, Argon2, or SHA-256 with salt for password hashing instead.",
          },
          {
            question: "What's the difference between MD5 and SHA256?",
            answer:
              "MD5 produces a 128-bit (32-character) hash, while SHA256 produces a 256-bit (64-character) hash. SHA256 is cryptographically secure and recommended for security applications, while MD5 is faster but only suitable for non-security use cases.",
          },
          {
            question: "Can MD5 hashes be reversed?",
            answer:
              "No, MD5 is a one-way hash function. You cannot reverse a hash to get the original input. However, due to collision vulnerabilities, attackers can find different inputs that produce the same hash.",
          },
          {
            question: "When should I use MD5?",
            answer:
              "Use MD5 for non-security purposes like file checksums, data integrity verification, generating unique identifiers, or when compatibility with legacy systems is required. For security applications, use SHA256 or SHA512.",
          },
        ],
        relatedTools: [
          { id: "sha256-generator", name: "SHA256 Hash Generator", route: "/tools/hash/sha256" },
          { id: "sha512-generator", name: "SHA512 Hash Generator", route: "/tools/hash/sha512" },
          { id: "bcrypt-generator", name: "BCrypt Hash Generator", route: "/tools/hash/bcrypt" },
        ],
      }}
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


