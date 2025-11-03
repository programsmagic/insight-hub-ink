import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeaturedPosts } from "@/components/featured-posts";
import { TrendingTopics } from "@/components/trending-topics";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { 
  LightbulbIcon, 
  TrendingUpIcon, 
  BookOpenIcon, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section with Animated Background */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-accent/20 via-transparent to-primary/20 animate-pulse" style={{ filter: 'blur(100px)' }} />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Professional SMM Services & World Knowledge</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight gradient-text mb-8 leading-[1.1]">
              Professional SMM Services &<br />World Knowledge Hub
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
              Transform your social media presence with expert SMM services and stay ahead with our curated world knowledge content.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="/smm" rel="noopener noreferrer">
                  Explore SMM Services
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
              <h3 className="text-xl font-semibold mb-3">Professional SMM Services</h3>
              <p className="text-muted-foreground">
                Transform your social media presence with expert management, content creation, and growth strategies.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-all duration-300 group">
              <TrendingUpIcon className="h-12 w-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Social Media Growth</h3>
              <p className="text-muted-foreground">
                Boost engagement, grow your audience, and drive measurable results across all major platforms.
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
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Social Media?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Get professional SMM services to grow your brand and engage your audience. Trusted by 500+ businesses worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="/smm" rel="noopener noreferrer">
                Explore SMM Services
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}