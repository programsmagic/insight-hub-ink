"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Copy, Download, Home, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AdSenseDisplay } from "@/components/ads";
import { ToolContentSection } from "./tool-content-section";

interface ToolContentData {
  aboutText?: string;
  useCases?: string[];
  examples?: Array<{ input: string; output: string; description?: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  relatedTools?: Array<{ id: string; name: string; route: string }>;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  backUrl?: string;
  categoryUrl?: string;
  content?: ToolContentData;
}

export function ToolLayout({
  title,
  description,
  category,
  children,
  backUrl = "/tools",
  categoryUrl,
  content,
}: ToolLayoutProps) {
  return (
    <article className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1.5 group">
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" aria-hidden="true" />
            </li>
            <li>
              <Link href="/tools" className="hover:text-foreground transition-colors font-medium">
                Tools
              </Link>
            </li>
            {categoryUrl && (
              <>
                <li>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50" aria-hidden="true" />
                </li>
                <li>
                  <Link href={categoryUrl} className="hover:text-foreground transition-colors capitalize font-medium">
                    {category}
                  </Link>
                </li>
              </>
            )}
            <li>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" aria-hidden="true" />
            </li>
            <li className="text-foreground font-semibold" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8 animate-slide-up">
          <Link href={backUrl}>
            <Button variant="ghost" size="sm" className="mb-6 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Tools
            </Button>
          </Link>
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-3xl">
              {description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm text-muted-foreground">Category:</span>
              <span className="text-sm font-semibold capitalize px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                {category}
              </span>
            </div>
          </div>
        </header>

        {/* Ad after header, before tool content */}
        <div className="mb-8">
          <AdSenseDisplay format="horizontal" minHeight={100} />
        </div>

        {/* Tool Content */}
        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="p-6 sm:p-8 shadow-elevation-lg border-accent/10">
            {children}
          </Card>
        </section>

        {/* Mid-content ad for tool pages */}
        <div className="my-8">
          <AdSenseDisplay format="auto" minHeight={250} />
        </div>

        {/* Rich Content Section */}
        {content && (
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <ToolContentSection {...content} />
          </div>
        )}

        {/* Ad after tool content */}
        <div className="mt-8">
          <AdSenseDisplay format="auto" minHeight={250} />
        </div>
      </div>
    </article>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button 
      onClick={handleCopy} 
      variant={copied ? "default" : "outline"} 
      size="sm"
      className="transition-all duration-200"
    >
      <Copy className={`w-4 h-4 mr-2 transition-transform ${copied ? 'scale-110' : ''}`} />
      {copied ? "Copied!" : label}
    </Button>
  );
}

export function DownloadButton({
  content,
  filename,
  label = "Download",
}: {
  content: string;
  filename: string;
  label?: string;
}) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Download started!");
  };

  return (
    <Button onClick={handleDownload} variant="outline" size="sm" className="transition-all duration-200">
      <Download className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}

