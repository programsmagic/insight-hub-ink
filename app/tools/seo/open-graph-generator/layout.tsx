import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("open-graph-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "SEO Tools",
  features: [
    "Generate Open Graph meta tags",
    "Social media optimization",
    "Rich preview cards",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What are Open Graph tags?",
      answer: "Open Graph tags are meta tags that control how your content appears when shared on social media platforms like Facebook, LinkedIn, and Twitter. They enable rich previews with images and descriptions.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function OpenGraphGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="open-graph-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="open-graph-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="open-graph-generator-faq"
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




