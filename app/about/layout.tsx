import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - InsightHub.ink | Professional Social Media Management",
  description: "Learn about InsightHub - a leading digital marketing agency specializing in social media management. Discover our mission, values, and how we help businesses grow their online presence.",
  keywords: ["about insightHub", "social media agency", "digital marketing company", "SMM services", "business insights"],
  openGraph: {
    title: "About InsightHub - Professional Social Media Management",
    description: "Leading digital marketing agency specializing in social media management and business insights.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

