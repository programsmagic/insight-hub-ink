import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("robots-txt-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "SEO Tools",
  features: [
    "Generate robots.txt file",
    "Control search engine crawlers",
    "Allow/disallow paths",
    "Sitemap and crawl delay settings",
  ],
  faqs: [
    {
      question: "What is robots.txt?",
      answer: "robots.txt is a file that tells search engine crawlers which pages or sections of your website they can or cannot access. It's placed in your website's root directory.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function RobotsTxtGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="robots-txt-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="robots-txt-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="robots-txt-generator-faq"
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




