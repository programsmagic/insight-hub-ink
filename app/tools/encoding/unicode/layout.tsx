import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("unicode-encoder");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Encoding Tools",
  features: [
    "Encode text to Unicode",
    "Decode Unicode to text",
    "International character support",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is Unicode encoding?",
      answer: "Unicode encoding represents characters using escape sequences (\\uXXXX), allowing you to handle international characters, emojis, and special symbols in code.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function UnicodeEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="unicode-encoder-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="unicode-encoder-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="unicode-encoder-faq"
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






