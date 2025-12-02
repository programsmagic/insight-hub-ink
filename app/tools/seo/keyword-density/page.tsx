"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { calculateKeywordDensity, generateKeywordDensityReport } from "@/lib/tools/seo-utils";
import { toast } from "sonner";

export default function KeywordDensityPage() {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [density, setDensity] = useState<number | null>(null);
  const [report, setReport] = useState<Array<{ keyword: string; count: number; density: number }>>([]);

  const handleCheck = () => {
    if (!text.trim()) {
      toast.error("Please enter text");
      return;
    }

    if (!keyword.trim()) {
      toast.error("Please enter a keyword");
      return;
    }

    try {
      const densityValue = calculateKeywordDensity(text, keyword);
      setDensity(densityValue);
      toast.success("Keyword density calculated!");
    } catch (err) {
      toast.error("Failed to calculate density");
    }
  };

  const handleGenerateReport = () => {
    if (!text.trim()) {
      toast.error("Please enter text");
      return;
    }

    try {
      const reportData = generateKeywordDensityReport(text, 20);
      setReport(reportData);
      toast.success("Keyword report generated!");
    } catch (err) {
      toast.error("Failed to generate report");
    }
  };

  const handleClear = () => {
    setText("");
    setKeyword("");
    setDensity(null);
    setReport([]);
  };

  return (
    <ToolLayout
      title="Keyword Density Checker"
      description="Check keyword density in text content for SEO optimization"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="text">Text Content</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text content..."
            className="font-mono text-sm min-h-[200px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">Keyword to Check:</Label>
              <div className="flex gap-2">
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter keyword"
                />
                <Button onClick={handleCheck}>Check</Button>
              </div>
            </div>
            {density !== null && (
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{density.toFixed(2)}%</div>
                  <div className="text-sm text-muted-foreground mt-2">Keyword Density</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Recommended: 1-3%
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Button onClick={handleGenerateReport} className="w-full">
              Generate Top Keywords Report
            </Button>
            {report.length > 0 && (
              <Card className="p-4">
                <Label className="mb-2 block">Top Keywords</Label>
                <div className="space-y-1 max-h-[300px] overflow-y-auto">
                  {report.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm p-2 bg-muted rounded">
                      <span className="font-medium">{item.keyword}</span>
                      <span className="text-muted-foreground">
                        {item.count} ({item.density.toFixed(2)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter your text content</li>
            <li>Enter a specific keyword to check its density</li>
            <li>Or generate a report of top keywords</li>
            <li>Keyword density of 1-3% is generally recommended for SEO</li>
            <li>Higher density may be considered keyword stuffing</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

