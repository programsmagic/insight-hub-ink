"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateOpenGraphTags } from "@/lib/tools/seo-utils";
import { toast } from "sonner";

export default function OpenGraphGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("website");
  const [siteName, setSiteName] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    try {
      const tags = generateOpenGraphTags({
        title,
        description,
        image,
        url,
        type,
        siteName,
      });
      setOutput(tags);
      toast.success("Open Graph tags generated successfully!");
    } catch (err) {
      toast.error("Failed to generate tags");
    }
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setUrl("");
    setType("website");
    setSiteName("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Open Graph Tag Generator"
      description="Generate Open Graph meta tags for better social media sharing"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Page description"
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Page URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Your Site Name"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate Open Graph Tags</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Open Graph Meta Tags</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="open-graph.html" />
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
            <li>Fill in the Open Graph fields (title is required)</li>
            <li>Add an image URL for better social media previews</li>
            <li>Click "Generate Open Graph Tags" to create meta tags</li>
            <li>Add the tags to your HTML page's &lt;head&gt; section</li>
            <li>Improves how your content appears when shared on social media</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}








