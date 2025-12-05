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
    <article className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </li>
            <li>
              <Link href="/tools" className="hover:text-foreground transition-colors">
                Tools
              </Link>
            </li>
            {categoryUrl && (
              <>
                <li>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </li>
                <li>
                  <Link href={categoryUrl} className="hover:text-foreground transition-colors capitalize">
                    {category}
                  </Link>
                </li>
              </>
            )}
            <li>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </li>
            <li className="text-foreground font-medium" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <Link href={backUrl}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground text-lg mb-2">{description}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <span className="text-sm font-medium capitalize">{category}</span>
          </div>
        </header>

        {/* Ad after header, before tool content */}
        <AdSenseDisplay format="horizontal" minHeight={100} className="mb-6" />

        {/* Tool Content */}
        <section>
          <Card className="p-6">{children}</Card>
        </section>

        {/* Rich Content Section */}
        {content && <ToolContentSection {...content} />}

        {/* Ad after tool content */}
        <AdSenseDisplay format="auto" minHeight={250} className="mt-6" />
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
    <Button onClick={handleCopy} variant="outline" size="sm">
      <Copy className="w-4 h-4 mr-2" />
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
    <Button onClick={handleDownload} variant="outline" size="sm">
      <Download className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}

