'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Folder } from 'lucide-react';
import type { BlogPost, Category } from '@/lib/types/blog';
import { getBlogImageUrl } from '@/lib/services/blog-api';
import { format } from 'date-fns';

interface PostCardProps {
  post: BlogPost;
  categoriesMap?: Map<string, Category>;
}

export function PostCard({ post, categoriesMap }: PostCardProps) {
  const imageUrl = getBlogImageUrl(post, 'medium');
  const publishedDate = new Date(post.published_date);
  const formattedDate = format(publishedDate, 'MMM d, yyyy');

  // Get category names from IDs
  const postCategories = post.categories
    .map((catId) => categoriesMap?.get(catId))
    .filter((cat): cat is Category => cat !== undefined);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col md:flex-row">
        {imageUrl && (
          <div className="w-full md:w-1/3 relative aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
            />
          </div>
        )}
        <div className={`p-4 sm:p-6 ${imageUrl ? 'md:w-2/3' : 'w-full'}`}>
          <div className="flex items-center gap-2 text-xs sm:text-sm mb-2 flex-wrap">
            {postCategories.length > 0 && (
              <>
                <div className="flex items-center gap-1">
                  <Folder className="h-3 w-3 text-muted-foreground" />
                  <div className="flex gap-1 flex-wrap">
                    {postCategories.slice(0, 2).map((category) => (
                      <Badge key={category.id} variant="secondary" className="text-xs">
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
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mb-2 line-clamp-2">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:text-accent transition-colors"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Tag className="h-3 w-3 text-muted-foreground" />
              <div className="flex gap-1 flex-wrap">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs font-normal"
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

          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
            <Link href={`/blog/${post.slug}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

