"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { replaceText } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function TextReplacePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [search, setSearch] = useState("");
  const [replace, setReplace] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);

  const handleReplace = () => {
    if (!input.trim()) {
      toast.error("Please enter text");
      return;
    }

    if (!search.trim()) {
      toast.error("Please enter search text");
      return;
    }

    try {
      const replaced = replaceText(input, search, replace, useRegex, caseSensitive);
      setOutput(replaced);
      const count = (input.match(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), caseSensitive ? "g" : "gi")) || []).length;
      toast.success(`Replaced ${count} occurrence(s)!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to replace text");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setSearch("");
    setReplace("");
  };

  return (
    <ToolLayout
      title="Find and Replace"
      description="Find and replace text with support for regex patterns and case sensitivity"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Find</Label>
            <Input
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Text to find..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="replace">Replace With</Label>
            <Input
              id="replace"
              value={replace}
              onChange={(e) => setReplace(e.target.value)}
              placeholder="Replacement text..."
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="regex"
              checked={useRegex}
              onCheckedChange={(checked) => setUseRegex(checked === true)}
            />
            <Label htmlFor="regex" className="cursor-pointer">Use Regular Expression</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="case"
              checked={caseSensitive}
              onCheckedChange={(checked) => setCaseSensitive(checked === true)}
            />
            <Label htmlFor="case" className="cursor-pointer">Case Sensitive</Label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input Text</Label>
              <div className="flex gap-2">
                <Button onClick={handleReplace} size="sm">
                  Replace
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
              placeholder="Enter text to search and replace..."
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Result</Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename="replaced.txt" />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Replaced text will appear here..."
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter the text to find and the replacement text</li>
            <li>Optionally enable regex for pattern matching</li>
            <li>Toggle case sensitivity as needed</li>
            <li>Click "Replace" to perform the replacement</li>
            <li>Copy or download the result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


