import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy SMM Services - Views, Subscribers, Likes, Comments, Watch Hours | InsightHub.ink",
  description: "Buy premium-quality social media services: YouTube views, subscribers, watch hours, Instagram likes and followers, TikTok views, Facebook likes. Instant delivery, premium quality, 100% satisfaction guaranteed. Visit smm.insighthub.ink to purchase. Trusted by 500+ clients worldwide.",
  keywords: [
    "buy youtube views",
    "buy youtube subscribers",
    "buy youtube watch hours",
    "buy instagram followers",
    "buy instagram likes",
    "buy tiktok views",
    "buy facebook likes",
    "buy social media services",
    "SMM services",
    "SMM panel",
    "premium SMM",
    "instant delivery SMM",
    "buy social media engagement",
    "social media growth services",
    "best SMM panel",
    "reliable SMM services",
    "buy twitter followers",
    "buy linkedin followers"
  ],
  alternates: {
    canonical: "https://insighthub.ink/smm",
  },
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