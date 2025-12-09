'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Folder, Clock, Eye } from 'lucide-react';
import type { BlogPost, Category } from '@/lib/types/blog';
import { getBlogImageUrl } from '@/lib/services/blog-api';
import { getReadingTime } from '@/lib/utils/blog-utils';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: BlogPost;
  categoriesMap?: Map<string, Category>;
  featured?: boolean;
}

export function PostCard({ post, categoriesMap, featured = false }: PostCardProps) {
  const imageUrl = getBlogImageUrl(post, featured ? 'large' : 'medium');
  const publishedDate = new Date(post.published_date);
  const formattedDate = format(publishedDate, 'MMM d, yyyy');
  const readingTime = getReadingTime(post.content || post.excerpt);

  // Get category names from IDs
  const postCategories = post.categories
    .map((catId) => categoriesMap?.get(catId))
    .filter((cat): cat is Category => cat !== undefined);

  return (
    <Card 
      className={cn(
        "group overflow-hidden transition-all duration-300",
        "hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1",
        "border-border/50 hover:border-accent/50",
        featured && "border-2 border-accent/30"
      )}
    >
      <div className={cn(
        "flex flex-col",
        featured ? "md:flex-row" : "md:flex-row"
      )}>
        {imageUrl && (
          <div className={cn(
            "relative overflow-hidden",
            featured ? "w-full md:w-2/5 aspect-[16/9] md:aspect-auto" : "w-full md:w-1/3 aspect-[4/3]"
          )}>
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes={featured ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 100vw, 33vw"}
              loading={featured ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <div className={cn(
          "flex flex-col justify-between",
          imageUrl ? (featured ? "md:w-3/5" : "md:w-2/3") : "w-full",
          "p-4 sm:p-6"
        )}>
          <div>
            {/* Meta Information */}
            <div className="flex items-center gap-2 text-xs sm:text-sm mb-3 flex-wrap">
              {postCategories.length > 0 && (
                <>
                  <div className="flex items-center gap-1">
                    <Folder className="h-3 w-3 text-accent" />
                    <div className="flex gap-1 flex-wrap">
                      {postCategories.slice(0, 2).map((category) => (
                        <Badge 
                          key={category.id} 
                          variant="secondary" 
                          className="text-xs bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors"
                        >
                          {category.name}
                        </Badge>
                      ))}
                      {postCategories.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{postCategories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <span className="text-muted-foreground">•</span>
                </>
              )}
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{readingTime}</span>
              </div>
              {post.analytics?.views !== undefined && post.analytics.views > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>{post.analytics.views}</span>
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className={cn(
              "font-semibold mb-3 line-clamp-2 group-hover:text-accent transition-colors",
              featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
            )}>
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-accent transition-colors"
              >
                {post.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className={cn(
              "text-muted-foreground mb-4 line-clamp-3",
              featured ? "text-base sm:text-lg" : "text-sm sm:text-base"
            )}>
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <div className="flex gap-1 flex-wrap">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs font-normal hover:bg-accent/10 hover:border-accent/50 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{post.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Read More Button */}
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className={cn(
              "w-full sm:w-auto group/button",
              "hover:bg-accent hover:text-accent-foreground hover:border-accent",
              "transition-all duration-200"
            )}
          >
            <Link href={`/blog/${post.slug}`}>
              Read More
              <span className="ml-2 inline-block transition-transform duration-200 group-hover/button:translate-x-1">
                →
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
