import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Management Services - InsightHub.ink | Professional SMM Agency",
  description: "Transform your social media presence with our comprehensive SMM services. We offer content creation, community management, analytics, and growth strategies across Instagram, Facebook, Twitter, LinkedIn, YouTube, and TikTok. Trusted by 500+ businesses worldwide.",
  keywords: [
    "social media management",
    "SMM services",
    "social media marketing agency",
    "content creation",
    "community management",
    "Instagram management",
    "Facebook marketing",
    "LinkedIn management",
    "social media strategy",
    "SMM packages",
    "social media analytics"
  ],
  openGraph: {
    title: "Professional Social Media Management Services - InsightHub.ink",
    description: "Comprehensive social media management services to grow your brand, engage your audience, and drive measurable results. Starting at $499/month.",
    type: "website",
    url: "https://insighthub.ink/smm",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Social Media Management Services",
    description: "Transform your social media presence with our comprehensive SMM services. Trusted by 500+ businesses.",
  },
};

export default function SMMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}