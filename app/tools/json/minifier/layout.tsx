import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("json-minifier");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "JSON Tools",
  features: [
    "Minify JSON to reduce file size",
    "Remove all whitespace and formatting",
    "Optimize for production use",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is JSON minification?",
      answer: "JSON minification removes all unnecessary whitespace, line breaks, and formatting from JSON code to reduce file size. This is useful for production environments where smaller file sizes improve performance.",
    },
    {
      question: "Why should I minify JSON?",
      answer: "Minified JSON reduces file size, which means faster API responses, reduced bandwidth usage, and improved performance for web applications and mobile apps.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function JSONMinifierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-minifier-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="json-minifier-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="json-minifier-faq"
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







