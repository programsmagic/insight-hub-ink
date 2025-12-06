import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("json-diff");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "JSON Tools",
  features: [
    "Compare two JSON objects",
    "Highlight differences",
    "Show added, removed, and modified fields",
    "Side-by-side comparison",
  ],
  faqs: [
    {
      question: "How does JSON diff work?",
      answer: "The tool compares two JSON objects and identifies fields that were added, removed, or modified, making it easy to track changes between different versions of JSON data.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function JSONDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-diff-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="json-diff-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="json-diff-faq"
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



