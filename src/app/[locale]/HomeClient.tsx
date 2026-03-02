'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SmartSearchBox from '@/components/search/SmartSearchBox';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import { Sparkles, Clock, TrendingUp, ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
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
      gradient: 'from-amber-600 to-orange-700',
      paperGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))',
    },
    {
      title: '新工具发现',
      description: '第一时间发现最新发布的 AI 工具',
      icon: Clock,
      href: '/new-tools',
      gradient: 'from-rose-600 to-pink-700',
      paperGradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(236, 72, 153, 0.15))',
    },
    {
      title: '热门趋势',
      description: '社区最受欢迎的工具榜单',
      icon: TrendingUp,
      href: '/trending',
      gradient: 'from-sky-600 to-blue-700',
      paperGradient: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(29, 78, 216, 0.15))',
    },
  ];

  return (
    <main className="min-h-screen paper-texture">
      <div className="relative overflow-hidden">
        {/* 温暖的渐变背景 */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary-500/20 via-accent-500/20 to-primary-600/20" />

        <div className="relative container mx-auto px-4 py-12">
          {/* 产品名称和 Slogan - 纸张质感设计 */}
          <div className="text-center mb-12 animate-fade-in">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative inline-block"
            >
              {/* 装饰性纸张效果 */}
              <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 transform rotate-3 scale-110" />
              
              {/* 产品名称 */}
              <h1 className="relative text-morandi-gradient text-shadow-paper text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
                Waffle Brain
              </h1>
              
              {/* 装饰线条 */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mt-6 leading-relaxed"
            >
              发现和探索最好的人工智能工具，让创意无限延伸
            </motion.p>
            
            {/* 装饰性图标 */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="flex justify-center gap-4 mt-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse delay-100" />
              <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse delay-200" />
            </motion.div>
          </div>

          {/* 智能搜索框 - 纸张质感 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl" />
              <SmartSearchBox onSearch={setSearchQuery} placeholder="搜索 AI 工具、功能或标签..." />
            </div>
          </motion.div>

          {/* 新功能入口卡片 - 纸张质感 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {featureCards.map((card, index) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={card.href} className="block h-full">
                  <div 
                    className="paper-card p-6 h-full transition-all duration-300"
                    style={{ background: card.paperGradient }}
                  >
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${card.gradient} text-white shadow-lg`}>
                        <card.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{card.title}</h3>
                      <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{card.description}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary-700 group-hover:text-primary-800 transition-colors">
                        探索更多
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* 分类筛选 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <CategoryFilter
              selectedCategory={selectedCategory}
              onFilterChange={setSelectedCategory}
            />
          </motion.div>

          {/* 精选工具 */}
          {searchQuery === '' && selectedCategory === 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                </div>
                精选工具
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </motion.div>
          )}

          {/* 工具列表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-secondary-500/20 to-primary-500/20">
                <Lightbulb className="w-5 h-5 text-primary-700" />
              </div>
              {selectedCategory === 'all'
                ? '所有工具'
                : selectedCategory}
              <span className="text-foreground/50 text-lg font-normal">
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
                <p className="text-xl text-foreground/60">没有找到匹配的工具</p>
                <p className="text-sm text-foreground/40 mt-2">试试其他关键词</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer - 纸张质感 */}
      <footer className="border-t border-foreground/10 mt-20 py-8 bg-gradient-to-b from-transparent to-primary-50/30">
        <div className="container mx-auto px-4 text-center text-foreground/50 text-sm">
          <div className="inline-flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>© 2024 Waffle Brain. All rights reserved.</span>
          </div>
          <p className="text-xs opacity-60">用心发现，用爱探索</p>
        </div>
      </footer>
    </main>
  );
}
