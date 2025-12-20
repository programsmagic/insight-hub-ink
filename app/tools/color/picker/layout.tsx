import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("color-picker");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Color Tools",
  features: [
    "Visual color picker",
    "Hex, RGB, and HSL formats",
    "Real-time color conversion",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What color formats are supported?",
      answer: "The tool supports hexadecimal (#RRGGBB), RGB (rgb(r, g, b)), and HSL (hsl(h, s%, l%)) color formats, which are standard in web development.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function ColorPickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="color-picker-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="color-picker-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="color-picker-faq"
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








