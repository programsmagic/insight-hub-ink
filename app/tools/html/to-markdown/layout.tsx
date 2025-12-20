import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("html-to-markdown");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "HTML Tools",
  features: [
    "Convert HTML to Markdown",
    "Preserve formatting and structure",
    "Clean Markdown output",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What HTML elements are converted?",
      answer: "The tool converts common HTML elements like headings, paragraphs, links, lists, and more to their Markdown equivalents.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function HTMLToMarkdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="html-to-markdown-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="html-to-markdown-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="html-to-markdown-faq"
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








