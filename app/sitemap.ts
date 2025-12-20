import { MetadataRoute } from 'next';
import { allTools } from '@/app/tools/data';
import { getBlogPosts } from '@/lib/services/blog-api';
import { env } from '@/lib/env';

const SITE_URL = env.getOptionalWithDefault(
  'NEXT_PUBLIC_SITE_URL',
  'https://insighthub.ink'
);

/**
 * Generate dynamic sitemap for Google indexing
 * Includes all static pages, tools, and blog posts
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL.replace(/\/$/, ''); // Remove trailing slash

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/smm`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fintrack`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Generate tool pages
  const toolPages: MetadataRoute.Sitemap = allTools.map((tool) => ({
    url: `${baseUrl}${tool.route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Fetch all blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    // Fetch first page to get total count
    const firstPage = await getBlogPosts({ page: 1, limit: 50 });
    const totalPages = firstPage.pagination.totalPages;

    // Collect all posts from first page
    blogPages = firstPage.posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at
        ? new Date(post.updated_at)
        : new Date(post.published_date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Fetch remaining pages if any
    if (totalPages > 1) {
      const remainingPages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) =>
          getBlogPosts({ page: i + 2, limit: 50 })
        )
      );

      remainingPages.forEach((page) => {
        const posts = page.posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updated_at
            ? new Date(post.updated_at)
            : new Date(post.published_date),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
        blogPages.push(...posts);
      });
    }
  } catch (error) {
    // Log error but don't fail sitemap generation
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Combine all pages
  return [...staticPages, ...toolPages, ...blogPages];
}

