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
import { getReadingTime } from '@/lib/utils/blog-utils';
import { RelatedPosts } from '@/components/blog/related-posts';
import { SocialShare } from '@/components/blog/social-share';
import { CTASection } from '@/components/blog/cta-section';
import { RelatedTools } from '@/components/blog/related-tools';
import { env } from '@/lib/env';
import { Calendar, Tag, ArrowLeft, Clock, Eye, User } from 'lucide-react';
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
    const readingTime = getReadingTime(post.content || post.excerpt);

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
        
        <article className="min-h-screen">
          {/* Hero Section */}
          <section className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary via-secondary/95 to-background">
            <div className="container mx-auto max-w-4xl">
              <Button asChild variant="ghost" className="mb-6 sm:mb-8 -ml-2">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              {/* Featured Image */}
              {imageUrl && (
                <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden shadow-2xl border border-border/50">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </div>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime}</span>
                </div>
                {post.analytics?.views !== undefined && post.analytics.views > 0 && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{post.analytics.views} views</span>
                    </div>
                  </>
                )}
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>InsightHub.ink</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mb-6">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs sm:text-sm bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Social Share */}
              <div className="mb-8">
                <SocialShare 
                  url={postUrl}
                  title={post.title}
                  description={post.excerpt}
                  variant="compact"
                />
              </div>
            </div>
          </section>

          {/* Article Content */}
          <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Ad after hero */}
              <AdSenseDisplay format="horizontal" minHeight={100} className="mb-8" />

              {/* Article Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-accent prose-pre:bg-secondary prose-pre:border prose-pre:border-border">
                {post.content && (
                  <>
                    <div
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      className="blog-content"
                    />
                    
                    {/* Mid-content ad for long articles */}
                    <AdSenseDisplay format="auto" minHeight={250} className="my-12" />
                  </>
                )}

                {/* In-article ad */}
                <AdSenseInArticle minHeight={280} />
              </div>

              {/* Social Share Footer */}
              <div className="mt-12 pt-8 border-t">
                <SocialShare 
                  url={postUrl}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>

              {/* Analytics Info */}
              {post.analytics && (
                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{post.analytics.views} views</span>
                    </div>
                    {post.analytics.likes !== undefined && (
                      <div className="flex items-center gap-2">
                        <span>❤️</span>
                        <span>{post.analytics.likes} likes</span>
                      </div>
                    )}
                    {post.analytics.shares !== undefined && (
                      <div className="flex items-center gap-2">
                        <span>📤</span>
                        <span>{post.analytics.shares} shares</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Section - Determine type based on categories/tags */}
              {(() => {
                const isSMMRelated = post.categories.some(cat => 
                  cat.toLowerCase().includes('smm') || 
                  cat.toLowerCase().includes('social') ||
                  cat.toLowerCase().includes('youtube') ||
                  cat.toLowerCase().includes('instagram')
                ) || post.tags.some(tag => 
                  tag.toLowerCase().includes('smm') ||
                  tag.toLowerCase().includes('social media') ||
                  tag.toLowerCase().includes('youtube') ||
                  tag.toLowerCase().includes('instagram')
                );
                
                const isFinTrackRelated = post.categories.some(cat => 
                  cat.toLowerCase().includes('finance') || 
                  cat.toLowerCase().includes('money') ||
                  cat.toLowerCase().includes('budget')
                ) || post.tags.some(tag => 
                  tag.toLowerCase().includes('finance') ||
                  tag.toLowerCase().includes('expense') ||
                  tag.toLowerCase().includes('budget')
                );
                
                const isToolsRelated = post.categories.some(cat => 
                  cat.toLowerCase().includes('tool') || 
                  cat.toLowerCase().includes('developer') ||
                  cat.toLowerCase().includes('json') ||
                  cat.toLowerCase().includes('seo')
                ) || post.tags.some(tag => 
                  tag.toLowerCase().includes('tool') ||
                  tag.toLowerCase().includes('developer') ||
                  tag.toLowerCase().includes('json')
                );

                if (isSMMRelated) {
                  return (
                    <div className="mt-12">
                      <CTASection type="smm" />
                    </div>
                  );
                } else if (isFinTrackRelated) {
                  return (
                    <div className="mt-12">
                      <CTASection type="fintrack" />
                    </div>
                  );
                } else if (isToolsRelated) {
                  return (
                    <div className="mt-12">
                      <CTASection type="tools" />
                    </div>
                  );
                }
                return null;
              })()}

              {/* Related Tools - Show for tool-related posts */}
              {(() => {
                const isToolsRelated = post.categories.some(cat => 
                  cat.toLowerCase().includes('tool') || 
                  cat.toLowerCase().includes('developer') ||
                  cat.toLowerCase().includes('json') ||
                  cat.toLowerCase().includes('seo') ||
                  cat.toLowerCase().includes('image') ||
                  cat.toLowerCase().includes('pdf')
                ) || post.tags.some(tag => 
                  tag.toLowerCase().includes('tool') ||
                  tag.toLowerCase().includes('developer') ||
                  tag.toLowerCase().includes('json') ||
                  tag.toLowerCase().includes('formatter')
                );

                if (isToolsRelated) {
                  // Try to find related tools based on tags
                  const toolKeywords = post.tags.filter(tag => 
                    tag.toLowerCase().includes('json') ||
                    tag.toLowerCase().includes('image') ||
                    tag.toLowerCase().includes('pdf') ||
                    tag.toLowerCase().includes('seo') ||
                    tag.toLowerCase().includes('html')
                  );
                  
                  return (
                    <div className="mt-12">
                      <RelatedTools 
                        category={toolKeywords[0]?.toLowerCase() || undefined}
                        limit={3}
                      />
                    </div>
                  );
                }
                return null;
              })()}

              {/* Ad before related posts */}
              <AdSenseDisplay format="horizontal" minHeight={100} className="mt-12 mb-8" />

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-16 pt-12 border-t">
                  <RelatedPosts posts={relatedPosts} />
                </div>
              )}

              {/* Matched content ad after article */}
              <AdSenseMatchedContent minHeight={200} className="mt-12" />

              {/* Display ad after article */}
              <AdSenseDisplay format="auto" minHeight={250} className="mt-12" />
            </div>
          </div>
        </article>
      </>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}
