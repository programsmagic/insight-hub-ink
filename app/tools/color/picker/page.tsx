"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, type RGB, type HSL } from "@/lib/tools/color-utils";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";

export default function ColorPickerPage() {
  const analytics = useToolAnalytics("color-picker");
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
        analytics.trackInteraction("color", "change", { format: "hex", color: value });
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
      description="Pick colors and get hex, RGB, HSL values with a visual color picker. Perfect for web design, CSS styling, and graphic design. All color formats update in real-time as you adjust values."
      category="Color Tools"
      content={{
        aboutText:
          "A color picker is an essential tool for designers and developers working with colors. This tool allows you to select colors using multiple formats (HEX, RGB, HSL) and see real-time conversions between formats. HEX codes are used in web development and CSS, RGB values represent red-green-blue color channels, and HSL (Hue-Saturation-Lightness) provides an intuitive way to adjust colors. All formats are synchronized, so changing any value updates the others instantly.",
        useCases: [
          "Web development: Pick colors for CSS styling, themes, and UI components",
          "Graphic design: Select colors for logos, branding, and visual designs",
          "Color scheme creation: Build cohesive color palettes for projects",
          "Accessibility: Check color contrast and ensure readability",
          "Brand consistency: Maintain consistent colors across digital assets",
          "CSS development: Get exact color codes for stylesheets",
          "Design systems: Define color tokens and design variables",
        ],
        examples: [
          {
            input: "HEX: #FF5733",
            output: "RGB: rgb(255, 87, 51), HSL: hsl(9, 100%, 60%)",
            description: "Convert a HEX color to RGB and HSL formats",
          },
          {
            input: "RGB: rgb(74, 144, 226)",
            output: "HEX: #4A90E2, HSL: hsl(210, 73%, 59%)",
            description: "Convert RGB values to HEX and HSL",
          },
          {
            input: "HSL: hsl(120, 100%, 50%)",
            output: "HEX: #00FF00, RGB: rgb(0, 255, 0)",
            description: "Convert HSL values to HEX and RGB (pure green)",
          },
        ],
        faqs: [
          {
            question: "What's the difference between RGB and HSL?",
            answer:
              "RGB (Red-Green-Blue) represents colors as combinations of three color channels (0-255 each). HSL (Hue-Saturation-Lightness) represents colors using hue (0-360°), saturation (0-100%), and lightness (0-100%). HSL is more intuitive for adjusting colors - you can change lightness without affecting hue, making it easier to create color variations.",
          },
          {
            question: "What is a HEX color code?",
            answer:
              "HEX (hexadecimal) color codes are 6-digit codes prefixed with # that represent RGB values in hexadecimal format. Each pair of digits represents red, green, and blue values (00-FF each). For example, #FF0000 is pure red, #00FF00 is pure green, and #0000FF is pure blue.",
          },
          {
            question: "How do I use these color values in CSS?",
            answer:
              "You can use any format in CSS: HEX (#FF5733), RGB (rgb(255, 87, 51)), or HSL (hsl(9, 100%, 60%)). Modern CSS also supports rgba() and hsla() for colors with alpha transparency. Simply copy the color code and paste it into your CSS file.",
          },
          {
            question: "Can I pick colors with transparency?",
            answer:
              "This tool provides RGB and HSL values. For transparency, you can use rgba() or hsla() formats in CSS by adding an alpha channel (0-1). For example, rgba(255, 87, 51, 0.5) is 50% transparent.",
          },
        ],
        relatedTools: [
          { id: "color-converter", name: "Color Converter", route: "/tools/color/converter" },
          { id: "color-palette-generator", name: "Color Palette Generator", route: "/tools/color/palette-generator" },
          { id: "color-contrast-checker", name: "Color Contrast Checker", route: "/tools/color/contrast-checker" },
        ],
      }}
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


