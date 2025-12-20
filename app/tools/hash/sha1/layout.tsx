import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("sha1-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Hash Tools",
  features: [
    "Generate SHA1 hash from text",
    "Real-time hash generation",
    "Client-side processing",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is SHA1?",
      answer: "SHA1 (Secure Hash Algorithm 1) is a cryptographic hash function that produces a 160-bit hash value. It's deprecated for security purposes but still used in legacy systems.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function SHA1HashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="sha1-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="sha1-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="sha1-generator-faq"
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









