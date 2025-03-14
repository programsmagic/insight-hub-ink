import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - InsightHub.ink',
  description: 'Explore our latest articles on business insights, productivity tips, and industry trends.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}