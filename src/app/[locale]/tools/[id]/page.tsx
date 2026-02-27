'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';
import { tools } from '@/data/tools';
import { useAnalytics } from '@/hooks/useAnalytics';
import { categories } from '@/data/tools';

export default function ToolDetailPage() {
  const params = useParams();
  const { locale } = params;
  const { t, lang } = useTranslations();
  const { trackEvent } = useAnalytics();

  const toolId = params.id as string;
  const tool = tools.find(t => t.id === toolId);

  const handleVisitWebsite = () => {
    if (tool?.website) {
      trackEvent('tool_website_click', {
        tool_id: toolId,
        tool_name: tool?.name || '',
      });
      window.open(tool.website, '_blank');
    }
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (tool) {
      const exists = favorites.includes(toolId);
      if (exists) {
        const updated = favorites.filter((id: string) => id !== toolId);
        localStorage.setItem('favorites', JSON.stringify(updated));
        trackEvent('tool_unfavorite', { tool_id: toolId });
      } else {
        const updated = [...favorites, toolId];
        localStorage.setItem('favorites', JSON.stringify(updated));
        trackEvent('tool_favorite', { tool_id: toolId });
      }
    }
  };

  const isFavorite = tool ? JSON.parse(localStorage.getItem('favorites') || '[]').includes(toolId) : false;

  if (!tool) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-gray-400">{t('tool_not_found')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Breadcrumb Navigation */}
      <nav className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <a
              href={`/${locale}`}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← {t('back_to_home')}
            </a>
            <span className="text-gray-500">/</span>
            <a
              href={`/${locale}#${tool?.category}`}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {t(tool?.category || '')}
            </a>
            <span className="text-gray-500">/</span>
            <span className="font-semibold text-white">
              {tool?.name || ''}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tool Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-6xl">{tool?.icon || '🤖'}</span>
                  <h1 className="text-4xl font-bold text-white">
                    {tool?.name || ''}
                  </h1>
                </div>
                {tool?.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                    {t('featured')}
                  </span>
                )}
              </div>
              <button
                onClick={handleFavorite}
                className={`p-3 rounded-lg transition-all ${
                  isFavorite
                    ? 'bg-red-500 hover:bg-red-600 text-red-100'
                    : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                }`}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-4">
              <span className="text-yellow-400 text-2xl">{'★'.repeat(Math.round(tool?.rating || 0))}</span>
              <span className="text-gray-400 text-sm">
                {tool?.rating?.toFixed(1) || '0.0'}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {t('description')}: {tool?.description || ''}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(tool?.tags || []).map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-700/50 rounded-full text-purple-300 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                {tool?.category || ''}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleVisitWebsite}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg"
              >
                {t('visit_website')}
              </button>
              {tool?.website && (
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all text-center"
                  onClick={(e) => {
                    trackEvent('tool_website_click', {
                      tool_id: toolId,
                      tool_name: tool.name || '',
                    });
                  }}
                >
                  {t('learn_more')}
                </a>
              )}
            </div>
          </div>

          {/* Right: Quick Tips */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">
                💡 {t('quick_tips')}
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-300 flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  <span>{t('tip_1')}</span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  <span>{t('tip_2')}</span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  <span>{t('tip_3')}</span>
                </li>
              </ul>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">
                ⌨️ {t('keyboard_shortcuts')}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300">
                  <kbd className="px-2 py-1 bg-slate-700 rounded text-purple-300">B</kbd> - {t('shortcut_back')}
                </li>
                <li className="text-gray-300">
                  <kbd className="px-2 py-1 bg-slate-700 rounded text-purple-300">F</kbd> - {t('shortcut_favorite')}
                </li>
                <li className="text-gray-300">
                  <kbd className="px-2 py-1 bg-slate-700 rounded text-purple-300">R</kbd> - {t('shortcut_refresh')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
