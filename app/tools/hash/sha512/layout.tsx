import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("sha512-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Hash Tools",
  features: [
    "Generate SHA512 hash from text",
    "Real-time hash generation",
    "Client-side processing",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is SHA512?",
      answer: "SHA512 (Secure Hash Algorithm 512-bit) is a cryptographic hash function that produces a 512-bit hash value. It's the most secure option and is used in high-security applications.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function SHA512HashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="sha512-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="sha512-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="sha512-generator-faq"
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










