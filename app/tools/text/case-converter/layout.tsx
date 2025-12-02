import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("text-case-converter");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Text Tools",
  features: [
    "Convert between 8 different case types",
    "Real-time conversion as you type",
    "Support for uppercase, lowercase, title, sentence, camel, kebab, snake, and pascal case",
    "Copy and download converted text",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is a text case converter?",
      answer: "A text case converter is a tool that transforms text between different capitalization styles like uppercase, lowercase, camelCase, kebab-case, and more. This is essential for developers working with code, variable names, or API endpoints.",
    },
    {
      question: "What case types are supported?",
      answer: "This tool supports 8 case types: UPPER CASE, lower case, Title Case, Sentence case, camelCase, PascalCase, kebab-case, and snake_case. Each has specific use cases in programming and writing.",
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, this text case converter is completely free. All conversion happens instantly in your browser with no data sent to servers. No registration required.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function TextCaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="text-case-converter-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="text-case-converter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="text-case-converter-faq"
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

