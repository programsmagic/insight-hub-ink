import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("md5-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Hash Tools",
  features: [
    "Generate MD5 hash from text",
    "Real-time hash generation",
    "Client-side processing",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is MD5?",
      answer: "MD5 (Message Digest Algorithm 5) is a cryptographic hash function that produces a 128-bit hash value. It's fast but not secure for cryptographic purposes.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function MD5HashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="md5-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="md5-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="md5-generator-faq"
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

