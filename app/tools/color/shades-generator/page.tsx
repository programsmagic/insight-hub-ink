"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { hexToRgb, rgbToHex, generateShades } from "@/lib/tools/color-utils";
import { toast } from "sonner";

export default function ColorShadesGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [shades, setShades] = useState<Array<{ hex: string; rgb: { r: number; g: number; b: number } }>>([]);

  const handleGenerate = () => {
    try {
      const rgb = hexToRgb(baseColor);
      if (!rgb) {
        toast.error("Invalid hex color");
        return;
      }

      const colorShades = generateShades(rgb, 10);
      const shadesData = colorShades.map((c) => ({
        hex: rgbToHex(c.r, c.g, c.b),
        rgb: c,
      }));
      setShades(shadesData);
      toast.success("Color shades generated!");
    } catch (err) {
      toast.error("Failed to generate shades");
    }
  };

  return (
    <ToolLayout
      title="Color Shades Generator"
      description="Generate color shades and tints from a base color"
      category="Color Tools"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="baseColor">Base Color:</Label>
            <Input
              id="baseColor"
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-24 h-10"
            />
            <Input
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-32 font-mono"
              maxLength={7}
            />
          </div>
          <Button onClick={handleGenerate}>Generate Shades</Button>
        </div>

        {shades.length > 0 && (
          <Card className="p-6">
            <Label className="mb-4 block">Color Shades (Light to Dark)</Label>
            <div className="space-y-2">
              {shades.map((shade, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className="w-24 h-12 rounded border-2 border-border"
                    style={{ backgroundColor: shade.hex }}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-mono">{shade.hex}</div>
                    <div className="text-xs text-muted-foreground">
                      rgb({shade.rgb.r}, {shade.rgb.g}, {shade.rgb.b})
                    </div>
                  </div>
                  <CopyButton text={shade.hex} />
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Select or enter a base color</li>
            <li>Click "Generate Shades" to create light to dark variations</li>
            <li>Copy individual shade color codes</li>
            <li>Perfect for creating gradient effects and design systems</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


