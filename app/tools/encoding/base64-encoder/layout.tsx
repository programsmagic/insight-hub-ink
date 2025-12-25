import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("base64-encoder");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Encoding Tools",
  features: [
    "Encode text to Base64",
    "Decode Base64 to text",
    "Safe data encoding",
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

export default function Base64EncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="base64-encoder-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="base64-encoder-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="base64-encoder-faq"
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










