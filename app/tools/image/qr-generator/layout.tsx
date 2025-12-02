import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("qr-code-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Image Tools",
  features: [
    "Generate QR codes from text or URLs",
    "Customizable size (100-1000 pixels)",
    "Adjustable error correction levels",
    "Download as PNG or SVG",
    "Perfect for marketing and sharing",
  ],
  faqs: [
    {
      question: "What is a QR code generator?",
      answer: "A QR code generator creates Quick Response (QR) codes that can be scanned by smartphones to quickly access URLs, text, contact information, or other data. QR codes are widely used in marketing, business cards, and digital sharing.",
    },
    {
      question: "How do I use a QR code?",
      answer: "Generate your QR code by entering text or a URL, customize the size and error correction level, then download the image. Print it or share it digitally - anyone can scan it with their phone's camera to access the encoded information.",
    },
    {
      question: "What error correction level should I choose?",
      answer: "Higher error correction (H) allows the QR code to work even if partially damaged, but creates a larger code. For most uses, Medium (M) is recommended. Use High (H) for printed materials that might get damaged.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function QRCodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="qr-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="qr-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="qr-generator-faq"
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

