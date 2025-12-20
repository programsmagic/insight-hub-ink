import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("html-link-extractor");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "HTML Tools",
  features: [
    "Extract all links from HTML",
    "Find href attributes",
    "Copy or download results",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What links are extracted?",
      answer: "The tool extracts all href attributes from anchor tags (<a>) in your HTML, giving you a list of all URLs.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function HTMLLinkExtractorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="html-link-extractor-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="html-link-extractor-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="html-link-extractor-faq"
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








