"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { FileText, Upload, Download, X, Scissors } from "lucide-react";

export default function PdfPageExtractorPage() {
  const analytics = useToolAnalytics("pdf-page-extractor");
  const [file, setFile] = useState<File | null>(null);
  const [pageNumbers, setPageNumbers] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedPdfUrl, setExtractedPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    setFile(selectedFile);
    setExtractedPdfUrl(null);
    analytics.trackInteraction("file", "upload");
  };

  const parsePageNumbers = (input: string): number[] => {
    const numbers: number[] = [];
    const parts = input.split(",");

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        // Handle ranges like "1-5"
        const [start, end] = trimmed.split("-").map((n) => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end) && start > 0 && end > 0 && start <= end) {
          for (let i = start; i <= end; i++) {
            if (!numbers.includes(i)) numbers.push(i);
          }
        }
      } else {
        // Handle single numbers
        const num = parseInt(trimmed);
        if (!isNaN(num) && num > 0 && !numbers.includes(num)) {
          numbers.push(num);
        }
      }
    }

    return numbers.sort((a, b) => a - b);
  };

  const handleExtract = async () => {
    if (!file) {
      toast.error("Please upload a PDF file first");
      return;
    }

    if (!pageNumbers.trim()) {
      toast.error("Please enter page numbers to extract");
      return;
    }

    const pages = parsePageNumbers(pageNumbers);
    if (pages.length === 0) {
      toast.error("Please enter valid page numbers (e.g., 1,3,5 or 1-5)");
      return;
    }

    setIsProcessing(true);
    setExtractedPdfUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pageNumbers", JSON.stringify(pages));
      
      // #region agent log
      console.log("[PDF Page Extractor] Sending request", { 
        fileName: file.name, 
        fileSize: file.size, 
        pageNumbers: pages 
      });
      // #endregion

      const response = await fetch("/api/tools/pdf/page-extractor", {
        method: "POST",
        body: formData,
      });
      
      // #region agent log
      console.log("[PDF Page Extractor] Response received", { 
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
          console.error("[PDF Page Extractor] Error response", errorData);
          // #endregion
        } catch (e) {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
          // #region agent log
          console.error("[PDF Page Extractor] Failed to parse error response", e);
          // #endregion
        }
        const errorMessage = errorData.error || "Failed to extract pages";
        const details = errorData.details ? `\n\nDetails: ${errorData.details}` : "";
        throw new Error(`${errorMessage}${details}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setExtractedPdfUrl(url);

      toast.success(`Successfully extracted ${pages.length} page(s)!`);
      analytics.trackUsage("extract", { pageCount: pages.length });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to extract pages");
      analytics.trackError("Failed to extract pages", { pageCount: pages.length });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!extractedPdfUrl) return;

    const a = document.createElement("a");
    a.href = extractedPdfUrl;
    a.download = "extracted-pages.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("PDF downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setFile(null);
    setPageNumbers("");
    setExtractedPdfUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="PDF Page Extractor"
      description="Extract specific pages from PDF files. Select individual pages or ranges to create a new PDF with only the pages you need."
      category="PDF Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-input">Upload PDF File</Label>
            <input
              id="file-input"
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isProcessing}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              disabled={isProcessing}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              {file ? `Selected: ${file.name}` : "Choose PDF File"}
            </Button>
            {file && (
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="page-numbers">Page Numbers to Extract</Label>
            <Input
              id="page-numbers"
              type="text"
              value={pageNumbers}
              onChange={(e) => setPageNumbers(e.target.value)}
              placeholder="e.g., 1,3,5 or 1-5 or 1,3-5,10"
              disabled={isProcessing}
            />
            <p className="text-xs text-muted-foreground">
              Enter page numbers separated by commas, or use ranges (e.g., 1-5). Examples: "1,3,5" or "1-5" or "1,3-5,10"
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleExtract}
              disabled={isProcessing || !file || !pageNumbers.trim()}
              className="flex-1"
            >
              <Scissors className="w-4 h-4 mr-2" />
              {isProcessing ? "Extracting..." : "Extract Pages"}
            </Button>
            <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {extractedPdfUrl && (
            <div className="space-y-2">
              <Label>Extracted PDF Ready</Label>
              <Button onClick={handleDownload} className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Extracted PDF
              </Button>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload a PDF file</li>
            <li>Enter page numbers to extract (e.g., "1,3,5" or "1-5" or "1,3-5,10")</li>
            <li>Click "Extract Pages" to create a new PDF with only the selected pages</li>
            <li>Download the extracted PDF file</li>
            <li>Maximum file size: 50MB</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
