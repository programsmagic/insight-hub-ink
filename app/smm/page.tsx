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
  Sparkles
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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Professional SMM Services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight gradient-text mb-6">
            Transform Your Social Media Presence
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground">
            Professional social media management services to grow your brand, engage your audience, and drive measurable results. Trusted by 500+ businesses worldwide.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
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

      {/* Platforms Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platforms We Manage</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We handle all major social media platforms to maximize your brand's reach and engagement
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <Icon className={`h-10 w-10 ${platform.color} mx-auto mb-3`} />
                  <p className="font-medium">{platform.name}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Social Media Management</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end social media solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <Icon className="h-12 w-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Do for You</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete breakdown of our service offerings
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Choose Our SMM Services?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
              <Button className="mt-8" asChild>
                <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Get Started on Platform <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
                alt="Social Media Management"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Social Media Presence?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let our team of experts handle your social media while you focus on running your business. Get started on our platform today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                Get Started Now
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