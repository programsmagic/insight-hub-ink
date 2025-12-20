import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("qr-code-generator-standalone");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "QR Code Tools",
  features: [
    "Generate QR codes from text or URLs",
    "Customizable size and error correction",
    "Download as PNG or SVG",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is a QR code?",
      answer: "A QR code (Quick Response code) is a two-dimensional barcode that can be scanned by smartphones to quickly access URLs, text, contact information, or other data.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function QRCodeGeneratorStandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="qr-code-generator-standalone-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="qr-code-generator-standalone-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="qr-code-generator-standalone-faq"
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








