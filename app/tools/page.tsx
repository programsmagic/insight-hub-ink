"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdSenseDisplay } from "@/components/ads";
import {
  allTools,
  toolCategories,
  totalToolCount,
  searchTools,
  getToolsByCategory,
} from "./data";
import { Tool, ToolCategory } from "@/lib/types/tools";
import {
  Search,
  Sparkles,
  FileJson,
  Type,
  Image,
  FileText,
  Code,
  Cloud,
  Palette,
  Lock,
  Fingerprint,
  QrCode,
  Clock,
  Ruler,
} from "lucide-react";

const categoryIcons: Record<ToolCategory, typeof FileJson> = {
  json: FileJson,
  text: Type,
  image: Image,
  pdf: FileText,
  html: Code,
  seo: Search,
  cloudinary: Cloud,
  color: Palette,
  encoding: Lock,
  hash: Fingerprint,
  "qr-code": QrCode,
  "date-time": Clock,
  "unit-converter": Ruler,
};

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "all">("all");

  const filteredTools = useMemo(() => {
    let tools: Tool[] = [];

    if (selectedCategory === "all") {
      tools = allTools;
    } else {
      tools = getToolsByCategory(selectedCategory);
    }

    if (searchQuery.trim()) {
      tools = searchTools(searchQuery);
      // Also filter by category if one is selected
      if (selectedCategory !== "all") {
        tools = tools.filter((tool) => tool.category === selectedCategory);
      }
    }

    return tools;
  }, [searchQuery, selectedCategory]);

  const featuredTools = useMemo(() => {
    return allTools.slice(0, 6);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-accent/20 via-transparent to-primary/20 animate-pulse" style={{ filter: 'blur(100px)' }} />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Free Online Tools</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text mb-6 sm:mb-8 leading-[1.1] px-4">
              {totalToolCount}+ Free Tools
              <br className="hidden sm:block" />
              For Developers & Everyone
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground sm:mt-4 px-4">
              Access {totalToolCount}+ powerful, free online tools. Format JSON, convert text, resize images, 
              manipulate PDFs, validate HTML, optimize SEO, and much more. All tools work instantly in your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Ad after hero section */}
      <AdSenseDisplay format="horizontal" minHeight={100} className="py-4" />

      {/* Search Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-background border-b">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search tools... (e.g., JSON formatter, image resizer, PDF merger)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              aria-label="Search tools"
            />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-muted-foreground">
              Found {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="text-sm"
            >
              All Tools ({totalToolCount})
            </Button>
            {toolCategories.map((category) => {
              const Icon = categoryIcons[category.id];
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-sm flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name} ({category.toolCount})
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad after category navigation */}
      <AdSenseDisplay format="auto" minHeight={250} className="py-4" />

      {/* Additional ad placement */}
      <AdSenseDisplay format="horizontal" minHeight={100} className="py-4" />

      {/* Featured Tools */}
      {!searchQuery && selectedCategory === "all" && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredTools.map((tool) => {
                const Icon = categoryIcons[tool.category];
                return (
                  <Link key={tool.id} href={tool.route}>
                    <Card className="p-6 hover:shadow-lg transition-all duration-300 h-full cursor-pointer group">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {tool.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {tool.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Ad after featured tools */}
      {!searchQuery && selectedCategory === "all" && (
        <AdSenseDisplay format="auto" minHeight={250} className="py-4" />
      )}

      {/* All Tools Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {selectedCategory !== "all" && !searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {toolCategories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-muted-foreground">
                {toolCategories.find((c) => c.id === selectedCategory)?.description}
              </p>
            </div>
          )}
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No tools found. Try a different search term or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredTools.map((tool) => {
                const Icon = categoryIcons[tool.category];
                const categoryInfo = toolCategories.find((c) => c.id === tool.category);
                return (
                  <Link key={tool.id} href={tool.route}>
                    <Card className="p-5 hover:shadow-lg transition-all duration-300 h-full cursor-pointer group">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base mb-1 group-hover:text-accent transition-colors line-clamp-1">
                            {tool.name}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {categoryInfo?.name || tool.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {tool.description}
                      </p>
                      {tool.isClientSide && (
                        <Badge variant="secondary" className="text-xs">
                          Client-Side
                        </Badge>
                      )}
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Ad after tools grid */}
      <AdSenseDisplay format="auto" minHeight={250} className="py-4" />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Need a Tool That's Not Listed?
          </h2>
          <p className="text-muted-foreground mb-6">
            We're constantly adding new tools. Check back soon or contact us with suggestions.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

