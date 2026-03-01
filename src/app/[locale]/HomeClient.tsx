'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SmartSearchBox from '@/components/search/SmartSearchBox';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import { Sparkles, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { aiTools } from '@/data/tools';

export default function HomeClient() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = useMemo(() => {
    return aiTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const [filterType, filterValue] = selectedCategory.split('_');
      
      const matchesCategory = filterType === 'all' || filterValue === 'all' || tool.category === filterValue;
      const matchesPrice = filterType !== 'price' || (filterValue === 'all' || 
        (filterValue === 'free' && tool.priceType === 'free') ||
        (filterValue === 'freemium' && tool.priceType === 'freemium') ||
        (filterValue === 'paid' && tool.priceType === 'paid')
      );

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory]);

  const featuredTools = useMemo(() => {
    return aiTools.filter((tool) => tool.featured);
  }, []);

  const featureCards = [
    {
      title: '智能推荐',
      description: '基于您的使用习惯，发现最适合的 AI 工具',
      icon: Sparkles,
      href: '/recommendations',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: '新工具发现',
      description: '第一时间发现最新发布的 AI 工具',
      icon: Clock,
      href: '/new-tools',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      title: '热门趋势',
      description: '社区最受欢迎的工具榜单',
      icon: TrendingUp,
      href: '/trending',
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-400 mb-4">
              Waffle Brain
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              发现和探索最好的人工智能工具
            </p>
          </div>

          {/* 智能搜索框 */}
          <div className="mb-8 animate-slide-up">
            <SmartSearchBox onSearch={setSearchQuery} placeholder="搜索 AI 工具、功能或标签..." />
          </div>

          {/* 新功能入口卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {featureCards.map((card, index) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <Link href={card.href} className="block">
                  <div className={`bg-gradient-to-br ${card.gradient} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 h-full`}>
                    <card.icon className="w-10 h-10 mb-4 opacity-90" />
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{card.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      探索更多
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 分类筛选 */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onFilterChange={setSelectedCategory}
            />
          </div>

          {/* 精选工具 */}
          {searchQuery === '' && selectedCategory === 'all' && (
            <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                精选工具
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          )}

          {/* 工具列表 */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              {selectedCategory === 'all'
                ? '所有工具'
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
                <p className="text-xl text-slate-400">没有找到匹配的工具</p>
                <p className="text-sm text-slate-500 mt-2">试试其他关键词</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 Waffle Brain. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
