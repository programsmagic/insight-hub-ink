'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react';
import { AdSenseDisplay } from '@/components/ads';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
      // eslint-disable-next-line no-console
      console.error('Blog error:', error);
    }
  }, [error]);

  return (
    <div className="container mx-auto py-12 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="p-8 sm:p-12 text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Unable to Load Blog Posts
          </h1>
          <p className="text-muted-foreground mb-8">
            {error.message ||
              "We're having trouble loading the blog posts. This might be a temporary issue. Please try again."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} size="lg" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild size="lg">
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
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs bg-muted p-4 rounded overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </Card>
        
        {/* Ad after error content */}
        <AdSenseDisplay format="auto" minHeight={250} className="mt-8" />
      </div>
    </div>
  );
}


