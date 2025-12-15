"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { FileText, Download, X } from "lucide-react";

export default function TextToPdfPage() {
  const analytics = useToolAnalytics("text-to-pdf");
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState<"Helvetica" | "Times-Roman" | "Courier">("Helvetica");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to convert");
      return;
    }

    setIsProcessing(true);
    setPdfUrl(null);

    try {
      const requestBody = {
        text,
        fontSize,
        fontFamily,
      };
      
      // #region agent log
      console.log("[Text to PDF] Sending request", { 
        textLength: text.length, 
        fontSize, 
        fontFamily 
      });
      // #endregion
      
      const response = await fetch("/api/tools/pdf/from-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      // #region agent log
      console.log("[Text to PDF] Response received", { 
        status: response.status, 
        statusText: response.statusText, 
        ok: response.ok,
        contentType: response.headers.get("content-type")
      });
      // #endregion

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          // #region agent log
          console.error("[Text to PDF] Error response", errorData);
          // #endregion
        } catch (e) {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
          // #region agent log
          console.error("[Text to PDF] Failed to parse error response", e);
          // #endregion
        }
        const errorMessage = errorData.error || "Failed to convert text to PDF";
        const details = errorData.details ? `\n\nDetails: ${errorData.details}` : "";
        throw new Error(`${errorMessage}${details}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      toast.success("PDF created successfully!");
      analytics.trackUsage("convert", { textLength: text.length, fontSize, fontFamily });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to convert text to PDF");
      analytics.trackError("Failed to convert text to PDF", { textLength: text.length });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;

    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("PDF downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setText("");
    setFontSize(12);
    setFontFamily("Helvetica");
    setPdfUrl(null);
  };

  return (
    <ToolLayout
      title="Text to PDF"
      description="Convert plain text to PDF format with customizable fonts and sizes. Perfect for creating documents, reports, or converting text content to PDF format."
      category="PDF Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text-input">Enter Text</Label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the text you want to convert to PDF..."
              rows={10}
              disabled={isProcessing}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              {text.length} characters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Input
                id="font-size"
                type="number"
                min={8}
                max={72}
                value={fontSize}
                onChange={(e) => setFontSize(Math.max(8, Math.min(72, parseInt(e.target.value) || 12)))}
                disabled={isProcessing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select
                value={fontFamily}
                onValueChange={(value) => setFontFamily(value as typeof fontFamily)}
                disabled={isProcessing}
              >
                <SelectTrigger id="font-family">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Times-Roman">Times Roman</SelectItem>
                  <SelectItem value="Courier">Courier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleConvert}
              disabled={isProcessing || !text.trim()}
              className="flex-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              {isProcessing ? "Converting..." : "Convert to PDF"}
            </Button>
            <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {pdfUrl && (
            <div className="space-y-2">
              <Label>PDF Ready</Label>
              <Button onClick={handleDownload} className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter or paste the text you want to convert</li>
            <li>Choose font size (8-72 points) and font family</li>
            <li>Click "Convert to PDF" to generate the PDF</li>
            <li>Download the generated PDF file</li>
            <li>Supports plain text formatting</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
