'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SmartSearchBox from '@/components/search/SmartSearchBox';
import ToolCard from '@/components/ToolCard';
import { Sparkles, Search, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { aiTools } from '@/data/tools';
import { categories } from '@/data/tools';

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

      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen paper-texture">
      <div className="relative overflow-hidden">
        {/* 温暖的渐变背景 */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary-500/20 via-accent-500/20 to-primary-600/20" />

        <div className="relative container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* 左侧液态玻璃分类导航栏 */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <nav className="paper-glass rounded-3xl p-6 h-[calc(100vh-4rem)] sticky top-8 overflow-y-auto custom-scrollbar">
                <div className="mb-6">
                  <Link 
                    href="/"
                    className="flex items-center gap-3 mb-6 text-foreground hover:text-primary-700 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">Waffle Brain</span>
                      <span className="text-xs text-foreground/50">AI 导航</span>
                    </div>
                  </Link>
                </div>

                <h3 className="text-sm font-bold text-foreground/70 mb-4 uppercase tracking-wider">
                  分类
                </h3>

                <ul className="space-y-1.5">
                  <li>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full px-4 py-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group
                                 ${selectedCategory === 'all' 
                                   ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md' 
                                   : 'text-foreground/70 hover:bg-secondary-500/30 hover:text-foreground'}`}
                    >
                      <div className={`p-2 rounded-lg ${selectedCategory === 'all' ? 'bg-white/20' : 'bg-secondary-500/30 group-hover:bg-primary-500/20'}`}>
                        <Search className="w-4 h-4" />
                      </div>
                      <span className="font-medium">全部</span>
                      {selectedCategory === 'all' && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  </li>

                  {categories.map((category, index) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full px-4 py-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group
                                   ${selectedCategory === category 
                                     ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md' 
                                     : 'text-foreground/70 hover:bg-secondary-500/30 hover:text-foreground'}`}
                      >
                        <div className={`p-2 rounded-lg ${selectedCategory === category ? 'bg-white/20' : 'bg-secondary-500/30 group-hover:bg-primary-500/20'}`}>
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{category}</span>
                        {selectedCategory === category && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>

            {/* 右侧内容区 */}
            <div className="flex-grow min-w-0">
              {/* 搜索框 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="mb-8 max-w-2xl mx-auto"
              >
                <div className="relative">
                  <div className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl" />
                  <SmartSearchBox onSearch={setSearchQuery} placeholder="搜索 AI 工具..." />
                </div>
              </motion.div>

              {/* 产品名称和 Slogan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                className="text-center mb-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative inline-block"
                >
                  {/* 装饰性纸张效果 */}
                  <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 transform rotate-3 scale-110" />
                  
                  {/* 产品名称 */}
                  <h1 className="relative text-morandi-gradient text-shadow-paper text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
                    Waffle Brain
                  </h1>
                  
                  {/* 装饰线条 */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" />
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                  className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mt-4 leading-relaxed"
                >
                  发现和探索最好的人工智能工具
                </motion.p>
              </motion.div>

              {/* AI工具卡片 - 每列3个 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <div className="inline-flex p-2 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                    <Lightbulb className="w-5 h-5 text-primary-600" />
                  </div>
                  {selectedCategory === 'all' ? '所有工具' : selectedCategory}
                  <span className="text-foreground/50 text-lg font-normal ml-2">
                    ({filteredTools.length})
                  </span>
                </h2>

                {filteredTools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                      >
                        <ToolCard tool={tool} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="paper-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">未找到匹配的工具</h2>
                    <p className="text-foreground/60">尝试调整搜索词或分类</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
