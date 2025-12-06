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
            <Label htmlFor="input" className="text-base">Input Text</Label>
            <div className="flex gap-2">
              <Button onClick={handleExtract} size="sm" className="shadow-md">
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
            className="font-mono text-sm min-h-[300px] input-area"
          />
        </div>

        {numbers.length > 0 && (
          <Card className="p-6 border-accent/10 shadow-elevation-md animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">Extracted Numbers ({numbers.length})</Label>
              <CopyButton text={numbers.join("\n")} />
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {numbers.map((num, index) => (
                <div key={index} className="p-3 bg-muted/50 border border-border/50 rounded-md text-sm font-mono hover:bg-muted transition-colors">
                  {num}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <DownloadButton content={numbers.join("\n")} filename="extracted-numbers.txt" />
            </div>
          </Card>
        )}

        <div className="text-sm bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/10 p-6 rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-1.5 rounded bg-accent/10 flex-shrink-0">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-base mb-3 text-foreground">How to use:</p>
              <ul className="list-none space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Paste text containing numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Click "Extract Numbers" to find all numeric values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Copy or download the extracted numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Supports integers and decimals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}



