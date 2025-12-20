import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("json-validator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "JSON Tools",
  features: [
    "Validate JSON syntax instantly",
    "Identify syntax errors and issues",
    "Check for missing commas and brackets",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is a JSON validator?",
      answer: "A JSON validator checks if your JSON code has correct syntax. It identifies errors like missing commas, unclosed brackets, invalid characters, and other common JSON issues.",
    },
    {
      question: "How do I validate JSON?",
      answer: "Simply paste your JSON code into the input field and click 'Validate'. The tool will instantly check for syntax errors and display any issues found.",
    },
    {
      question: "Is this JSON validator free?",
      answer: "Yes, this JSON validator is completely free to use. All validation happens in your browser, so your data never leaves your device.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function JSONValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-validator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="json-validator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="json-validator-faq"
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









