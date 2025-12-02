"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateLoremIpsum } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function LoremIpsumGeneratorPage() {
  const [output, setOutput] = useState("");
  const [wordCount, setWordCount] = useState(50);

  const handleGenerate = () => {
    if (wordCount < 1 || wordCount > 10000) {
      toast.error("Word count must be between 1 and 10,000");
      return;
    }

    try {
      const lorem = generateLoremIpsum(wordCount);
      setOutput(lorem);
      toast.success("Lorem Ipsum generated successfully!");
    } catch (err) {
      toast.error("Failed to generate Lorem Ipsum");
    }
  };

  const handleClear = () => {
    setOutput("");
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text (Lorem Ipsum) for design and development projects"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="wordCount">Word Count:</Label>
            <Input
              id="wordCount"
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value) || 50)}
              className="w-32"
              min={1}
              max={10000}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGenerate}>Generate</Button>
            <Button onClick={handleClear} variant="ghost">
              Clear
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="output">Generated Lorem Ipsum</Label>
            {output && (
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="lorem-ipsum.txt" />
              </div>
            )}
          </div>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="font-mono text-sm min-h-[400px] bg-muted"
            placeholder="Generated Lorem Ipsum will appear here..."
          />
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter the number of words you want to generate (1-10,000)</li>
            <li>Click "Generate" to create Lorem Ipsum text</li>
            <li>Copy or download the generated text</li>
            <li>Perfect for design mockups, testing layouts, and placeholder content</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

