/**
 * Metadata generation utility for SEO and AI search optimization
 */

import { Tool } from "@/lib/types/tools";
import { SoftwareApplication, FAQPage, BreadcrumbList } from "@/lib/types/schema";
import { Metadata } from "next";

const BASE_URL = "https://insighthub.ink";

export interface ToolMetadataOptions {
  tool: Tool;
  categoryName: string;
  faqs?: Array<{ question: string; answer: string }>;
  features?: string[];
}

/**
 * Generate Next.js Metadata for a tool page
 */
export function generateToolMetadata(options: ToolMetadataOptions): Metadata {
  const { tool, categoryName } = options;
  const title = `${tool.name} - Free Online ${categoryName} Tool | InsightHub.ink`;
  const description = tool.description.length > 160 
    ? tool.description.substring(0, 157) + "..."
    : tool.description;

  const canonicalUrl = `${BASE_URL}${tool.route}`;
  const keywords = [
    ...tool.keywords,
    tool.name.toLowerCase(),
    `${tool.name.toLowerCase()} tool`,
    `free ${tool.name.toLowerCase()}`,
    `online ${tool.name.toLowerCase()}`,
    categoryName.toLowerCase(),
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.name} - Free Online Tool`,
      description: tool.description,
      url: canonicalUrl,
      siteName: "InsightHub.ink",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-tool-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${tool.name} - Free Online Tool`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} - Free Online Tool`,
      description: tool.description,
      images: [`${BASE_URL}/og-tool-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generate SoftwareApplication structured data (JSON-LD)
 */
export function generateSoftwareApplicationSchema(
  options: ToolMetadataOptions
): SoftwareApplication {
  const { tool, categoryName, features } = options;
  const categoryMap: Record<string, string> = {
    json: "DeveloperApplication",
    text: "TextEditor",
    image: "MultimediaApplication",
    pdf: "DocumentApplication",
    html: "WebApplication",
    seo: "WebApplication",
    cloudinary: "MultimediaApplication",
    color: "DesignApplication",
    encoding: "UtilityApplication",
    hash: "SecurityApplication",
    "qr-code": "UtilityApplication",
    "date-time": "UtilityApplication",
    "unit-converter": "UtilityApplication",
  };

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: categoryMap[tool.category] || "WebApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: features || tool.tags.slice(0, 5),
    url: `${BASE_URL}${tool.route}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "100+",
    },
    author: {
      "@type": "Organization",
      name: "InsightHub.ink",
    },
  };
}

/**
 * Generate FAQPage structured data (JSON-LD)
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPage {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList structured data (JSON-LD)
 */
export function generateBreadcrumbSchema(
  tool: Tool,
  categoryName: string
): BreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${BASE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `${BASE_URL}/tools/${tool.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.name,
        item: `${BASE_URL}${tool.route}`,
      },
    ],
  };
}

/**
 * Generate comprehensive metadata object for a tool
 */
export function generateToolMetadataComplete(options: ToolMetadataOptions) {
  return {
    metadata: generateToolMetadata(options),
    softwareApplicationSchema: generateSoftwareApplicationSchema(options),
    breadcrumbSchema: generateBreadcrumbSchema(options.tool, options.categoryName),
    faqSchema: options.faqs ? generateFAQSchema(options.faqs) : null,
  };
}

