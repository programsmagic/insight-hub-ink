"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Target,
  Users,
  Award,
  TrendingUp,
  Zap,
  Heart,
  Globe,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We focus on measurable outcomes and ROI for every client engagement."
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Your success is our success. We build long-term partnerships."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "We leverage cutting-edge strategies and tools to stay ahead."
    },
    {
      icon: Globe,
      title: "Transparency",
      description: "Clear communication and honest reporting at every step."
    }
  ];

  const stats = [
    { label: "Happy Clients", value: "500+" },
    { label: "Projects Completed", value: "1,200+" },
    { label: "Years of Experience", value: "5+" },
    { label: "Social Media Reach", value: "10M+" }
  ];

  const teamHighlights = [
    "Certified social media marketing specialists",
    "Data-driven strategy experts",
    "Creative content creators",
    "Analytics and performance optimization gurus"
  ];

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight gradient-text mb-6">
          About InsightHub
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          We're a trusted provider of premium social media growth services, helping content creators, influencers, and businesses achieve their social media goals with high-quality, instant-delivery services.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              At InsightHub, we empower creators and businesses to unlock their social media potential through premium-quality growth services. Our mission is to provide instant, reliable, and high-quality social media services that help our clients achieve their growth goals safely and effectively.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe in transparency, quality, and customer satisfaction above all. That's why every service we offer comes with quality guarantees, secure payment processing, and 24/7 customer support. Your success is our commitment.
            </p>
          </div>
          <Card className="p-8 bg-secondary">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-4">
              To become the most trusted and reliable platform for social media growth services worldwide, recognized for our premium quality, instant delivery, and unwavering commitment to customer satisfaction and account safety.
            </p>
            <div className="flex items-center gap-2 text-accent mt-6">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Building Tomorrow's Digital Leaders</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These principles guide everything we do and shape how we serve our clients.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <Icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Do</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive social media management services tailored to your business needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Premium SMM Services</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              We offer premium-quality social media growth services including views, subscribers, likes, comments, and watch hours across all major platforms with instant delivery.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Views & Watch Hours</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Subscribers & Followers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Likes & Comments</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Quality & Security</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Every service comes with premium quality guarantees, secure payment processing, instant delivery, and 100% satisfaction guarantee. Your account safety is our top priority.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Premium quality guaranteed</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Secure payment processing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Account safety guarantee</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <Card className="p-12 bg-secondary">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A dedicated team of social media experts passionate about your success.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {teamHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-lg">{highlight}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center">
        <Card className="p-12 bg-accent/10">
          <h2 className="text-3xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how we can help transform your social media presence and drive real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer">
                Get Started on Platform
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/smm">Explore Our Services</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
