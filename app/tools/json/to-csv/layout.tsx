import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("json-to-csv");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "JSON Tools",
  features: [
    "Convert JSON arrays to CSV format",
    "Automatic header generation",
    "Handle nested JSON structures",
    "Export to Excel or Google Sheets",
  ],
  faqs: [
    {
      question: "What JSON format is required?",
      answer: "The JSON must be an array of objects. Each object represents a row, and object keys become CSV column headers.",
    },
    {
      question: "Can I convert nested JSON?",
      answer: "This tool handles flat JSON objects. Nested objects will be converted to strings in the CSV output.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function JSONToCSVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-to-csv-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="json-to-csv-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="json-to-csv-faq"
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



