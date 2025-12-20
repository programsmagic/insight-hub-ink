import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("color-converter");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Color Tools",
  features: [
    "Convert between HEX, RGB, and HSL",
    "Bidirectional conversion",
    "Color preview",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What color formats can I convert?",
      answer: "You can convert between hexadecimal (#RRGGBB), RGB (rgb(r, g, b)), and HSL (hsl(h, s%, l%)) color formats in any direction.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function ColorConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="color-converter-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="color-converter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="color-converter-faq"
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









