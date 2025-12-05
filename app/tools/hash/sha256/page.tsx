"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CryptoJS from "crypto-js";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";

export default function SHA256HashPage() {
  const analytics = useToolAnalytics("sha256-generator");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generateHash = () => {
    if (!input.trim()) {
      toast.error("Please enter text to hash");
      return;
    }

    try {
      const hash = CryptoJS.SHA256(input).toString();
      setOutput(hash);
      toast.success("SHA256 hash generated!");
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
        const hash = CryptoJS.SHA256(value).toString();
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
      title="SHA256 Hash Generator"
      description="Generate SHA256 hash from text instantly. SHA256 produces a 256-bit (64-character) hexadecimal hash. Cryptographically secure and recommended for most security use cases."
      category="Hash Tools"
      content={{
        aboutText:
          "SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a 256-bit (64-character hexadecimal) hash value. It's part of the SHA-2 family and is widely considered secure for cryptographic purposes. SHA256 is used extensively in blockchain technology, digital signatures, SSL/TLS certificates, and password hashing (with salt). It provides a good balance between security and performance.",
        useCases: [
          "Password hashing: Securely hash passwords with salt (use bcrypt for better security)",
          "Blockchain and cryptocurrency: Generate transaction hashes and block hashes",
          "Digital signatures: Create message digests for signing documents",
          "SSL/TLS certificates: Verify certificate integrity and authenticity",
          "Data integrity: Verify files and data haven't been tampered with",
          "API authentication: Generate secure tokens and API keys",
          "Git commit hashes: Version control systems use SHA256 for commit identification",
        ],
        examples: [
          {
            input: "Hello, World!",
            output: "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f",
            description: "SHA256 hash of a simple text string",
          },
          {
            input: "password123",
            output: "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
            description: "SHA256 hash of a password (should be used with salt)",
          },
          {
            input: "The quick brown fox jumps over the lazy dog",
            output: "d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592",
            description: "SHA256 hash of a longer text string",
          },
        ],
        faqs: [
          {
            question: "Is SHA256 secure for passwords?",
            answer:
              "SHA256 alone is not recommended for password hashing. While it's cryptographically secure, it's vulnerable to rainbow table attacks and is too fast for password hashing. Use bcrypt, Argon2, or PBKDF2 with SHA256 for password hashing, as these include salt and are designed to be slow.",
          },
          {
            question: "What's the difference between SHA256 and SHA512?",
            answer:
              "SHA256 produces a 256-bit (64-character) hash, while SHA512 produces a 512-bit (128-character) hash. SHA512 is more secure but slower. SHA256 is generally sufficient for most applications and provides better performance.",
          },
          {
            question: "Can SHA256 hashes be reversed?",
            answer:
              "No, SHA256 is a one-way cryptographic hash function. You cannot reverse a hash to get the original input. The only way to find the input is through brute force or dictionary attacks, which is computationally infeasible for strong inputs.",
          },
          {
            question: "How is SHA256 used in Bitcoin?",
            answer:
              "SHA256 is used extensively in Bitcoin for mining (proof-of-work), generating transaction IDs, creating block hashes, and Merkle tree construction. It's fundamental to Bitcoin's security and consensus mechanism.",
          },
        ],
        relatedTools: [
          { id: "md5-generator", name: "MD5 Hash Generator", route: "/tools/hash/md5" },
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
            placeholder="Enter text to generate SHA256 hash..."
            className="font-mono text-sm min-h-[200px]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="output">SHA256 Hash</Label>
            {output && (
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="sha256-hash.txt" />
              </div>
            )}
          </div>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="font-mono text-sm min-h-[100px] bg-muted"
            placeholder="SHA256 hash will appear here..."
          />
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">About SHA256:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>SHA256</strong> produces a 256-bit (64-character) hash</li>
            <li>Recommended for most security use cases</li>
            <li>Good balance of security and performance</li>
            <li>Widely used in blockchain, digital signatures, and password hashing</li>
            <li>Hash is generated in real-time as you type</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


