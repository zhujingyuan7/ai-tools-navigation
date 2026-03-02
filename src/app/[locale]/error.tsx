'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen paper-texture flex items-center justify-center p-4">
      <div className="paper-card max-w-md w-full p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {t('error.title') || '出错了'}
        </h2>
        <p className="text-foreground/70 mb-6">
          {t('error.description') || '抱歉，页面加载时出现了问题'}
        </p>
        <button
          onClick={reset}
          className="btn-paper px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
        >
          <span className="btn-content">{t('error.retry') || '重试'}</span>
        </button>
      </div>
    </div>
  );
}
