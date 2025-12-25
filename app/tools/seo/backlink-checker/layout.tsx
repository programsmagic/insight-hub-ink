import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("backlink-checker");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "SEO Tools",
  features: [
    "Check backlinks for URLs",
    "Analyze link quality",
    "Track referring domains",
    "SEO link profile analysis",
  ],
  faqs: [
    {
      question: "What are backlinks?",
      answer: "Backlinks are links from other websites pointing to your site. They're important for SEO as search engines use them as a ranking signal. Quality backlinks from authoritative sites can significantly improve your search rankings.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function BacklinkCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="backlink-checker-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="backlink-checker-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="backlink-checker-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(metadataConfig.faqSchema),
          }}
        />
      )}
      {children}
    </>
  );
}










