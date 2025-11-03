import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeaturedPosts } from "@/components/featured-posts";
import { TrendingTopics } from "@/components/trending-topics";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { StructuredData } from "@/lib/structured-data";
import { smmServicesSchema, faqSchema } from "@/lib/structured-data";
import { Metadata } from "next";
import { 
  LightbulbIcon, 
  TrendingUpIcon, 
  BookOpenIcon, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Buy Premium SMM Services - Views, Subscribers, Likes, Watch Hours",
  description: "Buy premium-quality social media services: YouTube views, subscribers, watch hours, Instagram likes, TikTok views with instant delivery. 100% satisfaction guaranteed. Trusted by 500+ clients. Visit smm.insighthub.ink.",
  keywords: [
    "buy youtube views",
    "buy instagram followers",
    "buy subscribers",
    "buy likes",
    "buy watch hours",
    "SMM services",
    "social media growth",
    "premium SMM panel",
    "instant delivery SMM"
  ],
  alternates: {
    canonical: "https://insighthub.ink",
  },
  openGraph: {
    title: "Buy Premium SMM Services - Instant Delivery | InsightHub.ink",
    description: "Buy YouTube views, subscribers, watch hours, Instagram likes, TikTok views with premium quality and instant delivery. 100% satisfaction guaranteed.",
    url: "https://insighthub.ink",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData data={smmServicesSchema} />
      <StructuredData data={faqSchema} />
      {/* Hero Section with Animated Background */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-secondary overflow-hidden" itemScope itemType="https://schema.org/WebPage">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-accent/20 via-transparent to-primary/20 animate-pulse" style={{ filter: 'blur(100px)' }} />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <header className="text-center" itemScope itemType="https://schema.org/WPHeader">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-8">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">Professional SMM Services & World Knowledge</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight gradient-text mb-8 leading-[1.1]" itemProp="headline">
              Premium SMM Services &<br />World Knowledge Hub
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4" itemProp="description">
              Buy premium-quality social media services (views, subscribers, likes, comments, watch hours) with instant delivery and 100% satisfaction guarantee. Plus, explore our curated world knowledge content.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Buy SMM Services Now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <a href="/smm" rel="noopener noreferrer" className="flex items-center">
                  Explore Services
                </a>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <a href="/blog" rel="noopener noreferrer" className="flex items-center">
                  Browse Knowledge Hub
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose InsightHub</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional SMM services to grow your brand and a knowledge hub to expand your world understanding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 group">
              <LightbulbIcon className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Premium SMM Services</h3>
              <p className="text-muted-foreground">
                Buy high-quality views, subscribers, likes, comments, and watch hours with instant delivery and quality guarantees.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-all duration-300 group">
              <TrendingUpIcon className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Instant Growth</h3>
              <p className="text-muted-foreground">
                Get instant results with premium-quality services. Secure payments, fast delivery, and 100% satisfaction guaranteed.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-all duration-300 group">
              <BookOpenIcon className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">World Knowledge Hub</h3>
              <p className="text-muted-foreground">
                Access curated content, insights, and knowledge to expand your understanding of the world.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Posts with Enhanced Design */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Knowledge</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest articles and insights covering world knowledge and global perspectives.
            </p>
          </div>
          <FeaturedPosts />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Trending Topics with Enhanced Design */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trending Topics</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover trending topics and insights from around the world.
            </p>
          </div>
          <TrendingTopics />
        </div>
      </section>

      {/* CTA Section - SMM Services Focus */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Social Media?</h2>
          <p className="text-lg text-muted-foreground mb-4 max-w-xl mx-auto">
            Visit our secure platform to buy premium-quality SMM services. Get views, subscribers, likes, comments, and watch hours with instant delivery.
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
            🛡️ Secure payments • ⚡ Instant delivery • ✨ Premium quality • 💯 Satisfaction guaranteed • 🔒 Account safety
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Visit smm.insighthub.ink to Buy Services
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/smm" rel="noopener noreferrer">
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}