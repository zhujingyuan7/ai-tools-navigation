/**
 * Analytics utility functions for Umami
 * Provides a simple interface for tracking user interactions
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
      trackView: (url?: string, referrer?: string) => void;
    };
  }
}

const isEnabled = (): boolean => {
  return (
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' &&
    typeof window !== 'undefined' &&
    !!window.umami
  );
};

/**
 * Track a page view event
 * @param url - Optional URL to track (defaults to current page)
 * @param referrer - Optional referrer URL
 */
export const trackPageView = (url?: string, referrer?: string): void => {
  if (isEnabled() && window.umami) {
    window.umami.trackView(url, referrer);
  }
};

/**
 * Track a custom event
 * @param eventName - Name of the event to track
 * @param eventData - Optional data associated with the event
 */
export const trackEvent = (
  eventName: string,
  eventData?: Record<string, unknown>
): void => {
  if (isEnabled() && window.umami) {
    window.umami.track(eventName, eventData);
  }
};

/**
 * Track a tool card click
 * @param toolId - ID of the tool being clicked
 * @param toolName - Name of the tool
 * @param category - Category of the tool
 */
export const trackToolClick = (
  toolId: string,
  toolName: string,
  category: string
): void => {
  trackEvent('tool_click', {
    tool_id: toolId,
    tool_name: toolName,
    category: category,
  });
};

/**
 * Track search behavior
 * @param query - Search query string
 * @param resultCount - Number of search results
 */
export const trackSearch = (query: string, resultCount: number): void => {
  trackEvent('search', {
    query: query,
    result_count: resultCount,
  });
};

/**
 * Track category filter change
 * @param category - Selected category
 */
export const trackCategoryChange = (category: string): void => {
  trackEvent('category_change', {
    category: category,
  });
};

/**
 * Track language change
 * @param language - Selected language code
 */
export const trackLanguageChange = (language: string): void => {
  trackEvent('language_change', {
    language: language,
  });
};

/**
 * Track website link click (external link to tool's website)
 * @param toolId - ID of the tool
 * @param toolName - Name of the tool
 */
export const trackWebsiteClick = (
  toolId: string,
  toolName: string
): void => {
  trackEvent('website_click', {
    tool_id: toolId,
    tool_name: toolName,
  });
};

/**
 * Track page stay duration
 * @param page - Page path or name
 * @param duration - Duration in seconds
 */
export const trackPageStay = (page: string, duration: number): void => {
  trackEvent('page_stay', {
    page: page,
    duration_seconds: duration,
  });
};
