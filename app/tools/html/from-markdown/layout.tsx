import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("markdown-to-html");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "HTML Tools",
  features: [
    "Convert Markdown to HTML",
    "Support for common Markdown syntax",
    "Clean HTML output",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What Markdown features are supported?",
      answer: "The tool supports headers, bold, italic, links, images, code blocks, and lists. More advanced features may require additional processing.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function MarkdownToHTMLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="markdown-to-html-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="markdown-to-html-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="markdown-to-html-faq"
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








