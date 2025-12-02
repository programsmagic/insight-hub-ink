"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateSitemap, type SitemapUrl } from "@/lib/tools/seo-utils";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

export default function SitemapGeneratorPage() {
  const [urls, setUrls] = useState<SitemapUrl[]>([
    { loc: "https://example.com/", changefreq: "daily", priority: 1.0 },
  ]);

  const addUrl = () => {
    setUrls([...urls, { loc: "", changefreq: "weekly", priority: 0.5 }]);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, field: keyof SitemapUrl, value: any) => {
    const newUrls = [...urls];
    const currentUrl = newUrls[index];
    if (currentUrl) {
      newUrls[index] = {
        ...currentUrl,
        [field]: value,
      } as SitemapUrl;
    }
    setUrls(newUrls);
  };

  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (urls.length === 0 || urls.some((u) => !u.loc.trim())) {
      toast.error("Please enter at least one URL");
      return;
    }

    try {
      const sitemap = generateSitemap(urls);
      setOutput(sitemap);
      toast.success("Sitemap generated successfully!");
    } catch (err) {
      toast.error("Failed to generate sitemap");
    }
  };

  const handleClear = () => {
    setUrls([{ loc: "", changefreq: "weekly", priority: 0.5 }]);
    setOutput("");
  };

  return (
    <ToolLayout
      title="Sitemap Generator"
      description="Generate XML sitemaps for websites to help search engines index your pages"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>URLs</Label>
            <Button onClick={addUrl} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add URL
            </Button>
          </div>
          <div className="space-y-3">
            {urls.map((url, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Label>URL {index + 1}</Label>
                  {urls.length > 1 && (
                    <Button onClick={() => removeUrl(index)} variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`loc-${index}`}>Location (URL):</Label>
                    <Input
                      id={`loc-${index}`}
                      value={url.loc}
                      onChange={(e) => updateUrl(index, "loc", e.target.value)}
                      placeholder="https://example.com/page"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`changefreq-${index}`}>Change Frequency:</Label>
                      <Select
                        value={url.changefreq || "weekly"}
                        onValueChange={(v) => updateUrl(index, "changefreq", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="always">Always</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`priority-${index}`}>Priority (0.0-1.0):</Label>
                      <Input
                        id={`priority-${index}`}
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={url.priority || 0.5}
                        onChange={(e) => updateUrl(index, "priority", Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate Sitemap</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">XML Sitemap</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="sitemap.xml" />
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
            <li>Add URLs to include in your sitemap</li>
            <li>Set change frequency and priority for each URL</li>
            <li>Click "Generate Sitemap" to create XML sitemap</li>
            <li>Upload the sitemap.xml file to your website root</li>
            <li>Submit to Google Search Console for indexing</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

