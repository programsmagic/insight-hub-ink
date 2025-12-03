import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeaturedPosts } from "@/components/featured-posts";
import { TrendingTopics } from "@/components/trending-topics";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { Metadata } from "next";
import { AdSenseDisplay } from "@/components/ads";
import { 
  LightbulbIcon, 
  TrendingUpIcon, 
  BookOpenIcon, 
  ArrowRight,
  Sparkles,
  Wallet,
  Target,
  Brain,
  FileSpreadsheet,
  CheckCircle
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
      {/* Hero Section with Animated Background */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-accent/20 via-transparent to-primary/20 animate-pulse" style={{ filter: 'blur(100px)' }} />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Professional SMM Services & World Knowledge</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text mb-6 sm:mb-8 leading-[1.1] px-4">
              Premium SMM Services &<br className="hidden sm:block" /> World Knowledge Hub
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground sm:mt-4 px-4">
              Buy premium-quality social media services (views, subscribers, likes, comments, watch hours) with instant delivery and 100% satisfaction guarantee. Plus, explore our curated world knowledge content.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
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

      {/* Ad after hero */}
      <AdSenseDisplay format="horizontal" minHeight={100} className="py-4" />

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Why Choose InsightHub</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Professional SMM services to grow your brand and a knowledge hub to expand your world understanding.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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

      {/* Ad after features */}
      <AdSenseDisplay format="auto" minHeight={250} className="py-4" />

      {/* Featured Posts with Enhanced Design */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Featured Knowledge</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Explore our latest articles and insights covering world knowledge and global perspectives.
            </p>
          </div>
          <FeaturedPosts />
        </div>
      </section>

      {/* Ad after featured posts */}
      <AdSenseDisplay format="auto" minHeight={250} className="py-4" />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Trending Topics with Enhanced Design */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Trending Topics</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Discover trending topics and insights from around the world.
            </p>
          </div>
          <TrendingTopics />
        </div>
      </section>

      {/* Ad after trending topics */}
      <AdSenseDisplay format="auto" minHeight={250} className="py-4" />

      {/* CTA Section - SMM Services Focus */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-4">Ready to Boost Your Social Media?</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4 max-w-xl mx-auto px-4">
            Visit our secure platform to buy premium-quality SMM services. Get views, subscribers, likes, comments, and watch hours with instant delivery.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto px-4">
            🛡️ Secure payments • ⚡ Instant delivery • ✨ Premium quality • 💯 Satisfaction guaranteed • 🔒 Account safety
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
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

      {/* FinTrack Product Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Personal Finance Management</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Meet FinTrack - Your Personal Finance Manager</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Track your spending, plan for financial goals, and get AI-powered insights to optimize your finances. Perfect for travel, marriage, house savings, and more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group">
              <Wallet className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Easy Tracking</h3>
              <p className="text-muted-foreground">
                Record income and expenses in seconds with a simple, intuitive interface. Track every transaction individually.
              </p>
            </Card>
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group">
              <Target className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Goal Planning</h3>
              <p className="text-muted-foreground">
                Set and track multiple financial goals with automatic progress monitoring. Plan for travel, marriage, house, or any goal.
              </p>
            </Card>
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group">
              <Brain className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">AI Insights</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations based on your spending patterns. Predict savings and optimize your finances.
              </p>
            </Card>
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group">
              <FileSpreadsheet className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Excel Integration</h3>
              <p className="text-muted-foreground">
                Import historical data and export reports in Excel format. Complete data portability and backup functionality.
              </p>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="https://fintrack.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Start Free with Google
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="group" asChild>
              <a href="/fintrack" rel="noopener noreferrer" className="flex items-center">
                Learn More About FinTrack
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-accent" />
              100% Free to Start
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-accent" />
              2 Min Setup
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-accent" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-accent" />
              Excel Export
            </span>
          </div>
        </div>
      </section>
    </>
  );
}