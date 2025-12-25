import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts, getCategories } from '@/lib/services/blog-api';
import { getBlogImageUrl } from '@/lib/services/blog-api';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Folder, Calendar } from 'lucide-react';
import type { Category } from '@/lib/types/blog';

/**
 * FeaturedPosts Component
 * Fetches and displays the latest 3 blog posts from the API
 * Falls back gracefully if API is unavailable
 */
export async function FeaturedPosts() {
  let posts: Array<{
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    featured_image: string | null;
    published_date: string;
    categories: string[];
  }> = [];
  
  let categoriesMap = new Map<string, Category>();

  try {
    // Fetch latest 3 blog posts
    const [postsData, categoriesData] = await Promise.all([
      getBlogPosts({ page: 1, limit: 3, sortBy: 'published_date', sortOrder: 'desc' }),
      getCategories(),
    ]);

    posts = postsData.posts;
    categoriesMap = new Map(
      categoriesData.categories.map((cat) => [cat.id, cat])
    );
  } catch (error) {
    // Gracefully handle API errors - component will render empty state
    console.error('Error fetching featured posts:', error);
  }

  // If no posts available, show empty state
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No blog posts available at the moment. Check back soon for new content!
        </p>
        <Link
          href="/blog"
          className="mt-4 inline-block text-accent hover:underline"
        >
          Visit our blog →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      {posts.map((post) => {
        const imageUrl = getBlogImageUrl(post, 'medium');
        const publishedDate = new Date(post.published_date);
        const formattedDate = format(publishedDate, 'MMM d, yyyy');
        const postCategories = post.categories
          .map((catId) => categoriesMap.get(catId))
          .filter((cat): cat is Category => cat !== undefined);

        return (
          <article
            key={post.id}
            className="group"
            role="article"
            aria-labelledby={`post-title-${post.id}`}
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-video overflow-hidden rounded-lg mb-4 bg-muted">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/20">
                    <Folder className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  {postCategories.length > 0 && (
                    <>
                      <div className="flex items-center gap-1">
                        <Folder className="h-3 w-3 text-accent" />
                        <Badge
                          variant="secondary"
                          className="text-xs bg-accent/10 text-accent border-accent/20"
                        >
                          {postCategories[0].name}
                        </Badge>
                      </div>
                      <span className="text-muted-foreground" aria-hidden="true">•</span>
                    </>
                  )}
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.published_date}>{formattedDate}</time>
                  </div>
                </div>
                <h3
                  id={`post-title-${post.id}`}
                  className="text-lg sm:text-xl font-semibold group-hover:text-accent transition-colors line-clamp-2"
                >
                  {post.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}