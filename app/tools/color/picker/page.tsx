"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, type RGB, type HSL } from "@/lib/tools/color-utils";

export default function ColorPickerPage() {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const [hsl, setHsl] = useState<HSL>({ h: 0, s: 0, l: 0 });

  const handleHexChange = (value: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setHex(value);
      const rgbValue = hexToRgb(value);
      if (rgbValue) {
        setRgb(rgbValue);
        setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
      }
    } else if (value.startsWith("#") && value.length <= 7) {
      setHex(value);
    }
  };

  const handleRgbChange = (component: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [component]: Math.max(0, Math.min(255, value)) };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHslChange = (component: "h" | "s" | "l", value: number) => {
    const newHsl = { ...hsl, [component]: Math.max(0, Math.min(component === "h" ? 360 : 100, value)) };
    setHsl(newHsl);
    const rgbValue = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(rgbValue);
    setHex(rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b));
  };

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick colors and get hex, RGB, HSL values with a visual color picker"
      category="Color Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Label className="mb-4 block">Color Preview</Label>
            <div
              className="w-full h-48 rounded-lg border-2 border-border mb-4"
              style={{ backgroundColor: hex }}
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="w-20">Hex:</Label>
                <Input
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="font-mono flex-1"
                  maxLength={7}
                />
                <CopyButton text={hex} />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-20">RGB:</Label>
                <Input value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} readOnly className="font-mono flex-1" />
                <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-20">HSL:</Label>
                <Input value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} readOnly className="font-mono flex-1" />
                <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
              </div>
            </div>
          </Card>

          <div className="space-y-6">
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

            <Card className="p-6">
              <Label className="mb-4 block">HSL Values</Label>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="h">Hue (H): {hsl.h}°</Label>
                  <input
                    id="h"
                    type="range"
                    min="0"
                    max="360"
                    value={hsl.h}
                    onChange={(e) => handleHslChange("h", Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s">Saturation (S): {hsl.s}%</Label>
                  <input
                    id="s"
                    type="range"
                    min="0"
                    max="100"
                    value={hsl.s}
                    onChange={(e) => handleHslChange("s", Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="l">Lightness (L): {hsl.l}%</Label>
                  <input
                    id="l"
                    type="range"
                    min="0"
                    max="100"
                    value={hsl.l}
                    onChange={(e) => handleHslChange("l", Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use the color picker or sliders to select a color</li>
            <li>Copy hex, RGB, or HSL color codes</li>
            <li>Perfect for web design and styling</li>
            <li>All color formats update in real-time</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


