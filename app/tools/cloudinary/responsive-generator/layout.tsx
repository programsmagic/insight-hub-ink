import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("cloudinary-responsive-generator");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Cloudinary Tools",
  features: [
    "Generate responsive image URLs",
    "Create srcset attributes",
    "Multiple width support",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is a responsive image generator?",
      answer: "A responsive image generator creates HTML code with srcset attributes that allow browsers to choose the appropriate image size based on the device's screen size, improving performance and user experience.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function ResponsiveGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="cloudinary-responsive-generator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="cloudinary-responsive-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="cloudinary-responsive-generator-faq"
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








