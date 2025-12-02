import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("cloudinary-text-overlay");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Cloudinary Tools",
  features: ["Add text overlays","Customizable text","Multiple fonts","Professional"],
  faqs: [
    {
      question: "When will this tool be available?",
      answer: "We're working on implementing server-side processing with Cloudinary integration. This tool will be available soon.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function CloudinaryTextOverlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="cloudinary-text-overlay-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="cloudinary-text-overlay-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="cloudinary-text-overlay-faq"
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
