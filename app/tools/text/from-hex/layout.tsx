import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("hex-to-text");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Text Tools",
  features: [
    "Convert hex to text",
    "Two-digit hex decoding",
    "Error handling",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What hex format is required?",
      answer: "Hexadecimal should be space-separated two-digit values (e.g., '48 65 6c 6c 6f'). Each two-digit hex value represents one character.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function HexToTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="hex-to-text-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="hex-to-text-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="hex-to-text-faq"
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








