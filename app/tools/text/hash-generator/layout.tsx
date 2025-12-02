import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("text-hash-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Text Tools",
  features: [
    "Generate MD5, SHA1, SHA256, and SHA512 hashes",
    "Real-time hash generation as you type",
    "Client-side processing for maximum security",
    "Copy individual hashes or all at once",
    "Perfect for password hashing and data integrity",
  ],
  faqs: [
    {
      question: "What is a hash generator?",
      answer: "A hash generator creates a fixed-length string (hash) from any input text using cryptographic algorithms like MD5, SHA1, SHA256, or SHA512. Hashes are used for password storage, data integrity verification, and digital signatures.",
    },
    {
      question: "Which hash algorithm should I use?",
      answer: "For security purposes, use SHA256 or SHA512. MD5 and SHA1 are deprecated for security but still useful for checksums. SHA256 offers a good balance of security and performance, while SHA512 is the most secure option.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes! All hashing happens entirely in your browser using client-side JavaScript. Your text never leaves your device or is sent to any server, ensuring complete privacy and security.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function HashGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="hash-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="hash-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="hash-generator-faq"
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

