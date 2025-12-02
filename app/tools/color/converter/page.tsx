"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "@/lib/tools/color-utils";
import { toast } from "sonner";

export default function ColorConverterPage() {
  const [fromFormat, setFromFormat] = useState("hex");
  const [toFormat, setToFormat] = useState("rgb");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter a color");
      return;
    }

    try {
      let rgb = { r: 0, g: 0, b: 0 };

      // Parse input
      if (fromFormat === "hex") {
        const parsed = hexToRgb(input);
        if (!parsed) throw new Error("Invalid hex color");
        rgb = parsed;
      } else if (fromFormat === "rgb") {
        const match = input.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!match) throw new Error("Invalid RGB format");
        rgb = { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
      } else if (fromFormat === "hsl") {
        const match = input.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!match) throw new Error("Invalid HSL format");
        rgb = hslToRgb(Number(match[1]), Number(match[2]), Number(match[3]));
      }

      // Convert to output format
      if (toFormat === "hex") {
        setOutput(rgbToHex(rgb.r, rgb.g, rgb.b));
      } else if (toFormat === "rgb") {
        setOutput(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      } else if (toFormat === "hsl") {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setOutput(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
      }

      toast.success("Color converted successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to convert color");
    }
  };


  return (
    <ToolLayout
      title="Color Converter"
      description="Convert between RGB, HEX, HSL color formats instantly"
      category="Color Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fromFormat">From Format:</Label>
              <Select value={fromFormat} onValueChange={setFromFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hex">HEX</SelectItem>
                  <SelectItem value="rgb">RGB</SelectItem>
                  <SelectItem value="hsl">HSL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Input Color:</Label>
              <Input
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={fromFormat === "hex" ? "#000000" : fromFormat === "rgb" ? "rgb(0, 0, 0)" : "hsl(0, 0%, 0%)"}
                className="font-mono"
              />
            </div>
            <Button onClick={handleConvert}>Convert</Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="toFormat">To Format:</Label>
              <Select value={toFormat} onValueChange={setToFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hex">HEX</SelectItem>
                  <SelectItem value="rgb">RGB</SelectItem>
                  <SelectItem value="hsl">HSL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="output">Converted Color:</Label>
              <div className="flex gap-2">
                <Input
                  id="output"
                  value={output}
                  readOnly
                  className="font-mono flex-1"
                />
                {output && <CopyButton text={output} />}
              </div>
            </div>
            {output && (
              <div
                className="w-full h-24 rounded-lg border-2 border-border"
                style={{ backgroundColor: output }}
              />
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Select the input and output color formats</li>
            <li>Enter a color in the selected format</li>
            <li>Click "Convert" to transform the color</li>
            <li>Copy the converted color code</li>
            <li>Supports HEX (#RRGGBB), RGB (rgb(r, g, b)), and HSL (hsl(h, s%, l%))</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

