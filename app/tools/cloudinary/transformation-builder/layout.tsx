import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("cloudinary-transformation-builder");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Cloudinary Tools",
  features: [
    "Build Cloudinary transformation URLs",
    "Visual parameter selection",
    "Width, height, crop, quality, format",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "What is a Cloudinary transformation builder?",
      answer: "A Cloudinary transformation builder helps you create URLs with transformation parameters for resizing, cropping, quality adjustment, and format conversion of images stored in Cloudinary.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function TransformationBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="cloudinary-transformation-builder-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="cloudinary-transformation-builder-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="cloudinary-transformation-builder-faq"
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

