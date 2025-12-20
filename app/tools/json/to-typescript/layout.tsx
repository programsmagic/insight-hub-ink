import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("json-to-typescript");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "JSON Tools",
  features: [
    "Generate TypeScript interfaces from JSON",
    "Automatic type inference",
    "Custom interface names",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "How does JSON to TypeScript work?",
      answer: "The tool analyzes your JSON structure and automatically generates TypeScript interfaces that match your data exactly, saving hours of manual typing.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function JSONToTypeScriptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-to-typescript-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="json-to-typescript-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="json-to-typescript-faq"
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







