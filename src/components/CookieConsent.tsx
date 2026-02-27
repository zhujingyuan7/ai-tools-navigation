/**
 * Cookie Consent Component
 * GDPR-compliant privacy notice for analytics tracking
 */

'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    // Enable analytics
    window.dispatchEvent(new Event('cookie-consent-accepted'));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    // Disable analytics
    localStorage.setItem('disableAnalytics', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-700/50 backdrop-blur-sm z-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-300">
              🍪 我们使用 <span className="text-primary-400 font-medium">Umami Analytics</span> 来收集匿名使用数据，帮助我们改进网站体验。
              所有的数据都是匿名的，不会追踪您的个人身份信息。
            </p>
            <p className="text-xs text-slate-500 mt-1">
              符合 GDPR 隐私保护要求 · 您可以随时在设置中更改选择
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm text-slate-300 hover:text-slate-100 transition-colors"
            >
              拒绝
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-indigo-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
            >
              接受
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
