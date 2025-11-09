import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinTrack - Personal Finance Manager | Track Expenses, Plan Goals, AI Insights | InsightHub.ink",
  description: "FinTrack helps you track spending, plan financial goals, and get AI-powered insights. Record expenses, set goals for travel/marriage/house, predict savings, and export to Excel. 100% free to start, 2-minute setup. Visit fintrack.insighthub.ink.",
  keywords: [
    "personal finance",
    "expense tracker",
    "financial goals",
    "AI finance insights",
    "budget tracker",
    "expense management",
    "financial planning",
    "savings tracker",
    "goal planning",
    "money management",
    "finance app",
    "expense tracking app",
    "budget app",
    "financial goals app",
    "AI financial advisor",
    "Excel expense tracker",
    "PWA finance app",
    "mobile finance app"
  ],
  alternates: {
    canonical: "https://insighthub.ink/fintrack",
  },
  openGraph: {
    title: "FinTrack - Track Your Finances • Achieve Any Goal | InsightHub.ink",
    description: "Track spending, plan goals, and get AI-powered financial insights. Free to start, 2-minute setup. Perfect for travel, marriage, house savings, and more.",
    type: "website",
    url: "https://insighthub.ink/fintrack",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinTrack - Your Personal Finance Manager",
    description: "Track Your Finances • Achieve Any Goal. Free to start, AI-powered insights, Excel integration.",
  },
};

export default function FinTrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

