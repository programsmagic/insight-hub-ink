import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("text-to-hex");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Text Tools",
  features: [
    "Convert text to hexadecimal",
    "Character-by-character conversion",
    "Common encoding format",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is hexadecimal encoding?",
      answer: "Hexadecimal (hex) is a base-16 numbering system that represents each character as a two-digit hex value, commonly used in programming and data representation.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function TextToHexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="text-to-hex-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="text-to-hex-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="text-to-hex-faq"
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










