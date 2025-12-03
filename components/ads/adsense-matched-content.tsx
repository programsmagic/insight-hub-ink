"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AdSenseMatchedContentProps {
  /**
   * Ad slot ID from Google AdSense (optional, uses default from NEXT_PUBLIC_GOOGLE_ADSENSE_MATCHED_CONTENT_SLOT if not provided)
   */
  adSlot?: string;
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
 * Google AdSense Matched Content Component
 * 
 * Renders a matched content unit that shows related content recommendations.
 * Best used on blog pages and content-heavy pages.
 */
export function AdSenseMatchedContent({
  adSlot,
  className,
  showPlaceholder = true,
  minHeight = 200,
}: AdSenseMatchedContentProps) {
  const adRef = useRef<HTMLDivElement>(null);
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

  // Use provided adSlot or default from environment variable
  const finalAdSlot = adSlot || process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_MATCHED_CONTENT_SLOT;
  
  // Don't render if no ad slot is available
  if (!finalAdSlot) {
    console.warn("AdSenseMatchedContent: No ad slot provided and NEXT_PUBLIC_GOOGLE_ADSENSE_MATCHED_CONTENT_SLOT is not set. Ad will not render.");
    return null;
  }

  return (
    <div
      className={cn(
        "adsense-matched-content my-6 flex justify-center",
        "min-h-[200px] w-full",
        className
      )}
      style={{ minHeight: `${minHeight}px` }}
    >
      {isLoading && showPlaceholder && !hasError && (
        <div
          className="w-full bg-muted/50 rounded-md animate-pulse flex items-center justify-center"
          style={{ minHeight: `${minHeight}px` }}
        >
          <span className="text-xs text-muted-foreground">Loading recommendations...</span>
        </div>
      )}

      {hasError && (
        <div
          className="w-full bg-muted/30 rounded-md flex items-center justify-center"
          style={{ minHeight: `${minHeight}px` }}
        >
          <span className="text-xs text-muted-foreground">Recommendations unavailable</span>
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
        data-ad-slot={finalAdSlot}
        data-ad-format="autorelaxed"
        data-matched-content-ui-type="image_stacked"
        data-matched-content-rows-num="3"
        data-matched-content-columns-num="1"
      />
    </div>
  );
}

