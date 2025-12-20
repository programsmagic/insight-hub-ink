"use client";

import { useState } from "react";
import { ToolLayout, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import QRCode from "qrcode";

export default function QRCodeCustomizerPage() {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [size, setSize] = useState(300);
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#FFFFFF");

  const generateQR = async () => {
    if (!text.trim()) {
      toast.error("Please enter text or URL to generate QR code");
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: size,
        errorCorrectionLevel: errorCorrection,
        margin: 2,
        color: {
          dark: darkColor,
          light: lightColor,
        },
      });
      setQrDataUrl(dataUrl);
      toast.success("Custom QR code generated successfully!");
    } catch (err) {
      toast.error("Failed to generate QR code");
    }
  };

  const handleClear = () => {
    setText("");
    setQrDataUrl("");
    setDarkColor("#000000");
    setLightColor("#FFFFFF");
  };

  return (
    <ToolLayout
      title="QR Code Customizer"
      description="Generate customized QR codes with colors and logos"
      category="QR Code Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text or URL</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com or any text"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size (pixels)</Label>
              <Input
                id="size"
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                min={100}
                max={1000}
                step={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="error-correction">Error Correction Level</Label>
              <select
                id="error-correction"
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value as "L" | "M" | "Q" | "H")}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="L">L - Low (~7% recovery)</option>
                <option value="M">M - Medium (~15% recovery)</option>
                <option value="Q">Q - Quartile (~25% recovery)</option>
                <option value="H">H - High (~30% recovery)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dark-color">Dark Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="dark-color"
                    type="color"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="light-color">Light Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="light-color"
                    type="color"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    placeholder="#FFFFFF"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateQR} className="flex-1">
                Generate Custom QR Code
              </Button>
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Custom QR Code</Label>
            <div className="flex flex-col items-center justify-center min-h-[300px] border rounded-lg bg-muted p-4">
              {qrDataUrl ? (
                <div className="space-y-4">
                  <img src={qrDataUrl} alt="Custom QR Code" className="mx-auto" />
                  <div className="flex gap-2 justify-center">
                    <DownloadButton
                      content={qrDataUrl}
                      filename="custom-qrcode.png"
                      label="Download PNG"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  Custom QR code will appear here after generation
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter any text or URL in the input field</li>
            <li>Adjust the size (100-1000 pixels)</li>
            <li>Choose error correction level</li>
            <li>Customize colors using the color pickers or hex codes</li>
            <li>Click "Generate Custom QR Code" to create your personalized QR code</li>
            <li>Download your custom QR code as PNG</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}









