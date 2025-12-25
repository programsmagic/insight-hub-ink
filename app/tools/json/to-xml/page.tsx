"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jsonToXML, validateJSON } from "@/lib/tools/json-utils";
import { toast } from "sonner";

export default function JSONToXMLPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [rootName, setRootName] = useState("root");
  const [error, setError] = useState("");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    const validation = validateJSON(input);
    if (!validation.valid) {
      setError(validation.error || "Invalid JSON");
      setOutput("");
      toast.error("Invalid JSON");
      return;
    }

    try {
      setError("");
      const xml = jsonToXML(input, rootName || "root");
      setOutput(xml);
      toast.success("JSON converted to XML successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert JSON to XML");
      setOutput("");
      toast.error("Failed to convert JSON to XML");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      title="JSON to XML"
      description="Convert JSON data to XML format instantly with this free online converter"
      category="JSON Tools"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="rootName">Root Element Name:</Label>
            <Input
              id="rootName"
              value={rootName}
              onChange={(e) => setRootName(e.target.value)}
              placeholder="root"
              className="w-32"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON</Label>
              <div className="flex gap-2">
                <Button onClick={handleConvert} size="sm">
                  Convert
                </Button>
                <Button onClick={handleClear} variant="ghost" size="sm">
                  Clear
                </Button>
              </div>
            </div>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="font-mono text-sm min-h-[300px]"
            />
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">XML Output</Label>
              <div className="flex gap-2">
                {output && (
                  <>
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename="converted.xml" />
                  </>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="XML output will appear here..."
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste your JSON in the input field</li>
            <li>Optionally set a custom root element name</li>
            <li>Click "Convert" to transform JSON to XML format</li>
            <li>Copy or download the XML result</li>
            <li>Perfect for legacy systems and SOAP APIs that require XML format</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}










