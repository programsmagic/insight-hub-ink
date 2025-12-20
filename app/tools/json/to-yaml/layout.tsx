import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("json-to-yaml");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "JSON Tools",
  features: [
    "Convert JSON to YAML format",
    "Customizable indentation",
    "Human-readable output",
    "Perfect for configuration files",
  ],
  faqs: [
    {
      question: "What is YAML?",
      answer: "YAML (YAML Ain't Markup Language) is a human-readable data serialization format commonly used for configuration files, Docker Compose, Kubernetes, and CI/CD pipelines.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function JSONToYAMLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-to-yaml-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="json-to-yaml-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="json-to-yaml-faq"
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









