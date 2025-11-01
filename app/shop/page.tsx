"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ShopPage() {
  const products = [
    {
      id: "1",
      title: "Social Media Management",
      description: "Professional social media management services to grow your brand.",
      price: "$499/mo",
      url: "https://smm.insighthub.ink",
      features: [
        "Content Strategy",
        "Daily Posts",
        "Engagement Management",
        "Analytics Reports"
      ]
    },
    {
      id: "2",
      title: "Digital Marketing Package",
      description: "Comprehensive digital marketing solutions for business growth.",
      price: "$999/mo",
      features: [
        "SEO Optimization",
        "PPC Campaigns",
        "Content Marketing",
        "Email Marketing"
      ]
    },
    {
      id: "3",
      title: "Business Consulting",
      description: "Expert business consulting to optimize your operations.",
      price: "$299/hr",
      features: [
        "Strategy Development",
        "Process Optimization",
        "Growth Planning",
        "Risk Management"
      ]
    }
  ];

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        
        <div className="grid gap-8">
          {products.map((product) => (
            <Card key={product.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:w-64 flex flex-col items-start gap-4">
                  <p className="text-3xl font-bold">{product.price}</p>
                  <Button asChild className="w-full">
                    {product.url ? (
                      <Link href={product.url} className="flex items-center gap-2">
                        Learn More <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <Link href="/contact" className="flex items-center gap-2">
                        Contact Us <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}