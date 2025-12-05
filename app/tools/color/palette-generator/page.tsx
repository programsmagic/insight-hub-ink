"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { hexToRgb, rgbToHex, generateColorPalette } from "@/lib/tools/color-utils";
import { toast } from "sonner";

export default function ColorPaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [palette, setPalette] = useState<Array<{ hex: string; rgb: { r: number; g: number; b: number } }>>([]);

  const handleGenerate = () => {
    try {
      const rgb = hexToRgb(baseColor);
      if (!rgb) {
        toast.error("Invalid hex color");
        return;
      }

      const colors = generateColorPalette(rgb, 5);
      const paletteData = colors.map((c) => ({
        hex: rgbToHex(c.r, c.g, c.b),
        rgb: c,
      }));
      setPalette(paletteData);
      toast.success("Color palette generated!");
    } catch (err) {
      toast.error("Failed to generate palette");
    }
  };

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Generate harmonious color palettes and schemes from a base color"
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
          <Button onClick={handleGenerate}>Generate Palette</Button>
        </div>

        {palette.length > 0 && (
          <Card className="p-6">
            <Label className="mb-4 block">Generated Palette</Label>
            <div className="grid grid-cols-5 gap-4">
              {palette.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border-2 border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="text-center space-y-1">
                    <div className="text-xs font-mono">{color.hex}</div>
                    <div className="text-xs text-muted-foreground">
                      rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                    </div>
                    <CopyButton text={color.hex} label="Copy" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Select or enter a base color</li>
            <li>Click "Generate Palette" to create harmonious colors</li>
            <li>Copy individual color codes</li>
            <li>Perfect for creating cohesive color schemes for designs</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


