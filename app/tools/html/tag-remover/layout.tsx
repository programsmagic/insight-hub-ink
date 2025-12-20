import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("html-tag-remover");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "HTML Tools",
  features: [
    "Remove all HTML tags",
    "Extract plain text content",
    "Clean text output",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What happens to the content inside tags?",
      answer: "The tool removes all HTML tags but preserves the text content inside them, giving you clean plain text.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function HTMLTagRemoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="html-tag-remover-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="html-tag-remover-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="html-tag-remover-faq"
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








