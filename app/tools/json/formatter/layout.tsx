import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("json-formatter");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "JSON Tools",
  features: [
    "Format JSON with customizable indentation",
    "Minify JSON to reduce file size",
    "Validate JSON syntax",
    "Copy and download formatted results",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is a JSON formatter?",
      answer: "A JSON formatter is a tool that takes minified or messy JSON code and formats it with proper indentation and line breaks, making it readable and easier to work with. This tool also validates JSON syntax and can minify JSON for production use.",
    },
    {
      question: "How do I format JSON?",
      answer: "Simply paste your JSON code into the input field and click 'Format JSON'. The tool will automatically add proper indentation and formatting. You can choose between 2, 4, or 8 space indentation levels.",
    },
    {
      question: "Is this JSON formatter free?",
      answer: "Yes, this JSON formatter is completely free to use. All processing happens in your browser, so your data never leaves your device. No registration or payment required.",
    },
    {
      question: "Can I minify JSON with this tool?",
      answer: "Yes! Click the 'Minify JSON' button to remove all whitespace and compress your JSON. This is useful for reducing file size in production environments or API responses.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function JSONFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-formatter-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="json-formatter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="json-formatter-faq"
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

