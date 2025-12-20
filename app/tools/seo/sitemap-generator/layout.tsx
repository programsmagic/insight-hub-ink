import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("sitemap-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "SEO Tools",
  features: [
    "Generate XML sitemaps",
    "Multiple URLs support",
    "Change frequency and priority settings",
    "Search engine optimization",
  ],
  faqs: [
    {
      question: "What is a sitemap?",
      answer: "A sitemap is an XML file that lists all pages on your website, helping search engines discover and index your content more efficiently.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function SitemapGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="sitemap-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="sitemap-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="sitemap-generator-faq"
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









