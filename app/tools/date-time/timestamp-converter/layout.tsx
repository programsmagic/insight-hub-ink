import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("timestamp-converter");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Date/Time Tools",
  features: [
    "Convert Unix timestamps to dates",
    "Convert dates to Unix timestamps",
    "ISO date format support",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is a Unix timestamp?",
      answer: "A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (Unix epoch). It's commonly used in programming and databases.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function TimestampConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="timestamp-converter-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="timestamp-converter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="timestamp-converter-faq"
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











