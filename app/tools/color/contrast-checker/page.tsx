"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hexToRgb, getContrastRatio } from "@/lib/tools/color-utils";

export default function ColorContrastCheckerPage() {
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#ffffff");
  const [contrast, setContrast] = useState<number | null>(null);

  const handleCheck = () => {
    try {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);

      if (!rgb1 || !rgb2) {
        return;
      }

      const ratio = getContrastRatio(rgb1, rgb2);
      setContrast(ratio);
    } catch (err) {
      setContrast(null);
    }
  };

  const getWCAGLevel = (ratio: number): { level: string; pass: boolean } => {
    if (ratio >= 7) return { level: "AAA (Normal Text)", pass: true };
    if (ratio >= 4.5) return { level: "AAA (Large Text)", pass: true };
    if (ratio >= 3) return { level: "AA (Large Text)", pass: true };
    return { level: "Fail", pass: false };
  };

  const wcag = contrast ? getWCAGLevel(contrast) : null;

  return (
    <ToolLayout
      title="Color Contrast Checker"
      description="Check color contrast for accessibility compliance with WCAG guidelines"
      category="Color Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Label className="mb-4 block">Foreground Color</Label>
            <div className="space-y-4">
              <div
                className="w-full h-32 rounded-lg border-2 border-border"
                style={{ backgroundColor: color1 }}
              />
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-24 h-10"
                />
                <Input
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="font-mono flex-1"
                  maxLength={7}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Label className="mb-4 block">Background Color</Label>
            <div className="space-y-4">
              <div
                className="w-full h-32 rounded-lg border-2 border-border"
                style={{ backgroundColor: color2 }}
              />
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-24 h-10"
                />
                <Input
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="font-mono flex-1"
                  maxLength={7}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleCheck}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Check Contrast
          </button>
        </div>

        {contrast !== null && (
          <Card className="p-6">
            <div className="text-center space-y-4">
              <div>
                <div className="text-4xl font-bold text-primary">{contrast.toFixed(2)}:1</div>
                <div className="text-sm text-muted-foreground mt-2">Contrast Ratio</div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Badge variant={wcag?.pass ? "default" : "destructive"}>
                  {wcag?.level}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>WCAG Guidelines:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>AA (Normal Text): 4.5:1 minimum</li>
                  <li>AA (Large Text): 3:1 minimum</li>
                  <li>AAA (Normal Text): 7:1 minimum</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Select foreground and background colors</li>
            <li>Click "Check Contrast" to calculate the ratio</li>
            <li>Review WCAG compliance levels</li>
            <li>Ensure your color combinations meet accessibility standards</li>
            <li>Higher contrast ratios improve readability for all users</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

