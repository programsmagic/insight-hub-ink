"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AdSenseDisplayProps {
  /**
   * Ad slot ID from Google AdSense (optional, uses default if not provided)
   */
  adSlot?: string;
  /**
   * Ad format: 'auto' for responsive, or specific dimensions like '300x250'
   */
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
  /**
   * Custom className for styling
   */
  className?: string;
  /**
   * Whether to show a placeholder while loading
   */
  showPlaceholder?: boolean;
  /**
   * Minimum height for the ad container (prevents layout shift)
   */
  minHeight?: number;
}

/**
 * Google AdSense Display Ad Component
 * 
 * Renders a responsive display ad unit with proper initialization
 * and error handling. Follows AdSense best practices.
 */
export function AdSenseDisplay({
  adSlot,
  format = "auto",
  className,
  showPlaceholder = true,
  minHeight = 100,
}: AdSenseDisplayProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isAdSenseLoaded, setIsAdSenseLoaded] = useState(false);

  useEffect(() => {
    // Don't initialize if already initialized or has error
    if (isAdSenseLoaded || hasError) return;

    // Check if AdSense script is loaded
    const checkAdSense = () => {
      return typeof window !== "undefined" && (window as any).adsbygoogle;
    };

    // Function to initialize ad
    const initializeAd = () => {
      if (!adRef.current || hasError) return;

      try {
        // Push ad to AdSense queue
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        setIsAdSenseLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error("AdSense initialization error:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Try to initialize immediately if already loaded
    if (checkAdSense()) {
      initializeAd();
      return;
    }

    // Wait for script to load
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max (50 * 100ms)
    const interval = setInterval(() => {
      attempts++;
      if (checkAdSense()) {
        clearInterval(interval);
        initializeAd();
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        setHasError(true);
        setIsLoading(false);
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [hasError, isAdSenseLoaded]);

  // Don't render if AdSense ID is not configured
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  if (!adsenseId) {
    return null;
  }

  // Determine ad format attributes
  const getFormatAttributes = () => {
    switch (format) {
      case "horizontal":
        return { "data-ad-format": "horizontal", "data-full-width-responsive": "true" };
      case "rectangle":
        return { "data-ad-format": "rectangle", "data-full-width-responsive": "true" };
      case "vertical":
        return { "data-ad-format": "vertical", "data-full-width-responsive": "true" };
      default:
        return { "data-full-width-responsive": "true" };
    }
  };

  return (
    <div
      className={cn(
        "adsense-container my-6 flex justify-center",
        "min-h-[100px] w-full",
        className
      )}
      style={{ minHeight: `${minHeight}px` }}
    >
      {isLoading && showPlaceholder && !hasError && (
        <div
          className="w-full bg-muted/50 rounded-md animate-pulse flex items-center justify-center"
          style={{ minHeight: `${minHeight}px` }}
        >
          <span className="text-xs text-muted-foreground">Loading ad...</span>
        </div>
      )}

      {hasError && (
        <div
          className="w-full bg-muted/30 rounded-md flex items-center justify-center"
          style={{ minHeight: `${minHeight}px` }}
        >
          <span className="text-xs text-muted-foreground">Ad unavailable</span>
        </div>
      )}

      <ins
        ref={adRef}
        className="adsbygoogle block text-center"
        style={{
          display: hasError ? "none" : "block",
          minHeight: `${minHeight}px`,
          minWidth: "320px",
        }}
        data-ad-client={adsenseId}
        data-ad-slot={adSlot}
        {...getFormatAttributes()}
      />
    </div>
  );
}

