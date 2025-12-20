import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("text-to-base64");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Text Tools",
  features: [
    "Encode text to Base64",
    "Safe data encoding",
    "Common encoding format",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is Base64 encoding?",
      answer: "Base64 is an encoding scheme that converts binary data into ASCII text format, making it safe for transmission over text-based protocols like email or URLs.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function TextToBase64Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="text-to-base64-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="text-to-base64-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="text-to-base64-faq"
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








