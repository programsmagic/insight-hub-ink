import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Disclaimer | InsightHub.ink",
  description: "Read InsightHub.ink's disclaimer covering service accuracy, third-party content, SMM services, financial advice, tools, and limitation of liability.",
  keywords: [
    "disclaimer",
    "legal disclaimer",
    "service disclaimer",
    "liability disclaimer",
    "InsightHub disclaimer",
    "terms disclaimer",
  ],
  alternates: {
    canonical: "https://insighthub.ink/disclaimer",
  },
  openGraph: {
    title: "Disclaimer | InsightHub.ink",
    description: "Read InsightHub.ink's disclaimer covering service accuracy, third-party content, SMM services, and limitation of liability.",
    url: "https://insighthub.ink/disclaimer",
    siteName: "InsightHub.ink",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Disclaimer | InsightHub.ink",
    description: "Read InsightHub.ink's disclaimer covering service accuracy and limitation of liability.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Disclaimer",
  description: "Disclaimer for InsightHub.ink covering service accuracy, third-party content, and limitation of liability",
  url: "https://insighthub.ink/disclaimer",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "InsightHub.ink",
    url: "https://insighthub.ink",
  },
  about: {
    "@type": "Thing",
    name: "Disclaimer",
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="disclaimer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema),
        }}
      />
      {children}
    </>
  );
}

