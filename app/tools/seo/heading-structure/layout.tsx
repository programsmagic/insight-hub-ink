import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("heading-structure-analyzer");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "SEO Tools",
  features: [
    "Analyze HTML heading structure",
    "Check for H1 tags",
    "Validate heading hierarchy",
    "SEO and accessibility insights",
  ],
  faqs: [
    {
      question: "Why is heading structure important?",
      answer: "Proper heading structure (H1-H6) helps search engines understand your content hierarchy and improves both SEO rankings and accessibility for screen readers.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function HeadingStructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="heading-structure-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="heading-structure-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="heading-structure-faq"
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









