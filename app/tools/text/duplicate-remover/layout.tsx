import { Metadata } from "next";
import { generateToolMetadataComplete } from "@/lib/tools/metadata-generator";
import { getToolById } from "@/app/tools/data";
import Script from "next/script";

const tool = getToolById("text-duplicate-remover");
if (!tool) throw new Error("Tool not found");

const metadataConfig = generateToolMetadataComplete({
  tool,
  categoryName: "Text Tools",
  features: [
    "Remove duplicate lines",
    "Remove duplicate words",
    "Clean and organize text",
    "Works entirely in your browser",
  ],
  faqs: [
    {
      question: "How does duplicate removal work?",
      answer: "The tool can remove duplicate lines (keeping only unique lines) or duplicate words (keeping only unique words) from your text, helping you clean and organize your content.",
    },
  ],
});

export const metadata: Metadata = metadataConfig.metadata;

export default function TextDuplicateRemoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="text-duplicate-remover-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.softwareApplicationSchema),
        }}
      />
      <Script
        id="text-duplicate-remover-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadataConfig.breadcrumbSchema),
        }}
      />
      {metadataConfig.faqSchema && (
        <Script
          id="text-duplicate-remover-faq"
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








