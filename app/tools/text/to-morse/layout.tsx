import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("text-to-morse");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Text Tools",
  features: [
    "Convert text to Morse code",
    "Supports letters, numbers, and punctuation",
    "Educational and practical use",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is Morse code?",
      answer: "Morse code is a method of encoding text using dots (.) and dashes (-) to represent letters, numbers, and punctuation. It was historically used for telegraph communication.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function TextToMorseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="text-to-morse-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="text-to-morse-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="text-to-morse-faq"
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









