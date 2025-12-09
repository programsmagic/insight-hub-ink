"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateTwitterCardTags } from "@/lib/tools/seo-utils";
import { toast } from "sonner";

export default function TwitterCardGeneratorPage() {
  const [card, setCard] = useState<"summary" | "summary_large_image">("summary");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [site, setSite] = useState("");
  const [creator, setCreator] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    try {
      const tags = generateTwitterCardTags({
        card,
        title,
        description,
        image,
        site,
        creator,
      });
      setOutput(tags);
      toast.success("Twitter Card tags generated successfully!");
    } catch (err) {
      toast.error("Failed to generate tags");
    }
  };

  const handleClear = () => {
    setCard("summary");
    setTitle("");
    setDescription("");
    setImage("");
    setSite("");
    setCreator("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Twitter Card Generator"
      description="Generate Twitter Card meta tags for rich Twitter previews"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="card">Card Type:</Label>
          <Select value={card} onValueChange={(v) => setCard(v as "summary" | "summary_large_image")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary">Summary</SelectItem>
              <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
            <Label htmlFor="site">Twitter Site (@username)</Label>
            <Input
              id="site"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="@yourusername"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="creator">Twitter Creator (@username)</Label>
          <Input
            id="creator"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            placeholder="@authorusername"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate Twitter Card Tags</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Twitter Card Meta Tags</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="twitter-card.html" />
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
            <li>Choose card type (Summary or Summary Large Image)</li>
            <li>Fill in title (required) and description</li>
            <li>Add image URL and Twitter usernames</li>
            <li>Click "Generate Twitter Card Tags" to create meta tags</li>
            <li>Add the tags to your HTML page's &lt;head&gt; section</li>
            <li>Improves how your content appears when shared on Twitter</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}




