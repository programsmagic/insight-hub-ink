import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Privacy Policy | InsightHub.ink",
  description: "Learn how InsightHub.ink collects, uses, and protects your personal information. Our comprehensive privacy policy covers data collection, usage, security, and your rights.",
  keywords: [
    "privacy policy",
    "data protection",
    "privacy rights",
    "data security",
    "personal information",
    "GDPR compliance",
    "CCPA compliance",
    "InsightHub privacy",
  ],
  alternates: {
    canonical: "https://insighthub.ink/privacy",
  },
  openGraph: {
    title: "Privacy Policy | InsightHub.ink",
    description: "Learn how InsightHub.ink collects, uses, and protects your personal information. Comprehensive privacy policy covering data collection, usage, security, and your rights.",
    url: "https://insighthub.ink/privacy",
    siteName: "InsightHub.ink",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | InsightHub.ink",
    description: "Learn how InsightHub.ink collects, uses, and protects your personal information.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  description: "Privacy Policy for InsightHub.ink explaining how we collect, use, and protect your personal information",
  url: "https://insighthub.ink/privacy",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "InsightHub.ink",
    url: "https://insighthub.ink",
  },
  about: {
    "@type": "Thing",
    name: "Privacy Policy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="privacy-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema),
        }}
      />
      {children}
    </>
  );
}

