"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { rgbToHex, hexToRgb } from "@/lib/tools/html-utils";

export default function HTMLColorPickerPage() {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  const handleHexChange = (value: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setHex(value);
      const rgbValue = hexToRgb(value);
      if (rgbValue) {
        setRgb(rgbValue);
      }
    } else if (value.startsWith("#") && value.length <= 7) {
      setHex(value);
    }
  };

  const handleRgbChange = (component: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [component]: Math.max(0, Math.min(255, value)) };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const colorCode = hex;
  const rgbCode = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  return (
    <ToolLayout
      title="HTML Color Picker"
      description="Pick colors and generate HTML color codes in hex and RGB formats"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Color Preview */}
          <Card className="p-6">
            <Label className="mb-4 block">Color Preview</Label>
            <div
              className="w-full h-48 rounded-lg border-2 border-border"
              style={{ backgroundColor: hex }}
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Label className="w-20">Hex:</Label>
                <Input
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="font-mono"
                  maxLength={7}
                />
                <CopyButton text={colorCode} />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-20">RGB:</Label>
                <Input value={rgbCode} readOnly className="font-mono flex-1" />
                <CopyButton text={rgbCode} />
              </div>
            </div>
          </Card>

          {/* RGB Controls */}
          <Card className="p-6">
            <Label className="mb-4 block">RGB Values</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="r">Red (R): {rgb.r}</Label>
                <input
                  id="r"
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => handleRgbChange("r", Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="g">Green (G): {rgb.g}</Label>
                <input
                  id="g"
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => handleRgbChange("g", Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="b">Blue (B): {rgb.b}</Label>
                <input
                  id="b"
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => handleRgbChange("b", Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* HTML Code Examples */}
        <Card className="p-6">
          <Label className="mb-4 block">HTML Code Examples</Label>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center justify-between p-2 bg-muted rounded">
              <span>Inline Style:</span>
              <code className="text-primary">
                style="color: {colorCode};"
              </code>
              <CopyButton text={`style="color: ${colorCode};"`} />
            </div>
            <div className="flex items-center justify-between p-2 bg-muted rounded">
              <span>CSS:</span>
              <code className="text-primary">color: {colorCode};</code>
              <CopyButton text={`color: ${colorCode};`} />
            </div>
            <div className="flex items-center justify-between p-2 bg-muted rounded">
              <span>RGB:</span>
              <code className="text-primary">color: {rgbCode};</code>
              <CopyButton text={`color: ${rgbCode};`} />
            </div>
          </div>
        </Card>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use the color picker or RGB sliders to select a color</li>
            <li>Copy the hex or RGB color code</li>
            <li>Use the HTML code examples for your projects</li>
            <li>Perfect for web design and styling</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}




