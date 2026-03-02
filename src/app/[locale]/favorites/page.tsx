'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { useFavorites } from '@/hooks/useFavorites';
import { aiTools } from '@/data/tools';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { Star, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
  const t = useTranslations();
  const { favorites } = useFavorites();
  const favoriteTools = aiTools.filter(tool => favorites.includes(tool.id));

  return (
    <main className="min-h-screen paper-texture">
      <div className="relative overflow-hidden">
        {/* 温暖的渐变背景 */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-accent-500/20 via-primary-500/20 to-accent-600/20" />

        <div className="relative container mx-auto px-4 py-8">
          {/* 页面标题 - 纸张质感 */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block mb-4">
              {/* 装饰性纸张效果 */}
              <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-accent-400 via-primary-400 to-accent-500 transform rotate-3 scale-110" />
              
              <div className="relative">
                <h1 className="text-morandi-gradient text-shadow-paper text-4xl md:text-5xl font-extrabold mb-4 tracking-tight flex items-center justify-center gap-3">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                    <Star className="w-8 h-8 text-accent-600 fill-current" />
                  </div>
                  <span>我的收藏</span>
                </h1>
              </div>
            </div>
            
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              您收藏的 <span className="font-bold text-primary-700">{favoriteTools.length}</span> 个 AI 工具
            </p>
          </div>

          {favoriteTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-in-up">
              {favoriteTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="paper-card rounded-2xl p-12 text-center max-w-2xl mx-auto animate-fade-in">
              <div className="text-6xl mb-6">⭐</div>
              <h2 className="text-2xl font-bold text-foreground mb-4">还没有收藏任何工具</h2>
              <p className="text-foreground/60 mb-6">浏览工具并点击收藏按钮，将您喜欢的工具添加到这里</p>
              <Link
                href="/"
                className="btn-paper inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
              >
                <span className="btn-content">浏览工具</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
