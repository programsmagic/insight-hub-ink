import { Metadata } from 'next';
import Script from 'next/script';
import { env } from '@/lib/env';

const siteUrl = env.getOptionalWithDefault('NEXT_PUBLIC_SITE_URL', 'https://insighthub.ink');

export const metadata: Metadata = {
  title: 'Social Media Marketing Services for YouTube & Instagram | Buy Views, Subscribers, Likes',
  description: 'Buy premium-quality social media services: YouTube views, subscribers, watch hours, Instagram likes, TikTok views with instant delivery. 100% satisfaction guaranteed. Trusted by 500+ clients. Visit smm.insighthub.ink.',
  keywords: [
    'buy youtube views',
    'buy instagram followers',
    'buy subscribers',
    'buy likes',
    'buy watch hours',
    'SMM services',
    'social media growth',
    'YouTube growth services',
    'Instagram growth services',
    'TikTok growth services',
    'how to buy social media engagement safely',
    'premium SMM panel',
    'instant delivery SMM'
  ],
  alternates: {
    canonical: `${siteUrl}/smm`,
  },
  openGraph: {
    title: 'Social Media Marketing Services for YouTube & Instagram | InsightHub.ink',
    description: 'Buy YouTube views, subscribers, watch hours, Instagram likes, TikTok views with premium quality and instant delivery. 100% satisfaction guaranteed.',
    url: `${siteUrl}/smm`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Marketing Services for YouTube & Instagram',
    description: 'Buy premium-quality social media services with instant delivery. 100% satisfaction guaranteed.',
  },
};

// FAQ Schema for SMM page
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are your SMM services safe for my account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all our services are 100% safe for your accounts. We use premium-quality, authentic engagement methods that comply with platform guidelines. Your account safety is our top priority.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast is the delivery?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer instant delivery for most services. You\'ll see results within hours, not days. Delivery speed depends on the service type and quantity ordered.',
      },
    },
    {
      '@type': 'Question',
      name: 'What platforms do you support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We support all major social media platforms including YouTube, Instagram, TikTok, Facebook, Twitter, LinkedIn, and more. Visit smm.insighthub.ink to see all available services.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer refunds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer a 100% satisfaction guarantee. If you\'re not satisfied with our service, contact our support team for a refund.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major payment methods including credit cards, debit cards, PayPal, and cryptocurrency. All payments are processed securely through our platform at smm.insighthub.ink.',
      },
    },
  ],
};

// Service Schema for SMM services
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Social Media Marketing Services',
  provider: {
    '@type': 'Organization',
    name: 'InsightHub.ink',
    url: siteUrl,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Worldwide',
  },
  description: 'Premium social media growth services including YouTube views, subscribers, watch hours, Instagram likes, TikTok views, and more.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://smm.insighthub.ink',
  },
};

export default function SMMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="smm-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="smm-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      {children}
    </>
  );
}
