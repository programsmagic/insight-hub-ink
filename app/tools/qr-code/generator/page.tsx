"use client";

import { useState } from "react";
import { ToolLayout, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import QRCode from "qrcode";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";

export default function QRCodeGeneratorStandalonePage() {
  const analytics = useToolAnalytics("qr-code-generator-standalone");
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
      analytics.trackUsage("generate", {
        size,
        errorCorrection,
        textLength: text.length,
      });
    } catch (err) {
      toast.error("Failed to generate QR code");
      analytics.trackError("Failed to generate QR code", { size, errorCorrection });
    }
  };

  const handleClear = () => {
    setText("");
    setQrDataUrl("");
    setQrSvgString("");
  };

  const handleDownloadPNG = () => {
    if (!qrDataUrl) {
      toast.error("Please generate QR code first");
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = qrDataUrl;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("PNG downloaded successfully!");
      analytics.trackUsage("download", { format: "png" });
    } catch (err) {
      toast.error("Failed to download PNG");
      analytics.trackError("Failed to download PNG");
    }
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
      analytics.trackUsage("download", { format: "svg" });
    } catch (err) {
      toast.error("Failed to download SVG");
      analytics.trackError("Failed to download SVG");
    }
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes from text or URLs instantly. Create scannable QR codes for websites, contact information, WiFi passwords, and more. Customize size and error correction level for optimal scanning."
      category="QR Code Tools"
      content={{
        aboutText:
          "A QR (Quick Response) code is a two-dimensional barcode that can store various types of data, including URLs, text, contact information, WiFi credentials, and more. QR codes are widely used in marketing, product packaging, business cards, and digital payments. This tool generates QR codes with customizable size and error correction levels, ensuring reliable scanning even when partially damaged or obscured.",
        useCases: [
          "Marketing campaigns: Add QR codes to flyers, posters, and advertisements to drive traffic to websites",
          "Contact sharing: Generate QR codes for vCards to quickly share contact information",
          "WiFi access: Create QR codes that automatically connect devices to WiFi networks",
          "Payment links: Generate QR codes for payment URLs in digital transactions",
          "Product information: Link physical products to online content, reviews, or manuals",
          "Event tickets: Create scannable QR codes for event entry and verification",
          "Social media: Link to social media profiles, posts, or campaigns",
        ],
        examples: [
          {
            input: "https://insighthub.ink",
            output: "QR Code Image (300x300px)",
            description: "Generate a QR code for a website URL",
          },
          {
            input: "WIFI:T:WPA;S:MyNetwork;P:password123;;",
            output: "QR Code Image (300x300px)",
            description: "Create a QR code for WiFi network credentials",
          },
          {
            input: "Hello, World!",
            output: "QR Code Image (300x300px)",
            description: "Generate a QR code containing plain text",
          },
        ],
        faqs: [
          {
            question: "What is error correction level?",
            answer:
              "Error correction level determines how much of the QR code can be damaged or obscured while still being scannable. Levels range from L (Low, ~7% recovery) to H (High, ~30% recovery). Higher levels create larger, more complex QR codes but are more resilient to damage.",
          },
          {
            question: "Can QR codes be customized with colors or logos?",
            answer:
              "While this tool generates standard black and white QR codes, QR codes can be customized with colors and logos. However, customization must maintain sufficient contrast for reliable scanning. Use our QR Code Customizer tool for advanced customization options.",
          },
          {
            question: "What data can QR codes store?",
            answer:
              "QR codes can store various types of data including URLs, text (up to 2,953 characters), contact information (vCard), email addresses, phone numbers, SMS messages, WiFi credentials, and geographic coordinates.",
          },
          {
            question: "What's the difference between PNG and SVG formats?",
            answer:
              "PNG is a raster format (pixel-based) ideal for web use and printing at specific sizes. SVG is a vector format (scalable) that maintains quality at any size and is perfect for logos and graphics that need to scale.",
          },
          {
            question: "How do I ensure my QR code scans reliably?",
            answer:
              "Use appropriate error correction level (M or higher for printed materials), ensure sufficient size (minimum 2cm x 2cm for print), maintain high contrast, and test the QR code on multiple devices before distribution.",
          },
        ],
        relatedTools: [
          { id: "qr-code-reader-standalone", name: "QR Code Reader", route: "/tools/qr-code/reader" },
          { id: "qr-code-customizer", name: "QR Code Customizer", route: "/tools/qr-code/customizer" },
        ],
      }}
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
                onChange={(e) => {
                  const level = e.target.value as "L" | "M" | "Q" | "H";
                  setErrorCorrection(level);
                  analytics.trackInteraction("error-correction", "change", { level });
                }}
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
                    <Button
                      onClick={handleDownloadPNG}
                      variant="outline"
                      size="sm"
                      disabled={!qrDataUrl}
                    >
                      Download PNG
                    </Button>
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


