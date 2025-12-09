import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AdSenseInArticle,
  AdSenseDisplay,
  AdSenseMatchedContent,
} from '@/components/ads';
import { getBlogPostBySlug, getBlogPosts, getBlogImageUrl } from '@/lib/services/blog-api';
import { env } from '@/lib/env';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Script from 'next/script';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for ISR - fetch first page of posts
export async function generateStaticParams() {
  try {
    const { posts } = await getBlogPosts({ page: 1, limit: 20 });
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { post } = await getBlogPostBySlug(params.slug);
    const siteUrl = env.getOptional('NEXT_PUBLIC_SITE_URL') || 'https://insighthub.ink';
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const imageUrl = getBlogImageUrl(post, 'large') || post.featured_image;

    const metaTitle = post.seo.meta_title || post.title;
    const metaDescription =
      post.seo.meta_description || post.excerpt;

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: post.seo.keywords || post.tags,
      authors: [{ name: 'InsightHub.ink' }],
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: postUrl,
        siteName: 'InsightHub.ink',
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ]
          : [],
        type: 'article',
        publishedTime: post.published_date,
        modifiedTime: post.updated_at || post.published_date,
        authors: ['InsightHub.ink'],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: imageUrl ? [imageUrl] : [],
      },
      alternates: {
        canonical: postUrl,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post - InsightHub.ink',
      description: 'Read our latest blog post on personal finance and money management.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { post } = await getBlogPostBySlug(params.slug);
    const siteUrl = env.getOptional('NEXT_PUBLIC_SITE_URL') || 'https://insighthub.ink';
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const publishedDate = new Date(post.published_date);
    const formattedDate = format(publishedDate, 'MMMM d, yyyy');
    const imageUrl = getBlogImageUrl(post, 'large') || post.featured_image;

    // Fetch related posts (same category or tags)
    let relatedPosts: typeof post[] = [];
    try {
      if (post.categories.length > 0) {
        const relatedData = await getBlogPosts({
          page: 1,
          limit: 3,
          category: post.categories[0],
        });
        relatedPosts = relatedData.posts.filter((p) => p.id !== post.id).slice(0, 3);
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }

    // Structured data for Article
    const articleStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: imageUrl ? [imageUrl] : [],
      datePublished: post.published_date,
      dateModified: post.updated_at || post.published_date,
      author: {
        '@type': 'Organization',
        name: 'InsightHub.ink',
      },
      publisher: {
        '@type': 'Organization',
        name: 'InsightHub.ink',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postUrl,
      },
      keywords: post.tags.join(', '),
      articleSection: post.categories.join(', '),
    };

    return (
      <>
        <Script
          id="article-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />
        <article className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto">
            <Button asChild variant="outline" className="mb-8">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            {/* Featured Image */}
            {imageUrl && (
              <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {/* Meta Information */}
            <div className="flex items-center gap-2 text-sm mb-4 flex-wrap">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              {post.tags.length > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{post.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

            {/* Ad after title */}
            <AdSenseDisplay format="horizontal" minHeight={100} className="mb-8" />

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.excerpt && (
                <p className="lead text-xl text-muted-foreground mb-6">
                  {post.excerpt}
                </p>
              )}

              {/* Render HTML content */}
              {post.content && (
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="blog-content"
                />
              )}

              {/* In-article ad */}
              <AdSenseInArticle minHeight={280} />
            </div>

            {/* Analytics Info */}
            {post.analytics && (
              <div className="mt-8 pt-8 border-t text-sm text-muted-foreground">
                <p>
                  {post.analytics.views} views
                  {post.analytics.likes !== undefined && ` • ${post.analytics.likes} likes`}
                  {post.analytics.shares !== undefined &&
                    ` • ${post.analytics.shares} shares`}
                </p>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                <div className="grid gap-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="block p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Matched content ad after article */}
            <AdSenseMatchedContent minHeight={200} className="mt-8" />

            {/* Display ad after article */}
            <AdSenseDisplay format="auto" minHeight={250} className="mt-8" />
          </div>
        </article>
      </>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}
