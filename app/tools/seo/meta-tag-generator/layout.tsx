import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("meta-tag-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "SEO Tools",
  features: [
    "Generate comprehensive meta tags",
    "Open Graph tags for social media",
    "Twitter Card metadata",
    "SEO best practices built-in",
    "Copy and download ready-to-use HTML",
  ],
  faqs: [
    {
      question: "What are meta tags?",
      answer: "Meta tags are HTML elements that provide metadata about a webpage. They help search engines understand your content and control how your site appears in search results and when shared on social media platforms.",
    },
    {
      question: "Why do I need meta tags?",
      answer: "Meta tags improve your website's SEO, help search engines index your content correctly, and make your links look better when shared on social media. They're essential for online visibility and click-through rates.",
    },
    {
      question: "What's the ideal meta description length?",
      answer: "Meta descriptions should be 150-160 characters for optimal display in search results. This tool includes character counters and best practice guidelines to help you create effective meta tags.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function MetaTagGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="meta-tag-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="meta-tag-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="meta-tag-generator-faq"
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

