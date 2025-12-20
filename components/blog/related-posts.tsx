'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/types/blog';
import { getBlogImageUrl } from '@/lib/services/blog-api';
import { getReadingTime } from '@/lib/utils/blog-utils';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RelatedPostsProps {
  posts: BlogPost[];
  className?: string;
}

export function RelatedPosts({ posts, className }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Related Articles</h2>
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const imageUrl = getBlogImageUrl(post, 'medium');
          const publishedDate = new Date(post.published_date);
          const formattedDate = format(publishedDate, 'MMM d, yyyy');
          const readingTime = getReadingTime(post.content || post.excerpt);

          return (
            <Card
              key={post.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 border-border/50 hover:border-accent/50"
            >
              <Link href={`/blog/${post.slug}`}>
                {imageUrl && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formattedDate}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{readingTime}</span>
                    </div>
                    {post.analytics?.views !== undefined && post.analytics.views > 0 && (
                      <>
                        <span>•</span>
                        <span>{post.analytics.views} views</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs font-normal">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}




