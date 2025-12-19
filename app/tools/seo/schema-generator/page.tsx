"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateSchemaMarkup } from "@/lib/tools/seo-utils";
import { toast } from "sonner";

export default function SchemaGeneratorPage() {
  const [schemaType, setSchemaType] = useState("Article");
  const [data, setData] = useState<Record<string, any>>({
    headline: "",
    author: { "@type": "Person", name: "" },
    datePublished: "",
  });
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    try {
      const schema = generateSchemaMarkup(schemaType, data);
      setOutput(schema);
      toast.success("Schema markup generated successfully!");
    } catch (err) {
      toast.error("Failed to generate schema");
    }
  };

  const handleClear = () => {
    setData({});
    setOutput("");
  };

  const updateDataField = (key: string, value: any) => {
    setData({ ...data, [key]: value });
  };

  return (
    <ToolLayout
      title="Schema Markup Generator"
      description="Generate JSON-LD schema markup for structured data to help search engines understand your content"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="type">Schema Type:</Label>
          <Select value={schemaType} onValueChange={setSchemaType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Article">Article</SelectItem>
              <SelectItem value="Organization">Organization</SelectItem>
              <SelectItem value="Person">Person</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="LocalBusiness">Local Business</SelectItem>
              <SelectItem value="WebSite">Website</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Schema Data</Label>
          <div className="space-y-2">
            <div>
              <Label htmlFor="name">Name/Title:</Label>
              <Input
                id="name"
                value={data.name || data.headline || ""}
                onChange={(e) => {
                  if (schemaType === "Article") {
                    updateDataField("headline", e.target.value);
                  } else {
                    updateDataField("name", e.target.value);
                  }
                }}
                placeholder="Enter name or title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description:</Label>
              <Textarea
                id="description"
                value={data.description || ""}
                onChange={(e) => updateDataField("description", e.target.value)}
                placeholder="Enter description"
                className="min-h-[100px]"
              />
            </div>
            {schemaType === "Article" && (
              <>
                <div>
                  <Label htmlFor="author">Author Name:</Label>
                  <Input
                    id="author"
                    value={data.author?.name || ""}
                    onChange={(e) => updateDataField("author", { "@type": "Person", name: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <Label htmlFor="datePublished">Date Published:</Label>
                  <Input
                    id="datePublished"
                    type="date"
                    value={data.datePublished || ""}
                    onChange={(e) => updateDataField("datePublished", e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate Schema</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">JSON-LD Schema</Label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <DownloadButton content={output} filename="schema.json" />
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
            <li>Select a schema type (Article, Organization, Product, etc.)</li>
            <li>Fill in the required fields</li>
            <li>Click "Generate Schema" to create JSON-LD markup</li>
            <li>Add the schema to your HTML page's &lt;head&gt; section</li>
            <li>Helps search engines understand your content better</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}






