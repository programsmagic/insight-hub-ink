import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("speed-converter");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Unit Converter Tools",
  features: [
    "Convert between speed units",
    "Common speed measurements",
    "Accurate conversions",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What speed units are supported?",
      answer: "The converter supports meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), feet per second (ft/s), and knots.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function SpeedConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="speed-converter-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="speed-converter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="speed-converter-faq"
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









