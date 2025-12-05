"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { generateMetaTags } from "@/lib/tools/html-utils";

export default function HtmlMetaGeneratorPage() {
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

    const metaTags = generateMetaTags({
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

    setOutput(metaTags);
    toast.success("Meta tags generated successfully!");
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
      title="HTML Meta Tag Generator"
      description="Generate comprehensive HTML meta tags for SEO optimization. Create meta tags for search engines, Open Graph tags for social media, and Twitter Cards. Perfect for website developers and SEO specialists."
      category="HTML Tools"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Basic Meta Tags</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Page Title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Page description (150-160 characters recommended)"
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {description.length}/160 characters
                </p>
              </div>
              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Open Graph Tags (Social Media)</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="og-title">OG Title</Label>
                <Input
                  id="og-title"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="Open Graph title (defaults to title)"
                />
              </div>
              <div>
                <Label htmlFor="og-description">OG Description</Label>
                <Textarea
                  id="og-description"
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="Open Graph description (defaults to description)"
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="og-image">OG Image URL</Label>
                <Input
                  id="og-image"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="og-url">OG URL</Label>
                <Input
                  id="og-url"
                  value={ogUrl}
                  onChange={(e) => setOgUrl(e.target.value)}
                  placeholder="https://example.com/page"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Twitter Card Tags</h3>
            <div className="space-y-4">
              <div>
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
              <div>
                <Label htmlFor="twitter-title">Twitter Title</Label>
                <Input
                  id="twitter-title"
                  value={twitterTitle}
                  onChange={(e) => setTwitterTitle(e.target.value)}
                  placeholder="Twitter title (defaults to OG title)"
                />
              </div>
              <div>
                <Label htmlFor="twitter-description">Twitter Description</Label>
                <Textarea
                  id="twitter-description"
                  value={twitterDescription}
                  onChange={(e) => setTwitterDescription(e.target.value)}
                  placeholder="Twitter description (defaults to OG description)"
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="twitter-image">Twitter Image URL</Label>
                <Input
                  id="twitter-image"
                  value={twitterImage}
                  onChange={(e) => setTwitterImage(e.target.value)}
                  placeholder="https://example.com/twitter-image.jpg"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate Meta Tags</Button>
          <Button onClick={handleClear} variant="outline">
            Clear All
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Generated HTML Meta Tags</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="meta-tags.html" />
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Generated meta tags will appear here..."
            />
            <p className="text-xs text-muted-foreground">
              Paste this code in the &lt;head&gt; section of your HTML file
            </p>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Fill in the form fields (title and description are required)</li>
            <li>Add Open Graph tags for better social media sharing</li>
            <li>Configure Twitter Card tags for Twitter sharing</li>
            <li>Click "Generate Meta Tags" to create the HTML code</li>
            <li>Copy and paste the generated code in your HTML &lt;head&gt; section</li>
            <li>All processing happens in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
