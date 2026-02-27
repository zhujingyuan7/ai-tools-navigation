/**
 * Custom hook for analytics tracking
 * Provides a convenient interface for tracking user interactions
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  trackPageView,
  trackToolClick,
  trackSearch,
  trackCategoryChange,
  trackLanguageChange,
  trackWebsiteClick,
  trackPageStay,
} from '@/lib/analytics';

export function useAnalytics() {
  const pageStartTime = useRef(Date.now());
  const currentPath = useRef<string>('');

  /**
   * Track page view automatically on mount
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      currentPath.current = window.location.pathname;
      trackPageView();
    }
  }, []);

  /**
   * Track tool card click
   */
  const trackToolCardClick = useCallback((toolId: string, toolName: string, category: string) => {
    trackToolClick(toolId, toolName, category);
  }, []);

  /**
   * Track search
   */
  const trackSearchQuery = useCallback((query: string, resultCount: number) => {
    trackSearch(query, resultCount);
  }, []);

  /**
   * Track category change
   */
  const trackCategoryFilter = useCallback((category: string) => {
    trackCategoryChange(category);
  }, []);

  /**
   * Track language change
   */
  const trackLanguageToggle = useCallback((language: string) => {
    trackLanguageChange(language);
  }, []);

  /**
   * Track website link click
   */
  const trackToolWebsiteClick = useCallback((toolId: string, toolName: string) => {
    trackWebsiteClick(toolId, toolName);
  }, []);

  /**
   * Track page stay duration (call this before leaving page)
   */
  const trackStayDuration = useCallback(() => {
    const duration = Math.floor((Date.now() - pageStartTime.current) / 1000);
    if (duration > 0) {
      trackPageStay(currentPath.current, duration);
    }
    return duration;
  }, []);

  /**
   * Reset page start time (useful for SPA navigation)
   */
  const resetPageTimer = useCallback(() => {
    if (typeof window !== 'undefined') {
      currentPath.current = window.location.pathname;
    }
    pageStartTime.current = Date.now();
  }, []);

  return {
    trackToolCardClick,
    trackSearchQuery,
    trackCategoryFilter,
    trackLanguageToggle,
    trackToolWebsiteClick,
    trackStayDuration,
    resetPageTimer,
  };
}
