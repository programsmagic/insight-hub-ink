import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("url-encoder");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Encoding Tools",
  features: [
    "Encode text to URL format",
    "Decode URL-encoded strings",
    "Safe URL handling",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "Why encode URLs?",
      answer: "URL encoding ensures special characters are safely transmitted in URLs. Characters like spaces, ampersands, and other special symbols are converted to percent-encoded format.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function URLEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="url-encoder-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="url-encoder-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="url-encoder-faq"
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




