import { notFound } from "next/navigation";
import { blogPosts } from "../data";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-12">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="outline" className="mb-8">
          <Link href="/blog">← Back to Blog</Link>
        </Button>

        <div className="relative aspect-[16/9] mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2 text-sm mb-4">
          <span className="text-accent font-medium">{post.category}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{post.date}</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead">{post.excerpt}</p>
          
          {/* Example content - in a real app, this would come from your CMS */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Important point one about the topic</li>
            <li>Critical insight about the subject matter</li>
            <li>Practical application of the concepts</li>
            <li>Future implications and considerations</li>
          </ul>

          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2>Practical Applications</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo.
          </p>
        </div>
      </div>
    </article>
  );
}