/**
 * Structured Data (JSON-LD) Components for SEO and AI Agent Accessibility
 * These help search engines and AI agents understand the content better
 */

import { Organization, WebSite, Service, FAQPage } from './types';

export const organizationSchema: Organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "InsightHub.ink",
  "url": "https://insighthub.ink",
  "logo": "https://insighthub.ink/logo.png",
  "description": "Premium social media growth services provider. Buy views, subscribers, likes, comments, and watch hours with instant delivery and quality guarantees.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "contact@insighthub.ink",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://instagram.com/insighthub.ink",
    "https://facebook.com/insighthub.ink",
    "https://twitter.com/insighthub",
    "https://linkedin.com/company/insighthub",
    "https://youtube.com/@insighthub"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "500",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const websiteSchema: WebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "InsightHub.ink",
  "url": "https://insighthub.ink",
  "description": "Premium SMM services - Buy YouTube views, Instagram followers, TikTok views, subscribers, likes, comments, and watch hours with instant delivery.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://insighthub.ink/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "InsightHub.ink"
  }
};

export const smmServicesSchema: Service = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Social Media Marketing Services",
  "provider": {
    "@type": "Organization",
    "name": "InsightHub.ink",
    "url": "https://insighthub.ink"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Worldwide"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "SMM Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Buy YouTube Views",
          "description": "Premium YouTube views with instant delivery"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Buy YouTube Subscribers",
          "description": "Real YouTube subscribers with quality guarantee"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Buy YouTube Watch Hours",
          "description": "YouTube watch hours for monetization eligibility"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Buy Instagram Likes",
          "description": "Premium Instagram likes with instant delivery"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Buy Instagram Followers",
          "description": "Real Instagram followers with quality guarantee"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Buy TikTok Views",
          "description": "Premium TikTok views with instant delivery"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Buy Social Media Comments",
          "description": "Authentic comments to boost engagement"
        }
      }
    ]
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://smm.insighthub.ink"
  }
};

export const faqSchema: FAQPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I buy SMM services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visit smm.insighthub.ink to browse and purchase premium-quality social media services including views, subscribers, likes, comments, and watch hours. We offer instant delivery and 100% satisfaction guarantee."
      }
    },
    {
      "@type": "Question",
      "name": "Are your SMM services safe for my account?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all our services are 100% safe for your accounts. We use premium-quality, authentic engagement methods that comply with platform guidelines. Your account safety is our top priority."
      }
    },
    {
      "@type": "Question",
      "name": "How fast is the delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer instant delivery for most services. You'll see results within hours, not days. Delivery speed depends on the service type and quantity ordered."
      }
    },
    {
      "@type": "Question",
      "name": "What platforms do you support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We support all major social media platforms including YouTube, Instagram, TikTok, Facebook, Twitter, LinkedIn, and more. Visit smm.insighthub.ink to see all available services."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer refunds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer a 100% satisfaction guarantee. If you're not satisfied with our service, contact our support team for a refund."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept all major payment methods including credit cards, debit cards, PayPal, and cryptocurrency. All payments are processed securely through our platform at smm.insighthub.ink."
      }
    }
  ]
};

/**
 * Generate breadcrumb schema for a page
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export { StructuredData as default };
