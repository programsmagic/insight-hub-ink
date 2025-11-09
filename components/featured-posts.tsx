export function FeaturedPosts() {
  const posts = [
    {
      title: "10 Productivity Hacks for Remote Teams",
      excerpt: "Discover proven strategies to boost your remote team's productivity and collaboration.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
      category: "Productivity",
      date: "Apr 15, 2024"
    },
    {
      title: "The Future of AI in Business",
      excerpt: "Explore how artificial intelligence is reshaping the business landscape in 2024 and beyond.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
      category: "Technology",
      date: "Apr 12, 2024"
    },
    {
      title: "Building a Strong Company Culture",
      excerpt: "Learn how to create and maintain a positive company culture that drives success.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      category: "Leadership",
      date: "Apr 10, 2024"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      {posts.map((post, index) => (
        <article key={index} className="group cursor-pointer">
          <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-accent">{post.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{post.date}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold group-hover:text-accent transition-colors">
              {post.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">{post.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  )
}