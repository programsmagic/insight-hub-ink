import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Tools - 100+ Developer & Productivity Tools | InsightHub.ink",
  description: "Access 100+ free online tools: JSON formatter, text converter, image resizer, PDF tools, HTML validator, SEO tools, and more. All tools are free to use and work instantly in your browser.",
  keywords: [
    "online tools",
    "free tools",
    "json formatter",
    "text converter",
    "image resizer",
    "pdf tools",
    "html validator",
    "seo tools",
    "developer tools",
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
  ],
  alternates: {
    canonical: "https://insighthub.ink/tools",
  },
  openGraph: {
    title: "Free Online Tools - 100+ Developer & Productivity Tools | InsightHub.ink",
    description: "Access 100+ free online tools: JSON formatter, text converter, image resizer, PDF tools, HTML validator, SEO tools, and more.",
    url: "https://insighthub.ink/tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools - 100+ Developer & Productivity Tools",
    description: "Access 100+ free online tools for developers and productivity. All tools work instantly in your browser.",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

