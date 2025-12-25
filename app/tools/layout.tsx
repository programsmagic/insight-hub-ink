import { Metadata } from "next";

import { Metadata } from "next";
import { env } from "@/lib/env";

const siteUrl = env.getOptionalWithDefault("NEXT_PUBLIC_SITE_URL", "https://insighthub.ink");

export const metadata: Metadata = {
  title: "200+ Free Online Tools for Developers | JSON, Image, PDF, SEO Tools | InsightHub.ink",
  description: "Access 200+ free online tools: JSON formatter, image resizer, PDF merger, HTML validator, SEO tools, and more. All tools work instantly in your browser. No installation required.",
  keywords: [
    "free online tools",
    "developer tools",
    "JSON formatter",
    "image resizer",
    "PDF tools",
    "HTML validator",
    "SEO tools",
    "text converter",
    "productivity tools",
    "json tools",
    "text tools",
    "image tools",
    "pdf converter",
    "html tools",
    "seo generator",
    "cloudinary tools",
    "color picker",
    "hash generator",
    "qr code generator",
    "unit converter",
    "encoding tools",
    "best developer tools",
    "online JSON formatter",
    "free image resizer"
  ],
  alternates: {
    canonical: `${siteUrl}/tools`,
  },
  openGraph: {
    title: "200+ Free Online Tools for Developers | InsightHub.ink",
    description: "Access 200+ free online tools: JSON formatter, image resizer, PDF tools, SEO utilities, and more. All tools work instantly in your browser.",
    url: `${siteUrl}/tools`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "200+ Free Online Tools for Developers",
    description: "Access 200+ free online tools for developers. JSON, image, PDF, SEO tools and more. All work instantly in your browser.",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

