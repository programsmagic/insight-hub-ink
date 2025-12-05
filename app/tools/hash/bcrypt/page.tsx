"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import bcrypt from "bcryptjs";

export default function BcryptGeneratorPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [rounds, setRounds] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please enter text to hash");
      return;
    }

    if (rounds < 4 || rounds > 31) {
      toast.error("Rounds must be between 4 and 31");
      return;
    }

    setIsProcessing(true);
    try {
      // BCrypt is CPU-intensive, so we use a timeout to prevent blocking
      const salt = await bcrypt.genSalt(rounds);
      const hash = await bcrypt.hash(input, salt);
      setOutput(hash);
      toast.success("BCrypt hash generated successfully!");
    } catch (error) {
      toast.error("Failed to generate hash");
      setOutput("");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setRounds(10);
  };

  return (
    <ToolLayout
      title="BCrypt Hash Generator"
      description="Generate BCrypt hashes from text securely. BCrypt is a strong password hashing algorithm used for storing passwords. Perfect for developers implementing authentication systems."
      category="Hash Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="rounds">Salt Rounds (4-31)</Label>
            <Input
              id="rounds"
              type="number"
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value) || 10)}
              min={4}
              max={31}
              className="max-w-[200px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Higher rounds = more secure but slower (10 is recommended)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input Text</Label>
              <Button onClick={handleClear} variant="ghost" size="sm">
                Clear
              </Button>
            </div>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash (e.g., password)"
              className="font-mono text-sm min-h-[200px]"
            />
            <Button onClick={handleGenerate} disabled={isProcessing} className="w-full">
              {isProcessing ? "Generating..." : "Generate BCrypt Hash"}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">BCrypt Hash</Label>
              {output && <CopyButton text={output} />}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[200px] bg-muted"
              placeholder="BCrypt hash will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter the text you want to hash (e.g., password)</li>
            <li>Set salt rounds (10 is recommended for most use cases)</li>
            <li>Click "Generate BCrypt Hash" to create the hash</li>
            <li>Copy the hash to use in your application</li>
            <li>Note: BCrypt is CPU-intensive and may take a few seconds</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
          <p className="font-semibold mt-3 mb-2">Security Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>BCrypt is designed for password hashing</li>
            <li>Each hash includes a random salt for security</li>
            <li>Higher rounds increase security but processing time</li>
            <li>Never store plain text passwords - always hash them</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
