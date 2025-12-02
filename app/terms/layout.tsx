import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Terms of Service | InsightHub.ink",
  description: "Read InsightHub.ink's Terms of Service covering account registration, payment terms, user obligations, intellectual property, liability limitations, and dispute resolution.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "user agreement",
    "service terms",
    "legal terms",
    "InsightHub terms",
    "terms of use",
  ],
  alternates: {
    canonical: "https://insighthub.ink/terms",
  },
  openGraph: {
    title: "Terms of Service | InsightHub.ink",
    description: "Read InsightHub.ink's Terms of Service covering account registration, payment terms, user obligations, intellectual property, and liability limitations.",
    url: "https://insighthub.ink/terms",
    siteName: "InsightHub.ink",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | InsightHub.ink",
    description: "Read InsightHub.ink's Terms of Service covering account registration, payment terms, and user obligations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  description: "Terms of Service for InsightHub.ink covering account registration, payment terms, user obligations, and legal terms",
  url: "https://insighthub.ink/terms",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "InsightHub.ink",
    url: "https://insighthub.ink",
  },
  about: {
    "@type": "Thing",
    name: "Terms of Service",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="terms-of-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema),
        }}
      />
      {children}
    </>
  );
}

