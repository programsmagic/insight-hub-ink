import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("html-entity-encoder");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Encoding Tools",
  features: [
    "Encode special characters to HTML entities",
    "Decode HTML entities to text",
    "Prevent XSS attacks",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "Why encode HTML entities?",
      answer: "Encoding HTML entities ensures special characters like <, >, &, and quotes are displayed correctly in HTML and helps prevent XSS (Cross-Site Scripting) attacks.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function HTMLEntityEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="html-entity-encoder-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="html-entity-encoder-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="html-entity-encoder-faq"
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








