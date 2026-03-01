'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { useFavorites } from '@/hooks/useFavorites';
import { aiTools } from '@/data/tools';
import Link from 'next/link';

export default function FavoritesPage() {
  const t = useTranslations();
  const { favorites } = useFavorites();
  const favoriteTools = aiTools.filter(tool => favorites.includes(tool.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-400 mb-4">
            ⭐ 我的收藏
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            您收藏的 {favoriteTools.length} 个 AI 工具
          </p>
        </div>

        {favoriteTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteTools.map(tool => (
              <div key={tool.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{tool.description}</p>
                <Link
                  href={`/tools/${tool.id}`}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                >
                  查看详情 →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-xl text-slate-400">还没有收藏任何工具</p>
            <p className="text-sm text-slate-500 mt-2">浏览工具并点击收藏按钮</p>
          </div>
        )}
      </div>
    </div>
  );
}
