import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("readability-score");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "SEO Tools",
  features: [
    "Calculate readability scores",
    "Flesch-Kincaid, SMOG, and ARI",
    "Text complexity analysis",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What are readability scores?",
      answer: "Readability scores measure how easy or difficult your text is to read. They help you optimize content for your target audience and improve SEO by making content more accessible.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function ReadabilityScoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="readability-score-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="readability-score-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="readability-score-faq"
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











