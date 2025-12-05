"use client";

import { useEffect, useCallback } from "react";
import { track } from "@vercel/analytics";

interface AnalyticsMetadata {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Custom hook for tracking tool usage analytics
 * Supports Vercel Analytics and can be extended for other analytics providers
 */
export function useToolAnalytics(toolId: string) {
  /**
   * Track tool page view
   */
  const trackView = useCallback(() => {
    try {
      track("tool_view", {
        tool_id: toolId,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      // Silently fail if analytics is not available
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.debug("Analytics tracking failed:", error);
      }
    }
  }, [toolId]);

  /**
   * Track tool usage events (generate, convert, download, etc.)
   */
  const trackUsage = useCallback(
    (action: string, metadata?: AnalyticsMetadata) => {
      try {
        track("tool_usage", {
          tool_id: toolId,
          action,
          ...metadata,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.debug("Analytics tracking failed:", error);
        }
      }
    },
    [toolId]
  );

  /**
   * Track errors that occur in tools
   */
  const trackError = useCallback(
    (error: string, context?: AnalyticsMetadata) => {
      try {
        track("tool_error", {
          tool_id: toolId,
          error,
          ...context,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.debug("Analytics tracking failed:", err);
        }
      }
    },
    [toolId]
  );

  /**
   * Track user interactions (button clicks, feature usage, etc.)
   */
  const trackInteraction = useCallback(
    (element: string, action: string, metadata?: AnalyticsMetadata) => {
      try {
        track("tool_interaction", {
          tool_id: toolId,
          element,
          action,
          ...metadata,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.debug("Analytics tracking failed:", error);
        }
      }
    },
    [toolId]
  );

  // Track page view on mount
  useEffect(() => {
    trackView();
  }, [trackView]);

  return {
    trackView,
    trackUsage,
    trackError,
    trackInteraction,
  };
}

