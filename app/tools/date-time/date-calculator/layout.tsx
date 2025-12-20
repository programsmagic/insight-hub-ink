import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("date-calculator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Date/Time Tools",
  features: [
    "Calculate date differences",
    "Add or subtract time from dates",
    "Support for days, hours, minutes, seconds",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "How do I calculate date differences?",
      answer: "Enter two dates and click 'Calculate Difference' to see the time difference in days, hours, minutes, and seconds.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function DateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="date-calculator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="date-calculator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="date-calculator-faq"
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







