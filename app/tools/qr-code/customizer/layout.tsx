import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("qr-code-customizer");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "QR Code Tools",
  features: [
    "Generate customized QR codes",
    "Custom colors for dark and light areas",
    "Adjustable size and error correction",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "Can I customize QR code colors?",
      answer: "Yes! You can customize both the dark (foreground) and light (background) colors of your QR code using the color pickers or by entering hex color codes.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function QRCodeCustomizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="qr-code-customizer-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="qr-code-customizer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="qr-code-customizer-faq"
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


