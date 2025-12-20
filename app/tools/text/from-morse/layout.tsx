import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("morse-to-text");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Text Tools",
  features: [
    "Decode Morse code to text",
    "Supports standard Morse code patterns",
    "Error handling",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What Morse code format is required?",
      answer: "Morse code should be space-separated patterns of dots (.) and dashes (-). Each pattern represents one character.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function MorseToTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="morse-to-text-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="morse-to-text-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="morse-to-text-faq"
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








