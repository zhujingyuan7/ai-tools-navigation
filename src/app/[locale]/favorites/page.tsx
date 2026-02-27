'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { useFavorites } from '@/hooks/useFavorites';
import { tools } from '@/data/tools';
import Link from 'next/link';

export default function FavoritesPage() {
  const { t, locale } = useTranslations();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favoriteTools = tools.filter(tool => favorites.includes(tool.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <a
              href={`/${locale}`}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← {t('back_to_home')}
            </a>
            <span className="text-gray-500">/</span>
            <span className="font-semibold text-white">
              {t('favorites')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {favoriteTools.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {t('no_favorites')}
            </h1>
            <p className="text-gray-400">
              {t('no_favorites_desc')}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all"
            >
              {t('explore_tools')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteTools.map((tool) => (
              <div key={tool.id} className="glass-effect rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl bg-gradient-to-br from-primary-400 to-indigo-500 p-3 rounded-lg">
                      {tool.icon}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {tool.name}
                      </h3>
                      <button
                        onClick={() => toggleFavorite(tool.id)}
                        className={`p-2 rounded-lg transition-all ${
                          isFavorite(tool.id)
                            ? 'bg-red-500 hover:bg-red-600 text-red-100'
                            : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                        }`}
                        title={isFavorite(tool.id) ? '取消收藏' : '收藏'}
                      >
                        {isFavorite(tool.id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                  </div>
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                  >
                    {t('visit_website')}
                  </a>
                </div>
                <p className="text-gray-300 mt-2 line-clamp-2">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded">
                    {tool.category}
                  </span>
                  {tool.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-primary-500/10 text-primary-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <svg
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l2.8 2.034c-.784.57-.38-1.81.588 1.81h3.461a1 1 0 00.951-.69l1.07 3.292z" />
                  </svg>
                  <span className="text-sm text-slate-300">{tool.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
