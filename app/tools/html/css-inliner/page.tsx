"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function inlineCSS(html: string, css: string): string {
  // Simple CSS inliner - matches selectors and applies styles
  let result = html;

  // Extract CSS rules
  const cssRules = css.match(/([^{]+)\{([^}]+)\}/g) || [];

  for (const rule of cssRules) {
    const match = rule.match(/([^{]+)\{([^}]+)\}/);
    if (!match || !match[1] || !match[2]) continue;

    const selector = match[1].trim();
    const styles = match[2].trim();

    // Simple selector matching (class and id)
    if (selector.startsWith(".")) {
      const className = selector.slice(1);
      const regex = new RegExp(`<([^>]+)class=["']([^"']*\\b${className}\\b[^"']*)["']([^>]*)>`, "gi");
      result = result.replace(regex, (match, before, classes, after) => {
        const styleAttr = match.includes('style="') 
          ? match.replace(/style="([^"]*)"/, `style="$1; ${styles}"`)
          : `<${before}class="${classes}" style="${styles}"${after}>`;
        return styleAttr;
      });
    } else if (selector.startsWith("#")) {
      const id = selector.slice(1);
      const regex = new RegExp(`<([^>]+)id=["']${id}["']([^>]*)>`, "gi");
      result = result.replace(regex, (match, before, after) => {
        const styleAttr = match.includes('style="')
          ? match.replace(/style="([^"]*)"/, `style="$1; ${styles}"`)
          : `<${before}id="${id}" style="${styles}"${after}>`;
        return styleAttr;
      });
    }
  }

  return result;
}

export default function HTMLCSSInlinerPage() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [output, setOutput] = useState("");

  const handleInline = () => {
    if (!html.trim()) {
      toast.error("Please enter HTML");
      return;
    }

    if (!css.trim()) {
      toast.error("Please enter CSS");
      return;
    }

    try {
      const inlined = inlineCSS(html, css);
      setOutput(inlined);
      toast.success("CSS inlined successfully!");
    } catch (err) {
      toast.error("Failed to inline CSS");
    }
  };

  const handleClear = () => {
    setHtml("");
    setCss("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="HTML CSS Inliner"
      description="Inline CSS styles into HTML elements for email and embedded content"
      category="HTML Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="html">HTML</Label>
            <Textarea
              id="html"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder='<div class="container">Content</div>'
              className="font-mono text-sm min-h-[200px]"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="css">CSS</Label>
            <Textarea
              id="css"
              value={css}
              onChange={(e) => setCss(e.target.value)}
              placeholder=".container { color: red; padding: 10px; }"
              className="font-mono text-sm min-h-[200px]"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleInline}>Inline CSS</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">HTML with Inlined CSS</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="inlined.html" />
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
            />
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter HTML code and CSS styles</li>
            <li>Click "Inline CSS" to apply styles directly to elements</li>
            <li>Copy or download the result</li>
            <li>Perfect for email templates and embedded HTML</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

