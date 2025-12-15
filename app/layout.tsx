import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { organizationSchema, websiteSchema } from '@/lib/structured-data';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Buy SMM Services - Views, Subscribers, Likes, Comments, Watch Hours | InsightHub.ink',
    template: '%s | InsightHub.ink'
  },
  description: 'Buy premium-quality social media services: YouTube views, subscribers, watch hours, Instagram likes, TikTok views, and more. Instant delivery, 100% satisfaction guaranteed. Trusted by 500+ clients. Visit smm.insighthub.ink to purchase.',
  keywords: [
    'buy youtube views',
    'buy instagram followers',
    'buy tiktok views',
    'buy subscribers',
    'buy likes',
    'buy comments',
    'buy watch hours',
    'SMM services',
    'social media growth',
    'premium SMM panel',
    'buy social media engagement',
    'YouTube growth service',
    'Instagram growth service',
    'TikTok growth service',
    'social media marketing',
    'instant delivery SMM',
    'best SMM panel',
    'reliable SMM services',
    'buy facebook likes',
    'buy twitter followers',
    'social media management'
  ],
  authors: [{ name: 'InsightHub.ink' }],
  creator: 'InsightHub.ink',
  publisher: 'InsightHub.ink',
  alternates: {
    canonical: 'https://insighthub.ink',
  },
  openGraph: {
    title: 'Buy Premium SMM Services - Views, Subscribers, Likes, Watch Hours | InsightHub.ink',
    description: 'Buy premium-quality social media services with instant delivery. Get YouTube views, subscribers, watch hours, Instagram likes, TikTok views, and more. 100% satisfaction guaranteed. Trusted by 500+ clients worldwide.',
    url: 'https://insighthub.ink',
    siteName: 'InsightHub.ink',
    images: [
      {
        url: 'https://insighthub.ink/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InsightHub - Premium SMM Services for Social Media Growth',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Premium SMM Services - Instant Delivery | InsightHub.ink',
    description: 'Buy YouTube views, subscribers, watch hours, Instagram likes, TikTok views with premium quality and instant delivery. 100% satisfaction guaranteed.',
    images: ['https://insighthub.ink/og-image.jpg'],
    creator: '@insighthub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || '',
  },
  category: 'Social Media Services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchemaString = JSON.stringify(organizationSchema);
  const websiteSchemaString = JSON.stringify(websiteSchema);
  
  const googleAdsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        {/* Google AdSense Script */}
        {googleAdsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgSchemaString }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteSchemaString }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}