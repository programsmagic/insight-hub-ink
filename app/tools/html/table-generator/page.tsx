"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { generateHTMLTable } from "@/lib/tools/html-utils";
import { toast } from "sonner";

export default function HTMLTableGeneratorPage() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>([
    ["Header 1", "Header 2", "Header 3"],
    ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
    ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
  ]);
  const [output, setOutput] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  const [border, setBorder] = useState(true);
  const [striped] = useState(false);

  const updateData = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...data];
    if (!newData[rowIndex]) {
      newData[rowIndex] = [];
    }
    const row = newData[rowIndex];
    if (row) {
      row[colIndex] = value;
    }
    setData(newData);
  };

  const handleGenerate = () => {
    try {
      const table = generateHTMLTable(data, { hasHeader, border, striped });
      setOutput(table);
      toast.success("HTML table generated successfully!");
    } catch (err) {
      toast.error("Failed to generate table");
    }
  };

  const handleResize = () => {
    const newData: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < cols; j++) {
        row[j] = data[i]?.[j] || "";
      }
      newData[i] = row;
    }
    setData(newData);
  };

  return (
    <ToolLayout
      title="HTML Table Generator"
      description="Generate HTML table code from data with customizable options"
      category="HTML Tools"
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rows">Rows:</Label>
            <Input
              id="rows"
              type="number"
              value={rows}
              onChange={(e) => {
                setRows(Number(e.target.value) || 1);
                setTimeout(handleResize, 100);
              }}
              min={1}
              max={20}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cols">Columns:</Label>
            <Input
              id="cols"
              type="number"
              value={cols}
              onChange={(e) => {
                setCols(Number(e.target.value) || 1);
                setTimeout(handleResize, 100);
              }}
              min={1}
              max={20}
            />
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <Checkbox
              id="header"
              checked={hasHeader}
              onCheckedChange={(checked) => setHasHeader(checked === true)}
            />
            <Label htmlFor="header" className="cursor-pointer">Header Row</Label>
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <Checkbox
              id="border"
              checked={border}
              onCheckedChange={(checked) => setBorder(checked === true)}
            />
            <Label htmlFor="border" className="cursor-pointer">Border</Label>
          </div>
        </div>

        {/* Table Data Input */}
        <div className="space-y-4">
          <Label>Table Data</Label>
          <div className="border rounded-lg p-4 overflow-x-auto">
            <table className="w-full">
              <tbody>
                {data.map((_row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: cols }).map((_, colIndex) => (
                      <td key={colIndex} className="p-1">
                        <Input
                          value={data[rowIndex]?.[colIndex] || ""}
                          onChange={(e) => updateData(rowIndex, colIndex, e.target.value)}
                          placeholder={`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
                          className="w-full text-sm"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Generate Button */}
        <Button onClick={handleGenerate} className="w-full">
          Generate HTML Table
        </Button>

        {/* Output */}
        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Generated HTML</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="table.html" />
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[200px] bg-muted"
            />
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Set the number of rows and columns</li>
            <li>Fill in the table data</li>
            <li>Choose options (header row, border, striped)</li>
            <li>Click "Generate HTML Table" to create the code</li>
            <li>Copy or download the generated HTML</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

