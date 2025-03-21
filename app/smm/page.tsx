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
  ArrowRight
} from "lucide-react";

export default function SMMPage() {
  const features = [
    {
      icon: Users,
      title: "Audience Growth",
      description: "Build a genuine and engaged following across all social platforms"
    },
    {
      icon: MessageSquare,
      title: "Content Creation",
      description: "Professional content that resonates with your target audience"
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Detailed analytics and insights to measure campaign success"
    },
    {
      icon: BarChart3,
      title: "ROI Optimization",
      description: "Data-driven strategies to maximize your social media ROI"
    }
  ];

  const benefits = [
    "Increased brand visibility and recognition",
    "Higher engagement rates and audience interaction",
    "Consistent posting schedule across platforms",
    "Professional content creation and curation",
    "Detailed monthly performance reports",
    "Dedicated social media manager"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight gradient-text mb-6">
            Transform Your Social Media Presence
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground">
            Professional social media management services to grow your brand, engage your audience, and drive results.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Social Media Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6">
                  <Icon className="h-12 w-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
                <Link href="/contact" className="flex items-center gap-2">
                  Schedule a Consultation <ArrowRight className="w-4 h-4" />
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
            Let our team of experts handle your social media while you focus on running your business.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </>
  );
}