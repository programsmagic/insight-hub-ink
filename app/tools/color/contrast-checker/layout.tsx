import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("color-contrast-checker");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Color Tools",
  features: [
    "Check color contrast ratios",
    "WCAG compliance checking",
    "Accessibility standards",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is color contrast?",
      answer: "Color contrast measures the difference in brightness between foreground and background colors. WCAG guidelines require minimum contrast ratios to ensure text is readable for people with visual impairments.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function ColorContrastCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="color-contrast-checker-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="color-contrast-checker-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="color-contrast-checker-faq"
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











