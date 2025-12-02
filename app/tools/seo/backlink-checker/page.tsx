"use client";

import { ToolLayout } from "@/components/tools/tool-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export default function BacklinkCheckerPage() {
  return (
    <ToolLayout
      title="Backlink Checker"
      description="Check backlinks for a URL to analyze link profile and SEO value"
      category="SEO Tools"
    >
      <div className="space-y-6">
        <Card className="p-12 text-center">
          <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            This tool requires server-side processing and external API access to check backlinks. 
            We're working on implementing this feature and it will be available soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/tools">
                Browse Other Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Card>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">What this tool will do:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check backlinks pointing to your URL</li>
            <li>Analyze link quality and authority</li>
            <li>Identify dofollow vs nofollow links</li>
            <li>Track referring domains</li>
            <li>Help monitor and improve link profile for SEO</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

