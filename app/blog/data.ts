export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Productivity Hacks for Remote Teams",
    excerpt: "Discover proven strategies to boost your remote team's productivity and collaboration.",
    category: "Productivity",
    date: "Apr 15, 2024",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
    slug: "productivity-hacks-remote-teams"
  },
  {
    id: "2",
    title: "The Future of AI in Business",
    excerpt: "Explore how artificial intelligence is reshaping the business landscape in 2024 and beyond.",
    category: "Technology",
    date: "Apr 12, 2024",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
    slug: "future-ai-business"
  },
  {
    id: "3",
    title: "Building a Strong Company Culture",
    excerpt: "Learn how to create and maintain a positive company culture that drives success.",
    category: "Leadership",
    date: "Apr 10, 2024",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    slug: "building-strong-company-culture"
  },
  {
    id: "4",
    title: "Effective Time Management Strategies",
    excerpt: "Master your time with proven techniques used by successful entrepreneurs.",
    category: "Productivity",
    date: "Apr 8, 2024",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=800",
    slug: "effective-time-management"
  },
  {
    id: "5",
    title: "Digital Marketing Trends 2024",
    excerpt: "Stay ahead of the curve with the latest digital marketing strategies and tools.",
    category: "Marketing",
    date: "Apr 5, 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    slug: "digital-marketing-trends"
  },
  {
    id: "6",
    title: "Sustainable Business Practices",
    excerpt: "Implement eco-friendly strategies that benefit both the environment and your bottom line.",
    category: "Sustainability",
    date: "Apr 3, 2024",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    slug: "sustainable-business-practices"
  }
];