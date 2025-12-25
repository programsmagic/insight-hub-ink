import { Metadata } from 'next';
import Script from 'next/script';
import { env } from '@/lib/env';

const siteUrl = env.getOptionalWithDefault('NEXT_PUBLIC_SITE_URL', 'https://insighthub.ink');

export const metadata: Metadata = {
  title: 'AI Finance Tracker & Expense Manager | Goal-Based Savings Tool',
  description: 'Track your spending, plan for financial goals (travel, marriage, house), and get AI-powered insights to optimize your finances. 100% free to start, no credit card required. Best expense tracker alternative for IT professionals.',
  keywords: [
    'AI finance tracker',
    'expense manager',
    'personal finance tracker',
    'goal-based saving',
    'budgeting for IT professionals',
    'expense tracker alternative',
    'finance tracker app',
    'savings tracker',
    'travel savings',
    'marriage planning',
    'house savings',
    'Excel finance tracker',
    'free expense tracker'
  ],
  alternates: {
    canonical: `${siteUrl}/fintrack`,
  },
  openGraph: {
    title: 'AI Finance Tracker & Expense Manager | Goal-Based Savings Tool',
    description: 'Track your spending, plan for financial goals, and get AI-powered insights. 100% free to start, no credit card required.',
    url: `${siteUrl}/fintrack`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Finance Tracker & Expense Manager',
    description: 'Track your spending, plan for financial goals, and get AI-powered insights. 100% free to start.',
  },
};

// FAQ Schema for FinTrack page
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is FinTrack really free to start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, FinTrack is 100% free to start. No credit card required, no commitment. You get full access to core features including expense tracking, goal planning, and AI insights.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the AI-powered insights work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our AI analyzes your spending patterns and provides personalized recommendations. You\'ll get savings predictions for 3, 6, and 12 months, plus contextual suggestions to optimize your finances.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I import my existing financial data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can import historical data from Excel or CSV files. You can also export your data anytime for backup and analysis. Complete data portability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my financial data secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Your financial data is encrypted and secure. We use Google OAuth for authentication and MongoDB Atlas for secure data storage. Your privacy is our priority.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use FinTrack on mobile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, FinTrack is a Progressive Web App (PWA) that works like a native app on iOS and Android. You can install it on your home screen and use it offline.',
      },
    },
  ],
};

// SoftwareApplication Schema for FinTrack
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FinTrack',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'AI-powered personal finance tracker and expense manager with goal-based saving, Excel integration, and mobile PWA support.',
  url: 'https://fintrack.insighthub.ink',
  provider: {
    '@type': 'Organization',
    name: 'InsightHub.ink',
    url: siteUrl,
  },
  featureList: [
    'Transaction-level tracking',
    'Multiple account management',
    'Goal-based saving',
    'AI-powered insights',
    'Excel import/export',
    'Mobile PWA support',
    'Offline functionality',
  ],
};

export default function FinTrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="fintrack-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="fintrack-software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      {children}
    </>
  );
}
