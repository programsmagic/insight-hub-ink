import Link from 'next/link';
import { cn } from '@/lib/utils';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'underline';
}

/**
 * Smart internal linking component for blog posts
 * Provides consistent styling and SEO-friendly anchor text
 */
export function InternalLink({
  href,
  children,
  className,
  variant = 'default',
}: InternalLinkProps) {
  const baseStyles = 'transition-colors hover:text-accent';
  
  const variantStyles = {
    default: 'text-foreground hover:text-accent',
    accent: 'text-accent hover:text-accent/80 font-medium',
    underline: 'text-foreground hover:text-accent underline underline-offset-4',
  };

  return (
    <Link
      href={href}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </Link>
  );
}

