import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "DMCA Policy | InsightHub.ink",
  description: "Read InsightHub.ink's DMCA policy covering copyright infringement reporting, takedown notices, counter-notifications, and designated agent information.",
  keywords: [
    "DMCA policy",
    "DMCA",
    "copyright infringement",
    "takedown notice",
    "DMCA takedown",
    "copyright policy",
    "InsightHub DMCA",
  ],
  alternates: {
    canonical: "https://insighthub.ink/dmca",
  },
  openGraph: {
    title: "DMCA Policy | InsightHub.ink",
    description: "Read InsightHub.ink's DMCA policy covering copyright infringement reporting, takedown notices, and counter-notifications.",
    url: "https://insighthub.ink/dmca",
    siteName: "InsightHub.ink",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DMCA Policy | InsightHub.ink",
    description: "Read InsightHub.ink's DMCA policy covering copyright infringement reporting and takedown notices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "DMCA Policy",
  description: "DMCA Policy for InsightHub.ink covering copyright infringement reporting and takedown procedures",
  url: "https://insighthub.ink/dmca",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "InsightHub.ink",
    url: "https://insighthub.ink",
  },
  about: {
    "@type": "Thing",
    name: "DMCA Policy",
  },
};

export default function DMCALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="dmca-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema),
        }}
      />
      {children}
    </>
  );
}

