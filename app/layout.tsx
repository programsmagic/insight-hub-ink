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
  title: 'InsightHub.ink - Business Insights & Productivity Trends',
  description: 'Discover the latest insights, business trends, and productivity tips to elevate your professional success.',
  keywords: 'business insights, productivity, trends, professional development, digital products',
  openGraph: {
    title: 'InsightHub.ink - Business Insights & Productivity Trends',
    description: 'Discover the latest insights, business trends, and productivity tips to elevate your professional success.',
    url: 'https://insighthub.ink',
    siteName: 'InsightHub.ink',
    images: [
      {
        url: 'https://insighthub.ink/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InsightHub.ink - Business Insights & Productivity Trends',
    description: 'Discover the latest insights, business trends, and productivity tips to elevate your professional success.',
    images: ['https://insighthub.ink/og-image.jpg'],
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