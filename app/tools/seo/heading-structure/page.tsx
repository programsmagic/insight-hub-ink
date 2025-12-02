"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { extractHeadings } from "@/lib/tools/seo-utils";
import { toast } from "sonner";

export default function HeadingStructurePage() {
  const [input, setInput] = useState("");
  const [headings, setHeadings] = useState<Array<{ level: number; text: string }>>([]);

  const handleAnalyze = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML");
      return;
    }

    try {
      const extracted = extractHeadings(input);
      setHeadings(extracted);
      if (extracted.length > 0) {
        toast.success(`Found ${extracted.length} heading(s)!`);
      } else {
        toast.info("No headings found");
      }
    } catch (err) {
      toast.error("Failed to analyze headings");
    }
  };

  const handleClear = () => {
    setInput("");
    setHeadings([]);
  };

  const hasH1 = headings.some((h) => h.level === 1);
  const headingLevels = headings.map((h) => h.level);
  const hasProperStructure = headingLevels.every((level, index) => {
    if (index === 0) return level === 1;
    const prevLevel = headingLevels[index - 1];
    if (prevLevel === undefined) return false;
    return level <= prevLevel + 1;
  });

  return (
    <ToolLayout
      title="Heading Structure Analyzer"
      description="Analyze HTML heading structure (H1-H6) for SEO optimization"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input HTML</Label>
            <div className="flex gap-2">
              <Button onClick={handleAnalyze} size="sm">
                Analyze
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
            placeholder="<h1>Title</h1><h2>Subtitle</h2>..."
            className="font-mono text-sm min-h-[300px]"
          />
        </div>

        {headings.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{headings.length}</div>
                  <div className="text-sm text-muted-foreground">Total Headings</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{hasH1 ? "✓" : "✗"}</div>
                  <div className="text-sm text-muted-foreground">Has H1</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{hasProperStructure ? "✓" : "✗"}</div>
                  <div className="text-sm text-muted-foreground">Proper Structure</div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <Label className="mb-4 block">Heading Structure</Label>
              <div className="space-y-2">
                {headings.map((heading, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 bg-muted rounded"
                    style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
                  >
                    <Badge variant="outline">H{heading.level}</Badge>
                    <span className="text-sm">{heading.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste HTML code containing headings</li>
            <li>Click "Analyze" to extract heading structure</li>
            <li>Review the heading hierarchy</li>
            <li>Ensure you have one H1 tag per page</li>
            <li>Maintain proper heading hierarchy (H1 → H2 → H3, etc.)</li>
            <li>Proper heading structure improves SEO and accessibility</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

