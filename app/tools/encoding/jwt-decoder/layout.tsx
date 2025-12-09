import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("jwt-decoder");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Encoding Tools",
  features: [
    "Decode JWT tokens",
    "View header and payload",
    "JSON formatted output",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is a JWT token?",
      answer: "JWT (JSON Web Token) is a compact, URL-safe token format used for authentication and information exchange. It consists of three parts: header, payload, and signature.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function JWTDecoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="jwt-decoder-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="jwt-decoder-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="jwt-decoder-faq"
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




