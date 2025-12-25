import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  type: 'smm' | 'fintrack' | 'tools';
  className?: string;
}

/**
 * Reusable CTA sections for blog posts
 * Links to SMM, FinTrack, or Tools pages with contextual messaging
 */
export function CTASection({ type, className }: CTASectionProps) {
  const configs = {
    smm: {
      title: 'Ready to Grow Your Social Media?',
      description: 'Get premium-quality views, subscribers, likes, and watch hours with instant delivery. 100% satisfaction guaranteed.',
      href: '/smm',
      buttonText: 'Explore SMM Services',
      externalHref: 'https://smm.insighthub.ink',
      externalButtonText: 'Buy Services Now',
    },
    fintrack: {
      title: 'Start Tracking Your Finances Today',
      description: 'Track expenses, plan goals, and get AI-powered insights. 100% free to start, no credit card required.',
      href: '/fintrack',
      buttonText: 'Learn More About FinTrack',
      externalHref: 'https://fintrack.insighthub.ink',
      externalButtonText: 'Start Free with Google',
    },
    tools: {
      title: 'Try Our Free Developer Tools',
      description: 'Access 200+ free tools including JSON formatters, image resizers, PDF tools, and SEO utilities. All tools work instantly in your browser.',
      href: '/tools',
      buttonText: 'Explore All Tools',
      externalHref: '/tools',
      externalButtonText: 'View Tools',
    },
  };

  const config = configs[type];

  return (
    <Card className={cn('p-6 sm:p-8 border-2 border-accent/20 bg-accent/5', className)}>
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{config.title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
          {config.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            {type === 'tools' ? (
              <Link href={config.href} className="flex items-center">
                {config.buttonText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            ) : (
              <a
                href={config.externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                {config.externalButtonText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            )}
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={config.href} className="flex items-center">
              {config.buttonText}
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

