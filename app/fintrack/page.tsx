"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Wallet,
  Target,
  Brain,
  FileSpreadsheet,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Award,
  PiggyBank,
  Plane,
  Home,
  Heart,
  Users
} from "lucide-react";

export default function FinTrackPage() {
  const coreFeatures = [
    {
      icon: Wallet,
      title: "Transaction-Level Tracking",
      description: "Record every transaction individually (income, expenses, transfers) with detailed categorization and quick add functionality"
    },
    {
      icon: Users,
      title: "Multiple Account Management",
      description: "Manage bank accounts, credit cards, cash, digital wallets (Paytm, PhonePe), and investments with real-time balance tracking"
    },
    {
      icon: Target,
      title: "Goal Management",
      description: "Create unlimited financial goals (travel, marriage, house, savings) with automatic progress tracking and monthly targets"
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized spending recommendations, savings predictions (3, 6, 12 months), and contextual AI suggestions"
    },
    {
      icon: FileSpreadsheet,
      title: "Excel Import/Export",
      description: "Import historical data from Excel/CSV files and export financial data anytime for backup and analysis"
    },
    {
      icon: Smartphone,
      title: "Mobile-First PWA",
      description: "Progressive Web App that works like a native app on iOS and Android with offline functionality and home screen installation"
    }
  ];

  const benefits = [
    "Time-Saving: Record expenses in seconds, not hours",
    "Goal Achievement: Clear path to reach financial goals",
    "Financial Awareness: Understand spending patterns",
    "AI Insights: Personalized recommendations based on your data",
    "Data Portability: Excel import/export anytime",
    "Mobile Convenience: Use anywhere, anytime",
    "Privacy: Your data stays secure and private",
    "Free to Start: No credit card required, 2-minute setup"
  ];

  const useCases = [
    {
      icon: Plane,
      title: "Travel Planning",
      description: "Save for dream vacations. Track monthly savings, see when you'll reach your travel goal, and get AI recommendations on how to save faster.",
      color: "text-blue-500"
    },
    {
      icon: Heart,
      title: "Marriage Planning",
      description: "Plan wedding expenses. Track savings, manage budget, ensure you have enough for your special day with detailed financial planning.",
      color: "text-pink-500"
    },
    {
      icon: Home,
      title: "House Savings",
      description: "Save for down payment. Track progress, get monthly targets, see when you can afford your dream home with predictive analytics.",
      color: "text-green-500"
    },
    {
      icon: PiggyBank,
      title: "General Savings",
      description: "Build emergency fund or save for future. Track spending, predict savings, achieve any financial goal with AI-powered insights.",
      color: "text-yellow-500"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign In (10 seconds)",
      description: "Click 'Start Free' and sign in with your Google account. No credit card required, 100% free to start."
    },
    {
      step: "2",
      title: "Add Spending (2 minutes)",
      description: "Record your monthly income and expenses. You can add transactions manually, import from Excel/CSV, or use quick add for fast entry."
    },
    {
      step: "3",
      title: "Plan & Predict",
      description: "Set financial goals, see savings predictions, track progress, get AI-powered recommendations, and export to Excel anytime."
    }
  ];

  const trustFeatures = [
    {
      icon: Award,
      title: "100% Free to Start",
      description: "No credit card required, no commitment. Start tracking your finances immediately with full access to core features."
    },
    {
      icon: Zap,
      title: "2-Minute Setup",
      description: "Get started in just 2 minutes. Sign in with Google, add your first transaction, and you're ready to track your finances."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is encrypted and secure. We use Google OAuth for authentication and MongoDB Atlas for secure data storage."
    },
    {
      icon: CheckCircle,
      title: "Excel Integration",
      description: "Import your existing data from Excel or export anytime. Your data, your control, complete portability."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent mb-6 sm:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Personal Finance Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text mb-4 sm:mb-6 px-4">
            Track Your Finances • Achieve Any Goal
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-4">
            Record monthly expenses, plan for travel, marriage, house, or any goal. Get AI-powered insights, predict savings, and export to Excel. Start free in 2 minutes.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="https://fintrack.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Start Free with Google
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://fintrack.insighthub.ink" target="_blank" rel="noopener noreferrer">
                View Complete Guide
              </Link>
            </Button>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-muted-foreground px-4">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-accent" />
              No Credit Card
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-accent" />
              2 Min Setup
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-accent" />
              100% Free
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-accent" />
              Excel Export
            </span>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Complete Personal Finance Management</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Everything you need to track spending, plan goals, and optimize your finances with AI-powered insights.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {coreFeatures.map((feature, index) => {
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

      {/* Trust & Quality Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Why Trust FinTrack for Your Financial Goals?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              We make personal finance management simple, secure, and accessible to everyone
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-accent mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Plan for Any Financial Goal</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Whether you're saving for travel, marriage, a house, or building an emergency fund, FinTrack helps you achieve it
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="p-6 sm:p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Icon className={`h-8 w-8 ${useCase.color}`} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{useCase.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground">{useCase.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Get started in 3 simple steps and start tracking your finances today
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-accent">{step.step}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Why Choose FinTrack?
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-0.5 sm:mt-1" />
                    <p className="text-sm sm:text-base">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button className="mt-6 sm:mt-8 w-full sm:w-auto" size="lg" asChild>
                <Link href="https://fintrack.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Get Started on FinTrack <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden mt-6 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000"
                alt="FinTrack - Personal Finance Management App"
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4 px-4">
            Start tracking your expenses, plan for your goals, and get AI-powered insights to optimize your finances. 100% free to start, no credit card required.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 px-4">
            🆓 100% Free to Start • ⚡ 2-Minute Setup • 🤖 AI-Powered Insights • 📊 Excel Integration • 🔒 Secure & Private
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8" asChild>
              <Link href="https://fintrack.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Visit fintrack.insighthub.ink to Get Started
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

