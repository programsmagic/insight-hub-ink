import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeaturedPosts } from "@/components/featured-posts";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { Metadata } from "next";
import { AdSenseDisplay } from "@/components/ads";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Script from "next/script";
import { createBreadcrumbSchema } from "@/lib/structured-data";
import { 
  ArrowRight,
  Sparkles,
  Wallet,
  Target,
  Brain,
  FileSpreadsheet,
  Wrench,
  TrendingUp,
  Code,
  Image as ImageIcon,
  FileJson,
  Search,
  Users,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Tools for Developers | SMM Services & Finance Tracker",
  description: "Access 200+ free developer tools: JSON formatter, image resizer, PDF tools, SEO utilities, and more. Plus premium SMM services and AI-powered finance tracker. All tools work instantly in your browser.",
  keywords: [
    "free online tools",
    "developer tools",
    "JSON formatter",
    "image resizer",
    "PDF tools",
    "SEO tools",
    "SMM services",
    "buy youtube views",
    "finance tracker",
    "expense manager",
    "AI finance tool"
  ],
  alternates: {
    canonical: "https://insighthub.ink",
  },
  openGraph: {
    title: "Free Online Tools for Developers | SMM Services & Finance Tracker",
    description: "200+ free developer tools, premium SMM services, and AI-powered finance tracker. All tools work instantly in your browser.",
    url: "https://insighthub.ink",
    type: "website",
  },
};

export default function Home() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", href: "/" },
  ]);

  return (
    <>
      <Script
        id="homepage-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
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
              <span className="text-xs sm:text-sm font-medium">Free Developer Tools, SMM Services & Finance Tracker</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text mb-6 sm:mb-8 leading-[1.1] px-4">
              Free Online Tools for Developers<br className="hidden sm:block" />SMM Services & Finance Tracker
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground sm:mt-4 px-4">
              Access 200+ free developer tools, premium social media growth services, and AI-powered personal finance management. All tools work instantly in your browser.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/tools" className="flex items-center">
                  Explore Free Tools
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <Link href="/smm" className="flex items-center">
                  SMM Services
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <Link href="/fintrack" className="flex items-center">
                  Finance Tracker
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad after hero */}
      <AdSenseDisplay format="horizontal" minHeight={100} className="py-4" />

      {/* Stats Section */}
      <Stats />

      {/* Tools Section - Primary Focus */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent mb-4 sm:mb-6">
              <Wrench className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Free Developer Tools & Utilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">200+ Free Online Tools for Developers</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Format JSON, resize images, merge PDFs, validate HTML, optimize SEO, and much more. All tools work instantly in your browser - no installation required.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/50">
              <FileJson className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">JSON Tools</h3>
              <p className="text-muted-foreground mb-4">
                Format, validate, minify, and convert JSON data with our comprehensive JSON toolkit.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/tools?category=json">Explore JSON Tools</Link>
              </Button>
            </Card>
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/50">
              <ImageIcon className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Image Tools</h3>
              <p className="text-muted-foreground mb-4">
                Resize, compress, convert, and optimize images for web and social media.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/tools?category=image">Explore Image Tools</Link>
              </Button>
            </Card>
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/50">
              <Search className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">SEO Tools</h3>
              <p className="text-muted-foreground mb-4">
                Meta tag generator, sitemap creator, backlink checker, and more SEO utilities.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/tools?category=seo">Explore SEO Tools</Link>
              </Button>
            </Card>
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/50">
              <Code className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">HTML Tools</h3>
              <p className="text-muted-foreground mb-4">
                Format, minify, validate, and convert HTML with our developer-friendly tools.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/tools?category=html">Explore HTML Tools</Link>
              </Button>
            </Card>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/tools" className="flex items-center justify-center">
                View All 200+ Free Tools
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad after features */}
      <AdSenseDisplay format="auto" minHeight={250} className="py-4" />

      {/* SMM Services Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50 border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent mb-4 sm:mb-6">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Premium Social Media Growth Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Premium SMM Services for YouTube & Instagram</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Buy high-quality views, subscribers, likes, comments, and watch hours with instant delivery. Premium quality, 100% satisfaction guaranteed, trusted by 500+ clients.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <Eye className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Views</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Boost video views across YouTube, TikTok, Instagram
              </p>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Subscribers</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Grow subscriber count with real, engaged followers
              </p>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <ThumbsUp className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Likes</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Increase engagement with high-quality likes
              </p>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <MessageSquare className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Comments</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Get authentic comments to boost engagement
              </p>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <Clock className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Watch Hours</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Increase YouTube watch hours for monetization
              </p>
            </Card>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/smm" className="flex items-center justify-center">
                Explore SMM Services
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FinTrack Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent mb-4 sm:mb-6">
              <Wallet className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">AI-Powered Personal Finance Manager</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">AI Finance Tracker & Expense Manager</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Track your spending, plan for financial goals (travel, marriage, house), and get AI-powered insights to optimize your finances. 100% free to start, no credit card required.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/50">
              <Wallet className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Easy Tracking</h3>
              <p className="text-muted-foreground">
                Record income and expenses in seconds with a simple, intuitive interface. Track every transaction individually.
              </p>
            </Card>
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/50">
              <Target className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Goal Planning</h3>
              <p className="text-muted-foreground">
                Set and track multiple financial goals with automatic progress monitoring. Plan for travel, marriage, house, or any goal.
              </p>
            </Card>
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/50">
              <Brain className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">AI Insights</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations based on your spending patterns. Predict savings and optimize your finances.
              </p>
            </Card>
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/50">
              <FileSpreadsheet className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Excel Integration</h3>
              <p className="text-muted-foreground">
                Import historical data and export reports in Excel format. Complete data portability and backup functionality.
              </p>
            </Card>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/fintrack" className="flex items-center justify-center">
                Learn More About FinTrack
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad after product sections */}
      <AdSenseDisplay format="auto" minHeight={250} className="py-4" />

      {/* Featured Blog Posts */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Latest Articles & Guides</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Explore our latest guides on developer tools, social media growth, and personal finance management.
            </p>
          </div>
          <FeaturedPosts />
          <div className="text-center mt-8 sm:mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                View All Articles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad after featured posts */}
      <AdSenseDisplay format="auto" minHeight={250} className="py-4" />

      {/* Testimonials Section */}
      <Testimonials />
    </>
  );
}