/**
 * Analytics Provider Component
 * Injects Umami Analytics script and provides tracking functionality
 */

'use client';

import { useEffect, useState } from 'react';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Only load analytics if enabled and in browser
    if (
      typeof window === 'undefined' ||
      process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true'
    ) {
      return;
    }

    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
    const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;

    if (!websiteId || !umamiUrl) {
      console.warn('Umami Analytics: Missing website ID or URL');
      return;
    }

    // Check if script is already loaded
    if (document.querySelector(`script[data-umami="${websiteId}"]`)) {
      return;
    }

    // Inject Umami script
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.setAttribute('data-website-id', websiteId);
    script.src = `${umamiUrl}/script.js`;
    script.setAttribute('data-umami', websiteId);

    script.onload = () => {
      console.log('Umami Analytics loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load Umami Analytics');
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Don't remove script as it may cause issues with multiple renders
      // The script will be cleaned up when the page unloads
    };
  }, []);

  // Track page visibility changes for session duration
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && window.umami) {
        // Track page leave time
        const startTime = window.sessionStorage.getItem('pageStartTime');
        if (startTime) {
          const duration = Math.floor((Date.now() - parseInt(startTime)) / 1000);
          window.umami.track('page_stay', {
            duration_seconds: duration,
            page: window.location.pathname,
          });
        }
      } else if (document.visibilityState === 'visible') {
        // Set start time when page becomes visible
        window.sessionStorage.setItem('pageStartTime', Date.now().toString());
      }
    };

    // Set initial start time
    window.sessionStorage.setItem('pageStartTime', Date.now().toString());

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMounted]);

  // Track page unload
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const handleBeforeUnload = () => {
      const startTime = window.sessionStorage.getItem('pageStartTime');
      if (startTime && window.umami) {
        const duration = Math.floor((Date.now() - parseInt(startTime)) / 1000);
        // Use sendBeacon for reliable tracking on page unload
        if (navigator.sendBeacon) {
          const data = JSON.stringify({
            type: 'page_stay',
            payload: {
              duration_seconds: duration,
              page: window.location.pathname,
            },
          });
          navigator.sendBeacon('/api/analytics', data);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isMounted]);

  // Don't render children until mounted to avoid hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
