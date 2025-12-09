import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdSenseDisplay } from '@/components/ads';
import { PostCard } from '@/components/blog/post-card';
import { BlogPagination } from '@/components/blog/pagination';
import { SearchFilter } from '@/components/blog/search-filter';
import { getBlogPosts, getCategories } from '@/lib/services/blog-api';
import { BookOpen, FileText, Folder, Search as SearchIcon } from 'lucide-react';

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

    // Check if we have filters active
    const hasFilters = Boolean(search) || Boolean(category);
    const featuredPost = !hasFilters && posts.length > 0 ? posts[0] : null;
    const regularPosts = !hasFilters && posts.length > 0 ? posts.slice(1) : posts;

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary via-secondary/95 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-r from-accent/10 via-transparent to-primary/10 animate-pulse" style={{ filter: 'blur(100px)' }} />
          </div>
          
          <div className="container mx-auto max-w-7xl relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent mb-6 sm:mb-8">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium">Financial Insights & Tips</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Latest Insights
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10">
                Discover expert articles on personal finance, money management, investing, and financial planning to help you achieve your goals.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  <span className="font-semibold">{pagination.total}</span>
                  <span className="text-muted-foreground">Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-accent" />
                  <span className="font-semibold">{categories.length}</span>
                  <span className="text-muted-foreground">Categories</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Ad after hero */}
            <AdSenseDisplay format="horizontal" minHeight={100} className="mb-8" />

            {/* Search and Filters */}
            <SearchFilter
              categories={categories}
              currentCategory={category}
              currentSearch={search}
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
            />

            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-12 bg-accent rounded-full" />
                  <span className="text-sm font-semibold text-accent uppercase tracking-wide">Featured Article</span>
                </div>
                <PostCard post={featuredPost} categoriesMap={categoriesMap} featured />
              </div>
            )}

            {/* Blog Posts */}
            {regularPosts.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted mb-6">
                  <SearchIcon className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">No blog posts found</h2>
                <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
                  {search && `We couldn't find any posts matching "${search}".`}
                  {category && `No posts found in this category.`}
                  {!search && !category && `There are no blog posts available at the moment.`}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {search && (
                    <a
                      href="/blog"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
                    >
                      View All Posts
                    </a>
                  )}
                  {category && (
                    <a
                      href="/blog"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-accent/10 transition-colors"
                    >
                      Clear Category Filter
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <>
                {regularPosts.length > 0 && (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-1 w-12 bg-accent rounded-full" />
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      {featuredPost ? 'More Articles' : 'All Articles'}
                    </span>
                  </div>
                )}
                
                <div className="grid gap-6 sm:gap-8">
                  {regularPosts.map((post, index) => (
                    <div key={post.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                      <PostCard post={post} categoriesMap={categoriesMap} />

                      {/* Ad between posts (every 2 posts) */}
                      {index > 0 &&
                        (index + 1) % 2 === 0 &&
                        index < regularPosts.length - 1 && (
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
                  <div className="mt-12">
                    <BlogPagination pagination={pagination} />
                  </div>
                )}
              </>
            )}

            {/* Ad after all posts */}
            <AdSenseDisplay format="auto" minHeight={250} className="mt-12" />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Log error and show not found
    console.error('Error fetching blog posts:', error);
    notFound();
  }
}
