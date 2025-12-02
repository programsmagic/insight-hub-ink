import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Cookie Policy | InsightHub.ink",
  description: "Learn about how InsightHub.ink uses cookies and tracking technologies. Understand cookie types, purposes, and how to manage your cookie preferences.",
  keywords: [
    "cookie policy",
    "cookies",
    "tracking technologies",
    "privacy cookies",
    "cookie management",
    "cookie preferences",
    "InsightHub cookies",
  ],
  alternates: {
    canonical: "https://insighthub.ink/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | InsightHub.ink",
    description: "Learn about how InsightHub.ink uses cookies and tracking technologies. Understand cookie types, purposes, and management options.",
    url: "https://insighthub.ink/cookie-policy",
    siteName: "InsightHub.ink",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy | InsightHub.ink",
    description: "Learn about how InsightHub.ink uses cookies and tracking technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cookie Policy",
  description: "Cookie Policy for InsightHub.ink explaining how we use cookies and tracking technologies",
  url: "https://insighthub.ink/cookie-policy",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "InsightHub.ink",
    url: "https://insighthub.ink",
  },
  about: {
    "@type": "Thing",
    name: "Cookie Policy",
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="cookie-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema),
        }}
      />
      {children}
    </>
  );
}

