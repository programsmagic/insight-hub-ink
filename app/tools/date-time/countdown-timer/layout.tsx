import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("countdown-timer");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Date/Time Tools",
  features: [
    "Create countdown timers",
    "Real-time countdown display",
    "Days, hours, minutes, seconds",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "How do I use the countdown timer?",
      answer: "Enter a target date and time, then click 'Start Countdown' to begin. The timer will update every second showing the time remaining.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function CountdownTimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="countdown-timer-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="countdown-timer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="countdown-timer-faq"
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





