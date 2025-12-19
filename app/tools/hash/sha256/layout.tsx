import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("sha256-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Hash Tools",
  features: [
    "Generate SHA256 hash from text",
    "Real-time hash generation",
    "Client-side processing",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is SHA256?",
      answer: "SHA256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a 256-bit hash value. It's recommended for most security applications and offers a good balance of security and performance.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function SHA256HashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="sha256-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="sha256-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="sha256-generator-faq"
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






