"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateRobotsTxt } from "@/lib/tools/seo-utils";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

export default function RobotsTxtGeneratorPage() {
  const [userAgent, setUserAgent] = useState("*");
  const [allow, setAllow] = useState<string[]>([""]);
  const [disallow, setDisallow] = useState<string[]>([""]);
  const [sitemap, setSitemap] = useState("");
  const [crawlDelay, setCrawlDelay] = useState<number | undefined>();
  const [output, setOutput] = useState("");

  const addAllow = () => setAllow([...allow, ""]);
  const removeAllow = (index: number) => setAllow(allow.filter((_, i) => i !== index));
  const updateAllow = (index: number, value: string) => {
    const newAllow = [...allow];
    newAllow[index] = value;
    setAllow(newAllow);
  };

  const addDisallow = () => setDisallow([...disallow, ""]);
  const removeDisallow = (index: number) => setDisallow(disallow.filter((_, i) => i !== index));
  const updateDisallow = (index: number, value: string) => {
    const newDisallow = [...disallow];
    newDisallow[index] = value;
    setDisallow(newDisallow);
  };

  const handleGenerate = () => {
    try {
      const robots = generateRobotsTxt({
        userAgent: userAgent || undefined,
        allow: allow.filter((a) => a.trim()),
        disallow: disallow.filter((d) => d.trim()),
        sitemap: sitemap || undefined,
        crawlDelay: crawlDelay,
      });
      setOutput(robots);
      toast.success("robots.txt generated successfully!");
    } catch (err) {
      toast.error("Failed to generate robots.txt");
    }
  };

  const handleClear = () => {
    setUserAgent("*");
    setAllow([""]);
    setDisallow([""]);
    setSitemap("");
    setCrawlDelay(undefined);
    setOutput("");
  };

  return (
    <ToolLayout
      title="Robots.txt Generator"
      description="Generate robots.txt file to control search engine crawlers"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="userAgent">User Agent:</Label>
            <Input
              id="userAgent"
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              placeholder="* (all bots)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sitemap">Sitemap URL:</Label>
            <Input
              id="sitemap"
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Allow Paths</Label>
            <Button onClick={addAllow} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {allow.map((path, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={path}
                  onChange={(e) => updateAllow(index, e.target.value)}
                  placeholder="/allowed-path"
                />
                {allow.length > 1 && (
                  <Button onClick={() => removeAllow(index)} variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Disallow Paths</Label>
            <Button onClick={addDisallow} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {disallow.map((path, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={path}
                  onChange={(e) => updateDisallow(index, e.target.value)}
                  placeholder="/disallowed-path"
                />
                {disallow.length > 1 && (
                  <Button onClick={() => removeDisallow(index)} variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="crawlDelay">Crawl Delay (seconds):</Label>
          <Input
            id="crawlDelay"
            type="number"
            value={crawlDelay || ""}
            onChange={(e) => setCrawlDelay(e.target.value ? Number(e.target.value) : undefined)}
            placeholder="Optional"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate robots.txt</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">robots.txt</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="robots.txt" />
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
            <li>Set user agent (default: * for all bots)</li>
            <li>Add paths to allow or disallow</li>
            <li>Optionally set sitemap URL and crawl delay</li>
            <li>Click "Generate robots.txt" to create the file</li>
            <li>Upload robots.txt to your website root directory</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}









