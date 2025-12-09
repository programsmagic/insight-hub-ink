import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdSenseDisplay } from '@/components/ads';
import { PostCard } from '@/components/blog/post-card';
import { BlogPagination } from '@/components/blog/pagination';
import { SearchFilter } from '@/components/blog/search-filter';
import { getBlogPosts, getCategories } from '@/lib/services/blog-api';

interface BlogPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
}

export const metadata: Metadata = {
  title: 'Blog - Latest Insights & Articles',
  description:
    'Explore our latest articles on personal finance, money management, budgeting, investing, and financial planning. Expert tips and strategies to help you achieve your financial goals.',
  keywords: [
    'personal finance',
    'money management',
    'budgeting',
    'investing',
    'financial planning',
    'debt repayment',
    'savings',
    'financial tips',
  ],
  openGraph: {
    title: 'Blog - Latest Insights & Articles | InsightHub.ink',
    description:
      'Explore our latest articles on personal finance, money management, and financial planning.',
    type: 'website',
  },
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Parse search params with defaults
  const page = parseInt(searchParams.page || '1', 10);
  const limit = parseInt(searchParams.limit || '10', 10);
  const category = searchParams.category;
  const search = searchParams.search;
  const sortBy = searchParams.sortBy || 'published_date';
  const sortOrder = searchParams.sortOrder || 'desc';

  try {
    // Fetch posts and categories in parallel
    const [postsData, categoriesData] = await Promise.all([
      getBlogPosts({
        page,
        limit,
        category,
        search,
        sortBy,
        sortOrder,
      }),
      getCategories(),
    ]);

    const { posts, pagination } = postsData;
    const { categories } = categoriesData;

    // Create a map of category IDs to category objects for quick lookup
    const categoriesMap = new Map(
      categories.map((cat) => [cat.id, cat])
    );

    return (
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
            Latest Insights
          </h1>

          {/* Ad after header */}
          <AdSenseDisplay format="horizontal" minHeight={100} className="mb-6" />

          {/* Search and Filters */}
          <SearchFilter
            categories={categories}
            currentCategory={category}
            currentSearch={search}
            currentSortBy={sortBy}
            currentSortOrder={sortOrder}
          />

          {/* Blog Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No blog posts found.
                {search && ` Try adjusting your search terms.`}
                {category && ` Try selecting a different category.`}
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:gap-8">
                {posts.map((post, index) => (
                  <div key={post.id}>
                    <PostCard post={post} categoriesMap={categoriesMap} />

                    {/* Ad between posts (every 2 posts) */}
                    {index > 0 &&
                      (index + 1) % 2 === 0 &&
                      index < posts.length - 1 && (
                        <AdSenseDisplay
                          format="auto"
                          minHeight={250}
                          className="my-6"
                        />
                      )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-8">
                  <BlogPagination pagination={pagination} />
                </div>
              )}
            </>
          )}

          {/* Ad after all posts */}
          <AdSenseDisplay format="auto" minHeight={250} className="mt-8" />
        </div>
      </div>
    );
  } catch (error) {
    // Log error and show not found
    console.error('Error fetching blog posts:', error);
    notFound();
  }
}
