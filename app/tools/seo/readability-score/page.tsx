"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { calculateReadabilityScore } from "@/lib/tools/seo-utils";
import { toast } from "sonner";

export default function ReadabilityScorePage() {
  const [input, setInput] = useState("");
  const [scores, setScores] = useState<{
    fleschKincaid: number;
    smog: number;
    ari: number;
  } | null>(null);

  const handleCalculate = () => {
    if (!input.trim()) {
      toast.error("Please enter text to analyze");
      return;
    }

    try {
      const result = calculateReadabilityScore(input);
      setScores(result);
      toast.success("Readability scores calculated!");
    } catch (err) {
      toast.error("Failed to calculate scores");
    }
  };

  const handleClear = () => {
    setInput("");
    setScores(null);
  };

  const getFleschLevel = (score: number): string => {
    if (score >= 90) return "Very Easy";
    if (score >= 80) return "Easy";
    if (score >= 70) return "Fairly Easy";
    if (score >= 60) return "Standard";
    if (score >= 50) return "Fairly Difficult";
    if (score >= 30) return "Difficult";
    return "Very Difficult";
  };

  return (
    <ToolLayout
      title="Readability Score Calculator"
      description="Calculate readability scores (Flesch-Kincaid, SMOG, ARI) to assess text complexity"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Text Content</Label>
            <div className="flex gap-2">
              <Button onClick={handleCalculate} size="sm">
                Calculate
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
            placeholder="Enter text to analyze readability..."
            className="font-mono text-sm min-h-[300px]"
          />
        </div>

        {scores && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{scores.fleschKincaid.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-2">Flesch-Kincaid</div>
              <div className="text-xs text-muted-foreground mt-1">
                {getFleschLevel(scores.fleschKincaid)}
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{scores.smog.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-2">SMOG Index</div>
              <div className="text-xs text-muted-foreground mt-1">Grade level</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{scores.ari.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-2">ARI</div>
              <div className="text-xs text-muted-foreground mt-1">Automated Readability</div>
            </Card>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter your text content in the input field</li>
            <li>Click "Calculate" to analyze readability</li>
            <li>Review Flesch-Kincaid, SMOG, and ARI scores</li>
            <li>Higher Flesch-Kincaid scores indicate easier reading</li>
            <li>Use these scores to optimize content for your target audience</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

