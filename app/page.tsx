import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { FeaturedPosts } from "@/components/featured-posts";
import { TrendingTopics } from "@/components/trending-topics";
import { LightbulbIcon, TrendingUpIcon, BookOpenIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight gradient-text mb-6">
              Unlock Business Insights & Boost Productivity
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
              Your trusted source for cutting-edge business trends, actionable insights, and productivity enhancement strategies.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Explore Insights
              </Button>
              <Button size="lg" variant="outline">
                View Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 flex flex-col items-center text-center">
              <LightbulbIcon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Insights</h3>
              <p className="text-muted-foreground">
                Access in-depth analysis and expert perspectives on business trends.
              </p>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <TrendingUpIcon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Growth Strategies</h3>
              <p className="text-muted-foreground">
                Learn proven methods to scale your business and increase productivity.
              </p>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <BookOpenIcon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Resources</h3>
              <p className="text-muted-foreground">
                Shop our curated collection of digital products and templates.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Insights</h2>
          <FeaturedPosts />
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Trending Topics</h2>
          <TrendingTopics />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Ahead of the Curve</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter for weekly insights, trends, and exclusive content.
          </p>
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}