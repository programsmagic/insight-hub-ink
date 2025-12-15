import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("lorem-ipsum-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Text Tools",
  features: [
    "Generate Lorem Ipsum placeholder text",
    "Customizable word count",
    "Classic Latin text",
    "Perfect for design and development",
  ],
  faqs: [
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is placeholder text commonly used in design and development to demonstrate the visual form of a document without relying on meaningful content.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function LoremIpsumGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="lorem-ipsum-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="lorem-ipsum-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="lorem-ipsum-generator-faq"
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





