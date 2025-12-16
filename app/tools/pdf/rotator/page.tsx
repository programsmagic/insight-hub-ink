"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";
import { RotateCw, Upload, Download, X, FileText, Plus, Trash2 } from "lucide-react";

type RotationAngle = 90 | 180 | 270;

interface PageRotation {
  pageNumber: number;
  angle: RotationAngle;
}

export default function PdfRotatorPage() {
  const analytics = useToolAnalytics("pdf-rotator");
  const [file, setFile] = useState<File | null>(null);
  const [rotations, setRotations] = useState<PageRotation[]>([]);
  const [currentPage, setCurrentPage] = useState("");
  const [currentAngle, setCurrentAngle] = useState<RotationAngle>(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotatedPdfUrl, setRotatedPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    setFile(selectedFile);
    setRotatedPdfUrl(null);
    setRotations([]);
    setCurrentPage("");
    analytics.trackInteraction("file", "upload");
  };

  const handleAddRotation = () => {
    const pageNum = parseInt(currentPage);
    if (isNaN(pageNum) || pageNum < 1) {
      toast.error("Please enter a valid page number (1 or higher)");
      return;
    }

    // Check if rotation for this page already exists
    if (rotations.some((r) => r.pageNumber === pageNum)) {
      toast.error(`Page ${pageNum} already has a rotation. Remove it first or update it.`);
      return;
    }

    setRotations([...rotations, { pageNumber: pageNum, angle: currentAngle }]);
    setCurrentPage("");
    toast.success(`Added rotation for page ${pageNum}`);
  };

  const handleRemoveRotation = (index: number) => {
    setRotations(rotations.filter((_, i) => i !== index));
  };

  const handleRotate = async () => {
    if (!file) {
      toast.error("Please upload a PDF file first");
      return;
    }

    if (rotations.length === 0) {
      toast.error("Please add at least one page rotation");
      return;
    }

    setIsProcessing(true);
    setRotatedPdfUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      // Convert angles to strings as expected by validation schema
      const rotationsForApi = rotations.map(r => ({
        pageNumber: r.pageNumber,
        angle: r.angle.toString() as "90" | "180" | "270"
      }));
      formData.append("rotations", JSON.stringify(rotationsForApi));
      
      // #region agent log
      console.log("[PDF Rotator] Sending request", { 
        fileName: file.name, 
        fileSize: file.size, 
        rotations: rotationsForApi 
      });
      // #endregion

      const response = await fetch("/api/tools/pdf/rotator", {
        method: "POST",
        body: formData,
      });
      
      // #region agent log
      console.log("[PDF Rotator] Response received", { 
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
          console.error("[PDF Rotator] Error response", errorData);
          // #endregion
        } catch (e) {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
          // #region agent log
          console.error("[PDF Rotator] Failed to parse error response", e);
          // #endregion
        }
        const errorMessage = errorData.error || "Failed to rotate PDF";
        const details = errorData.details ? `\n\nDetails: ${errorData.details}` : "";
        throw new Error(`${errorMessage}${details}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setRotatedPdfUrl(url);

      toast.success(`Successfully rotated ${rotations.length} page(s)!`);
      analytics.trackUsage("rotate", { rotationCount: rotations.length });
    } catch (error) {
      // #region agent log
      console.error("[PDF Rotator] Error caught", { 
        error: error instanceof Error ? error.message : String(error), 
        stack: error instanceof Error ? error.stack : undefined 
      });
      // #endregion
      toast.error(error instanceof Error ? error.message : "Failed to rotate PDF");
      analytics.trackError("Failed to rotate PDF", { rotationCount: rotations.length });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!rotatedPdfUrl) return;

    const a = document.createElement("a");
    a.href = rotatedPdfUrl;
    a.download = "rotated.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("PDF downloaded!");
    analytics.trackUsage("download");
  };

  const handleClear = () => {
    setFile(null);
    setRotations([]);
    setCurrentPage("");
    setCurrentAngle(90);
    setRotatedPdfUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="PDF Rotator"
      description="Rotate specific pages in PDF files by 90, 180, or 270 degrees. Perfect for correcting orientation issues or adjusting page layouts."
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

          {file && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Add Page Rotation</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min={1}
                    value={currentPage}
                    onChange={(e) => setCurrentPage(e.target.value)}
                    placeholder="Page number"
                    disabled={isProcessing}
                    className="flex-1"
                  />
                  <Select
                    value={currentAngle.toString()}
                    onValueChange={(value) => setCurrentAngle(parseInt(value) as RotationAngle)}
                    disabled={isProcessing}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90°</SelectItem>
                      <SelectItem value="180">180°</SelectItem>
                      <SelectItem value="270">270°</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleAddRotation}
                    disabled={isProcessing || !currentPage}
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {rotations.length > 0 && (
                <div className="space-y-2">
                  <Label>Page Rotations ({rotations.length})</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {rotations.map((rotation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted rounded"
                      >
                        <span className="text-sm">
                          Page {rotation.pageNumber}: {rotation.angle}°
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveRotation(index)}
                          disabled={isProcessing}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleRotate}
              disabled={isProcessing || !file || rotations.length === 0}
              className="flex-1"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              {isProcessing ? "Rotating..." : "Rotate PDF"}
            </Button>
            <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {rotatedPdfUrl && (
            <div className="space-y-2">
              <Label>Rotated PDF Ready</Label>
              <Button onClick={handleDownload} className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Rotated PDF
              </Button>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload a PDF file</li>
            <li>Enter a page number and select rotation angle (90°, 180°, or 270°)</li>
            <li>Click the + button to add the rotation</li>
            <li>Add multiple page rotations as needed</li>
            <li>Click "Rotate PDF" to apply all rotations</li>
            <li>Download the rotated PDF file</li>
            <li>Maximum file size: 50MB</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
