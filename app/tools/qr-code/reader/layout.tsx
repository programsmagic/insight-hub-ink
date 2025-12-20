import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("qr-code-reader-standalone");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "QR Code Tools",
  features: [
    "Read QR codes from images",
    "Decode QR code content",
    "Support for multiple image formats",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "How do I use the QR code reader?",
      answer: "Upload an image containing a QR code, and the tool will automatically decode it and display the text or URL encoded in the QR code.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function QRCodeReaderStandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="qr-code-reader-standalone-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="qr-code-reader-standalone-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="qr-code-reader-standalone-faq"
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







