import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("json-tree-viewer");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "JSON Tools",
  features: [
    "Interactive JSON tree visualization",
    "Expand/collapse nodes",
    "Color-coded data types",
    "Easy navigation of complex structures",
  ],
  faqs: [
    {
      question: "What is a JSON tree viewer?",
      answer: "A JSON tree viewer displays JSON data in a visual tree structure, making it easy to navigate and understand complex nested data. You can expand and collapse nodes to explore the structure.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function JSONTreeViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-tree-viewer-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="json-tree-viewer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="json-tree-viewer-faq"
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










