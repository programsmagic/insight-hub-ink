import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

export default function BlogNotFound() {
  return (
    <div className="container mx-auto py-12 min-h-screen flex items-center justify-center">
      <Card className="p-8 sm:p-12 max-w-2xl mx-auto text-center">
        <div className="text-6xl sm:text-8xl font-bold mb-4 text-muted-foreground">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

