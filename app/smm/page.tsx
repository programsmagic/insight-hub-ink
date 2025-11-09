"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  BarChart3,
  Users,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Calendar,
  ImageIcon,
  Megaphone,
  Sparkles,
  Eye,
  ThumbsUp,
  Clock,
  Shield,
  Zap,
  Award
} from "lucide-react";

export default function SMMPage() {
  const features = [
    {
      icon: Users,
      title: "Audience Growth",
      description: "Build a genuine and engaged following across all social platforms with proven growth strategies"
    },
    {
      icon: MessageSquare,
      title: "Content Creation",
      description: "Professional content that resonates with your target audience and drives engagement"
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Detailed analytics and insights to measure campaign success and optimize strategies"
    },
    {
      icon: BarChart3,
      title: "ROI Optimization",
      description: "Data-driven strategies to maximize your social media ROI and conversion rates"
    }
  ];

  const benefits = [
    "Increased brand visibility and recognition",
    "Higher engagement rates and audience interaction",
    "Consistent posting schedule across platforms",
    "Professional content creation and curation",
    "Detailed monthly performance reports",
    "Dedicated social media manager",
    "Crisis management and reputation protection",
    "24/7 community monitoring and response"
  ];

  const platforms = [
    { icon: Instagram, name: "Instagram", color: "text-pink-500" },
    { icon: Facebook, name: "Facebook", color: "text-blue-500" },
    { icon: Twitter, name: "Twitter", color: "text-sky-500" },
    { icon: Linkedin, name: "LinkedIn", color: "text-blue-600" },
    { icon: Youtube, name: "YouTube", color: "text-red-500" },
    { icon: MessageSquare, name: "TikTok", color: "text-black dark:text-white" }
  ];

  const services = [
    {
      icon: Calendar,
      title: "Content Strategy & Planning",
      items: [
        "Custom content calendar aligned with your brand",
        "Trend research and hashtag optimization",
        "Content mix strategy (60/20/20 rule)",
        "Brand voice development and consistency"
      ]
    },
    {
      icon: ImageIcon,
      title: "Creative Content Creation",
      items: [
        "High-quality graphics and visuals",
        "Video production and editing",
        "Copywriting and caption optimization",
        "Story design and highlights"
      ]
    },
    {
      icon: Megaphone,
      title: "Community Management",
      items: [
        "Real-time engagement and responses",
        "Comment moderation and filtering",
        "DM management and customer support",
        "Influencer outreach and partnerships"
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      items: [
        "Monthly performance reports",
        "Growth metrics and KPIs tracking",
        "Competitor analysis",
        "ROI measurement and optimization"
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent mb-6 sm:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Professional SMM Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text mb-4 sm:mb-6 px-4">
            Transform Your Social Media Presence
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-4">
            Boost your social media presence with premium-quality services. Buy views, subscribers, likes, comments, and watch hours from trusted providers. Premium quality, instant delivery, and 100% satisfaction guaranteed. Trusted by 500+ businesses worldwide.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                Get Started Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                View All Plans & Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services We Offer Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Premium Social Media Growth Services</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Get instant, premium-quality growth for your social media accounts. All services come with quality guarantees and instant delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <Eye className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Views</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Boost your video views across YouTube, TikTok, Instagram, and more
              </p>
              <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                  Buy Views
                </Link>
              </Button>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Subscribers</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Grow your subscriber count with real, engaged followers
              </p>
              <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                  Buy Subscribers
                </Link>
              </Button>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <ThumbsUp className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Likes</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Increase engagement with high-quality likes on all platforms
              </p>
              <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                  Buy Likes
                </Link>
              </Button>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <MessageSquare className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Comments</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Get authentic comments to boost your post engagement
              </p>
              <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                  Buy Comments
                </Link>
              </Button>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <Clock className="h-8 w-8 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Watch Hours</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Increase YouTube watch hours to meet monetization requirements
              </p>
              <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                  Buy Watch Hours
                </Link>
              </Button>
            </Card>
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                View All Services on Our Platform
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Quality Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Why Trust InsightHub for Your Social Media Growth?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              We deliver premium-quality services with guarantees you can trust
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
              <Award className="h-8 w-8 sm:h-10 sm:w-10 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                High-quality, authentic engagement from real accounts - no bots or fake profiles
              </p>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
              <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Instant Delivery</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Fast delivery times - see results within hours, not days
              </p>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">100% Safe & Secure</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Secure payment processing and guaranteed account safety
              </p>
            </Card>
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Money-back guarantee if you're not satisfied with our service
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">All Major Platforms Supported</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              We provide services for all major social media platforms
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
                  <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${platform.color} mx-auto mb-2 sm:mb-3`} />
                  <p className="text-sm sm:text-base font-medium">{platform.name}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Comprehensive Social Media Management</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              End-to-end social media solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-accent mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What We Do for You</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              A complete breakdown of our service offerings
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 sm:p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 bg-accent/10 rounded-lg flex-shrink-0">
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{service.title}</h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Why Choose Our SMM Services?
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-0.5 sm:mt-1" />
                    <p className="text-sm sm:text-base">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button className="mt-6 sm:mt-8 w-full sm:w-auto" asChild>
                <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Get Started on Platform <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden mt-6 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
                alt="Premium Social Media Growth Services - Buy views, subscribers, likes, comments, and watch hours with instant delivery"
                className="object-cover w-full h-full"
                loading="lazy"
                width={800}
                height={450}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-4">Ready to Boost Your Social Media Growth?</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4 px-4">
            Visit our secure platform to purchase premium-quality social media services instantly. Get views, subscribers, likes, comments, and watch hours with the best quality guaranteed.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 px-4">
            🛡️ Secure payments • ⚡ Instant delivery • ✨ Premium quality • 💯 Satisfaction guaranteed
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8" asChild>
              <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Visit smm.insighthub.ink to Buy Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}