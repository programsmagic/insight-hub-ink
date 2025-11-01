import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InsightHub.ink - Professional Social Media Management & Business Insights',
  description: 'Professional social media management services to grow your brand, engage your audience, and drive results. Trusted SMM agency offering content creation, community management, and analytics. Access business insights and productivity trends.',
  keywords: 'social media management, SMM services, social media marketing, content creation, community management, business insights, productivity trends, digital marketing agency, Instagram management, Facebook marketing, LinkedIn management',
  authors: [{ name: 'InsightHub.ink' }],
  creator: 'InsightHub.ink',
  publisher: 'InsightHub.ink',
  openGraph: {
    title: 'InsightHub.ink - Professional Social Media Management & Business Insights',
    description: 'Professional social media management services to grow your brand, engage your audience, and drive results. Trusted by 500+ businesses worldwide.',
    url: 'https://insighthub.ink',
    siteName: 'InsightHub.ink',
    images: [
      {
        url: 'https://insighthub.ink/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InsightHub - Professional Social Media Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InsightHub.ink - Professional Social Media Management',
    description: 'Professional SMM services to grow your brand and drive results. Trusted by 500+ businesses worldwide.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
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
      </body>
    </html>
  );
}