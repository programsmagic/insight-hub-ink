'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link as LinkIcon,
  Check,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'icon-only';
}

export function SocialShare({ 
  url, 
  title, 
  className,
  variant = 'default'
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleShare = async (platform: 'twitter' | 'linkedin' | 'facebook') => {
    let shareLink = '';

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  type SharePlatform = 'twitter' | 'linkedin' | 'facebook' | 'copy';

  const shareButtons: Array<{
    platform: SharePlatform;
    icon: typeof Twitter;
    label: string;
    color: string;
    action?: () => void;
  }> = [
    {
      platform: 'twitter',
      icon: Twitter,
      label: 'Twitter',
      color: 'hover:text-[#1DA1F2]',
    },
    {
      platform: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      color: 'hover:text-[#0077B5]',
    },
    {
      platform: 'facebook',
      icon: Facebook,
      label: 'Facebook',
      color: 'hover:text-[#1877F2]',
    },
    {
      platform: 'copy',
      icon: copied ? Check : LinkIcon,
      label: copied ? 'Copied!' : 'Copy Link',
      color: copied ? 'text-green-600' : 'hover:text-accent',
      action: handleCopyLink,
    },
  ];

  if (variant === 'icon-only') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {shareButtons.map(({ platform, icon: Icon, label, color, action }) => (
          <Button
            key={platform}
            variant="ghost"
            size="icon"
            onClick={() => {
              if (action) {
                action();
              } else if (platform !== 'copy') {
                handleShare(platform as 'twitter' | 'linkedin' | 'facebook');
              }
            }}
            className={cn('h-9 w-9', color)}
            aria-label={label}
            title={label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Share2 className="h-4 w-4 text-muted-foreground" />
        {shareButtons.map(({ platform, icon: Icon, label, color, action }) => (
          <Button
            key={platform}
            variant="ghost"
            size="sm"
            onClick={() => {
              if (action) {
                action();
              } else if (platform !== 'copy') {
                handleShare(platform as 'twitter' | 'linkedin' | 'facebook');
              }
            }}
            className={cn('h-8 gap-1.5', color)}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Share this article</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {shareButtons.map(({ platform, icon: Icon, label, color, action }) => (
          <Button
            key={platform}
            variant="outline"
            size="sm"
            onClick={() => {
              if (action) {
                action();
              } else if (platform !== 'copy') {
                handleShare(platform as 'twitter' | 'linkedin' | 'facebook');
              }
            }}
            className={cn('gap-2', color)}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

