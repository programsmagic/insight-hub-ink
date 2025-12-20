import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("html-formatter");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "HTML Tools",
  features: [
    "Format HTML with proper indentation",
    "Customizable indent level",
    "Beautify messy HTML code",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is HTML formatting?",
      answer: "HTML formatting adds proper indentation and line breaks to HTML code, making it more readable and easier to maintain.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function HTMLFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="html-formatter-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="html-formatter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="html-formatter-faq"
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








