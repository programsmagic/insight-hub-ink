import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("twitter-card-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "SEO Tools",
  features: [
    "Generate Twitter Card meta tags",
    "Summary and large image cards",
    "Rich Twitter previews",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What are Twitter Cards?",
      answer: "Twitter Cards are meta tags that enable rich previews when your content is shared on Twitter, including images, titles, and descriptions for better engagement.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function TwitterCardGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="twitter-card-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="twitter-card-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="twitter-card-generator-faq"
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








