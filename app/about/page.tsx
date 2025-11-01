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
          We're a leading digital marketing agency specializing in social media management, helping businesses transform their online presence and achieve remarkable growth.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              At InsightHub, we empower businesses to unlock their full potential through strategic social media marketing. Our mission is to help brands build authentic connections, engage meaningfully with their audiences, and drive sustainable growth in the digital landscape.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe that every business, regardless of size, deserves access to professional-grade social media management. That's why we've crafted our services to be scalable, results-oriented, and transparent.
            </p>
          </div>
          <Card className="p-8 bg-secondary">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-4">
              To become the most trusted social media management partner for businesses worldwide, known for our innovative strategies, exceptional service, and unwavering commitment to client success.
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
              <h3 className="text-2xl font-bold">Social Media Management</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Complete management of your social media accounts including content creation, posting schedules, community engagement, and brand voice consistency across all platforms.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Content strategy & planning</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Daily posting & engagement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Community management</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Growth & Analytics</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Data-driven strategies to grow your following, increase engagement rates, and optimize your social media ROI with detailed analytics and performance reports.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Follower growth strategies</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Performance analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>ROI optimization</span>
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
              <Link href="/smm">
                Explore Our Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
