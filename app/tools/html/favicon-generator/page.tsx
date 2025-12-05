"use client";

import { useState, useRef } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { generateFaviconSizes } from "@/lib/tools/image-utils";

export default function HtmlFaviconGeneratorPage() {
  const [faviconPath, setFaviconPath] = useState("favicon.ico");
  const [output, setOutput] = useState("");
  const [faviconPreviews, setFaviconPreviews] = useState<{
    16: string;
    32: string;
    48: string;
    180: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;
        try {
          const sizes = await generateFaviconSizes(imageUrl);
          setFaviconPreviews(sizes);

          // Generate HTML code
          const htmlCode = `<!-- Favicon for all devices -->
<link rel="icon" type="image/png" sizes="16x16" href="${sizes[16]}">
<link rel="icon" type="image/png" sizes="32x32" href="${sizes[32]}">
<link rel="icon" type="image/png" sizes="48x48" href="${sizes[48]}">
<link rel="apple-touch-icon" sizes="180x180" href="${sizes[180]}">

<!-- Or use a single favicon file -->
<link rel="icon" type="image/x-icon" href="${faviconPath}">`;

          setOutput(htmlCode);
          toast.success("Favicon HTML code generated!");
        } catch (error) {
          toast.error("Failed to generate favicon");
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to read file");
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setOutput("");
    setFaviconPreviews(null);
    setFaviconPath("favicon.ico");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="HTML Favicon Generator"
      description="Generate favicon HTML code from images. Create favicons in multiple sizes (16x16, 32x32, 48x48, 180x180) and get ready-to-use HTML code for your website."
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="file-input">Upload Image</Label>
          <input
            id="file-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Choose Image"}
            </Button>
            <Button onClick={handleClear} variant="ghost" size="sm" disabled={isProcessing}>
              Clear
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="favicon-path">Favicon Path (optional)</Label>
            <Input
              id="favicon-path"
              value={faviconPath}
              onChange={(e) => setFaviconPath(e.target.value)}
              placeholder="favicon.ico"
            />
            <p className="text-xs text-muted-foreground">
              Path where the favicon will be hosted (e.g., /favicon.ico)
            </p>
          </div>
        </div>

        {faviconPreviews && (
          <div className="space-y-4">
            <Label>Favicon Previews</Label>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="border rounded p-2 bg-muted flex justify-center">
                  <img src={faviconPreviews[16]} alt="16x16" className="w-8 h-8" />
                </div>
                <p className="text-xs">16×16</p>
              </div>
              <div className="text-center space-y-2">
                <div className="border rounded p-2 bg-muted flex justify-center">
                  <img src={faviconPreviews[32]} alt="32x32" className="w-8 h-8" />
                </div>
                <p className="text-xs">32×32</p>
              </div>
              <div className="text-center space-y-2">
                <div className="border rounded p-2 bg-muted flex justify-center">
                  <img src={faviconPreviews[48]} alt="48x48" className="w-8 h-8" />
                </div>
                <p className="text-xs">48×48</p>
              </div>
              <div className="text-center space-y-2">
                <div className="border rounded p-2 bg-muted flex justify-center">
                  <img src={faviconPreviews[180]} alt="180x180" className="w-16 h-16" />
                </div>
                <p className="text-xs">180×180</p>
              </div>
            </div>
          </div>
        )}

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">HTML Code</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="favicon.html" />
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[200px] bg-muted"
              placeholder="HTML code will appear here..."
            />
            <p className="text-xs text-muted-foreground">
              Paste this code in the &lt;head&gt; section of your HTML file
            </p>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload an image file (square images work best)</li>
            <li>Favicons will be generated in multiple sizes automatically</li>
            <li>Copy the generated HTML code</li>
            <li>Paste it in the &lt;head&gt; section of your HTML file</li>
            <li>For production, upload the Base64 images as separate files</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
