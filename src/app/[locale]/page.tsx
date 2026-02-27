'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import { aiTools } from '@/data/tools';

export default function Home() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('categories.all'));

  const filteredTools = useMemo(() => {
    return aiTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === t('categories.all') || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, t]);

  const featuredTools = useMemo(() => {
    return aiTools.filter((tool) => tool.featured);
  }, []);

  return (
    <main className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-400 mb-4">
              {t('home.title')}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>

          <div className="mb-8 animate-slide-up">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {searchQuery === '' && selectedCategory === t('categories.all') && (
            <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                {t('featured.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          )}

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              {selectedCategory === t('categories.all')
                ? t('tools.allTools')
                : selectedCategory}
              <span className="text-slate-500 text-lg font-normal">
                ({filteredTools.length})
              </span>
            </h2>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-slate-400">{t('tools.noResults')}</p>
                <p className="text-sm text-slate-500 mt-2">{t('tools.tryOther')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </main>
  );
}
