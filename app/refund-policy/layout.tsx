import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Refund Policy | InsightHub.ink",
  description: "Learn about InsightHub.ink's refund policy including eligibility criteria, refund request process, processing timeframes, and refund methods for our services.",
  keywords: [
    "refund policy",
    "refund request",
    "money back guarantee",
    "refund process",
    "refund terms",
    "InsightHub refund",
    "refund eligibility",
  ],
  alternates: {
    canonical: "https://insighthub.ink/refund-policy",
  },
  openGraph: {
    title: "Refund Policy | InsightHub.ink",
    description: "Learn about InsightHub.ink's refund policy including eligibility criteria, refund request process, and processing timeframes.",
    url: "https://insighthub.ink/refund-policy",
    siteName: "InsightHub.ink",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Refund Policy | InsightHub.ink",
    description: "Learn about InsightHub.ink's refund policy and refund request process.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Refund Policy",
  description: "Refund Policy for InsightHub.ink outlining refund eligibility, request process, and terms",
  url: "https://insighthub.ink/refund-policy",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "InsightHub.ink",
    url: "https://insighthub.ink",
  },
  about: {
    "@type": "Thing",
    name: "Refund Policy",
  },
};

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="refund-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema),
        }}
      />
      {children}
    </>
  );
}

