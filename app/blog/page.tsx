"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { blogPosts } from "./data";

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Latest Insights</h1>
        
        <div className="grid gap-6 sm:gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:w-2/3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm mb-2">
                    <span className="text-accent font-medium">{post.category}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{post.date}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
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