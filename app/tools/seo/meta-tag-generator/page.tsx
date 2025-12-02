"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generateMetaTags } from "@/lib/tools/html-utils";
import { toast } from "sonner";

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!title && !description) {
      toast.error("Please enter at least a title or description");
      return;
    }

    try {
      const meta = generateMetaTags({
        title: title || undefined,
        description: description || undefined,
        keywords: keywords || undefined,
        author: author || undefined,
        ogTitle: ogTitle || title || undefined,
        ogDescription: ogDescription || description || undefined,
        ogImage: ogImage || undefined,
        ogUrl: ogUrl || undefined,
        twitterCard: twitterCard || undefined,
        twitterTitle: twitterTitle || ogTitle || title || undefined,
        twitterDescription: twitterDescription || ogDescription || description || undefined,
        twitterImage: twitterImage || ogImage || undefined,
      });
      setOutput(meta);
      toast.success("Meta tags generated successfully!");
    } catch (err) {
      toast.error("Failed to generate meta tags");
    }
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setKeywords("");
    setAuthor("");
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setOgUrl("");
    setTwitterCard("summary_large_image");
    setTwitterTitle("");
    setTwitterDescription("");
    setTwitterImage("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Meta Tag Generator"
      description="Generate SEO meta tags including Open Graph and Twitter Card tags"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Basic Meta Tags</h3>
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Page title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Page description (150-160 characters recommended)"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Open Graph Tags</h3>
              <div className="space-y-2">
                <Label htmlFor="og-title">OG Title</Label>
                <Input
                  id="og-title"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="Defaults to title if empty"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-description">OG Description</Label>
                <Textarea
                  id="og-description"
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="Defaults to description if empty"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-image">OG Image URL</Label>
                <Input
                  id="og-image"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-url">OG URL</Label>
                <Input
                  id="og-url"
                  value={ogUrl}
                  onChange={(e) => setOgUrl(e.target.value)}
                  placeholder="https://example.com/page"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Twitter Card Tags</h3>
              <div className="space-y-2">
                <Label htmlFor="twitter-card">Twitter Card Type</Label>
                <select
                  id="twitter-card"
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="app">App</option>
                  <option value="player">Player</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-title">Twitter Title</Label>
                <Input
                  id="twitter-title"
                  value={twitterTitle}
                  onChange={(e) => setTwitterTitle(e.target.value)}
                  placeholder="Defaults to OG title if empty"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-description">Twitter Description</Label>
                <Textarea
                  id="twitter-description"
                  value={twitterDescription}
                  onChange={(e) => setTwitterDescription(e.target.value)}
                  placeholder="Defaults to OG description if empty"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-image">Twitter Image URL</Label>
                <Input
                  id="twitter-image"
                  value={twitterImage}
                  onChange={(e) => setTwitterImage(e.target.value)}
                  placeholder="Defaults to OG image if empty"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleGenerate} className="flex-1">
                Generate Meta Tags
              </Button>
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Generated Meta Tags</Label>
              <div className="flex gap-2">
                {output && (
                  <>
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename="meta-tags.html" />
                  </>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[600px] bg-muted"
              placeholder="Generated meta tags will appear here..."
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">SEO Best Practices:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Title should be 50-60 characters for optimal display</li>
            <li>Description should be 150-160 characters for best results</li>
            <li>Use relevant keywords naturally in title and description</li>
            <li>OG image should be at least 1200x630 pixels for best display</li>
            <li>Twitter image should be at least 1200x675 pixels for large image cards</li>
            <li>Use absolute URLs for OG and Twitter images</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

