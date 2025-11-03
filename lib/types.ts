/**
 * TypeScript types for Schema.org structured data
 */

export interface Organization {
  "@context": string;
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    "@type": "ContactPoint";
    telephone?: string;
    contactType: string;
    email?: string;
    availableLanguage?: string[];
  };
  sameAs?: string[];
  aggregateRating?: AggregateRating;
}

export interface WebSite {
  "@context": string;
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
  publisher?: {
    "@type": "Organization";
    name: string;
  };
}

export interface Service {
  "@context": string;
  "@type": "Service";
  serviceType: string;
  provider: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  areaServed?: {
    "@type": "Country";
    name: string;
  };
  hasOfferCatalog?: {
    "@type": "OfferCatalog";
    name: string;
    itemListElement: Array<{
      "@type": "Offer";
      itemOffered: {
        "@type": "Service";
        name: string;
        description: string;
      };
    }>;
  };
  offers?: {
    "@type": "AggregateOffer";
    priceCurrency: string;
    availability: string;
    url: string;
  };
}

export interface AggregateRating {
  "@type": "AggregateRating";
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  worstRating: string;
}

export interface FAQPage {
  "@context": string;
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}
