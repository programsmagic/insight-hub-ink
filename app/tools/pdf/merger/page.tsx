"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { Merge, Upload, Download, X, FileText } from "lucide-react";

export default function PdfMergerPage() {
  const analytics = useToolAnalytics("pdf-merger");
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const pdfFiles = selectedFiles.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length !== selectedFiles.length) {
      toast.error("Please select only PDF files");
    }

    if (pdfFiles.length > 0) {
      setFiles((prev) => [...prev, ...pdfFiles]);
      analytics.trackInteraction("files", "upload", { count: pdfFiles.length });
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error("Please upload at least 2 PDF files to merge");
      return;
    }

    setIsProcessing(true);
    setMergedPdfUrl(null);

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/tools/pdf/merger/page.tsx:36',message:'API call initiated',data:{fileCount:files.length,fileNames:files.map(f=>f.name)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/tools/pdf/merger", {
        method: "POST",
        body: formData,
      });
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/tools/pdf/merger/page.tsx:51',message:'Response received',data:{status:response.status,statusText:response.statusText,ok:response.ok,contentType:response.headers.get('content-type')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/tools/pdf/merger/page.tsx:57',message:'Failed to parse error response',data:{status:response.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/tools/pdf/merger/page.tsx:60',message:'Error response parsed',data:{errorData,status:response.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        const errorMessage = errorData.error || "Failed to merge PDFs";
        const details = errorData.details ? `\n\nDetails: ${errorData.details}` : "";
        throw new Error(`${errorMessage}${details}`);
      }

      const blob = await response.blob();
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/tools/pdf/merger/page.tsx:66',message:'Blob received',data:{blobSize:blob.size,blobType:blob.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);

      toast.success("PDFs merged successfully!");
      analytics.trackUsage("merge", { fileCount: files.length });
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/tools/pdf/merger/page.tsx:72',message:'Error caught in frontend',data:{errorMessage:error instanceof Error?error.message:String(error),errorName:error instanceof Error?error.name:undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      toast.error(error instanceof Error ? error.message : "Failed to merge PDFs");
      analytics.trackError("Failed to merge PDFs", { fileCount: files.length });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!mergedPdfUrl) return;

    const a = document.createElement("a");
    a.href = mergedPdfUrl;
    a.download = "merged.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("PDF downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setFiles([]);
    setMergedPdfUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="PDF Merger"
      description="Merge multiple PDF files into one unified document. Combine PDFs in any order, maintain quality, and download instantly."
      category="PDF Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-input">Upload PDF Files (2 or more)</Label>
            <input
              id="file-input"
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              multiple
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
              Add PDF Files
            </Button>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files ({files.length})</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                      disabled={isProcessing}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleMerge}
              disabled={isProcessing || files.length < 2}
              className="flex-1"
            >
              <Merge className="w-4 h-4 mr-2" />
              {isProcessing ? "Merging..." : "Merge PDFs"}
            </Button>
            <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {mergedPdfUrl && (
            <div className="space-y-2">
              <Label>Merged PDF Ready</Label>
              <Button onClick={handleDownload} className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Merged PDF
              </Button>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload 2 or more PDF files</li>
            <li>Files will be merged in the order they appear</li>
            <li>Click "Merge PDFs" to combine them</li>
            <li>Download the merged PDF file</li>
            <li>Maximum file size: 50MB per file</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
