import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Management - InsightHub.ink",
  description: "Professional social media management services to grow your brand, engage your audience, and drive results.",
};

export default function SMMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}