import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule a Consultation - InsightHub.ink | Free 30-Minute Session",
  description: "Book a complimentary 30-minute consultation with our social media management experts. Discuss your goals, challenges, and how we can help transform your social media presence. Free consultation available.",
  keywords: [
    "consultation booking",
    "social media consultation",
    "free consultation",
    "SMM consultation",
    "social media strategy consultation",
    "book consultation"
  ],
  openGraph: {
    title: "Schedule a Free Consultation - InsightHub.ink",
    description: "Book a complimentary 30-minute consultation with our social media management experts. Discuss your goals and get a customized proposal.",
    type: "website",
    url: "https://insighthub.ink/consultation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule a Free Consultation",
    description: "Book a complimentary consultation with our SMM experts. Free 30-minute session available.",
  },
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

