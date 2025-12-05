"use client";

import { useState } from "react";
import { ToolLayout, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import QRCode from "qrcode";

export default function QRCodeGeneratorStandalonePage() {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrSvgString, setQrSvgString] = useState("");
  const [size, setSize] = useState(300);
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");

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
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrDataUrl(dataUrl);

      const svgString = await QRCode.toString(text, {
        type: "svg",
        width: size,
        errorCorrectionLevel: errorCorrection,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrSvgString(svgString);
      toast.success("QR code generated successfully!");
    } catch (err) {
      toast.error("Failed to generate QR code");
    }
  };

  const handleClear = () => {
    setText("");
    setQrDataUrl("");
    setQrSvgString("");
  };

  const handleDownloadSVG = () => {
    if (!qrSvgString) {
      toast.error("Please generate QR code first");
      return;
    }

    try {
      const svgBlob = new Blob([qrSvgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("SVG downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download SVG");
    }
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes from text or URLs"
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

            <div className="flex gap-2">
              <Button onClick={generateQR} className="flex-1">
                Generate QR Code
              </Button>
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>QR Code</Label>
            <div className="flex flex-col items-center justify-center min-h-[300px] border rounded-lg bg-muted p-4">
              {qrDataUrl ? (
                <div className="space-y-4">
                  <img src={qrDataUrl} alt="QR Code" className="mx-auto" />
                  <div className="flex gap-2 justify-center">
                    <DownloadButton
                      content={qrDataUrl}
                      filename="qrcode.png"
                      label="Download PNG"
                    />
                    <Button
                      onClick={handleDownloadSVG}
                      variant="outline"
                      size="sm"
                      disabled={!qrSvgString}
                    >
                      Download SVG
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  QR code will appear here after generation
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
            <li>Choose error correction level (higher = more data recovery, larger code)</li>
            <li>Click "Generate QR Code" to create your QR code</li>
            <li>Download as PNG or SVG</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


