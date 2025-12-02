"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { extractNumbers } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function ExtractNumbersPage() {
  const [input, setInput] = useState("");
  const [numbers, setNumbers] = useState<string[]>([]);

  const handleExtract = () => {
    if (!input.trim()) {
      toast.error("Please enter text");
      return;
    }

    try {
      const extracted = extractNumbers(input);
      setNumbers(extracted);
      if (extracted.length > 0) {
        toast.success(`Found ${extracted.length} number(s)!`);
      } else {
        toast.info("No numbers found");
      }
    } catch (err) {
      toast.error("Failed to extract numbers");
    }
  };

  const handleClear = () => {
    setInput("");
    setNumbers([]);
  };

  return (
    <ToolLayout
      title="Extract Numbers"
      description="Extract all numbers from text automatically"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input Text</Label>
            <div className="flex gap-2">
              <Button onClick={handleExtract} size="sm">
                Extract Numbers
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
            placeholder="Enter text containing numbers..."
            className="font-mono text-sm min-h-[300px]"
          />
        </div>

        {numbers.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label>Extracted Numbers ({numbers.length})</Label>
              <CopyButton text={numbers.join("\n")} />
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {numbers.map((num, index) => (
                <div key={index} className="p-2 bg-muted rounded text-sm font-mono">
                  {num}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <DownloadButton content={numbers.join("\n")} filename="extracted-numbers.txt" />
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste text containing numbers</li>
            <li>Click "Extract Numbers" to find all numeric values</li>
            <li>Copy or download the extracted numbers</li>
            <li>Supports integers and decimals</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

