'use client';

import { trendingTools } from '@/data/trending';
import { TrendingUp, Eye, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import ToolCard from '@/components/ToolCard';

export default function TrendingLeaderboard() {
  return (
    <main className="min-h-screen paper-texture">
      <div className="relative overflow-hidden">
        {/* 温暖的渐变背景 */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-error-500/20 via-accent-500/20 to-error-600/20" />

        <div className="relative container mx-auto px-4 py-12">
          {/* 页面标题 - 纸张质感 */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block">
              {/* 装饰性纸张效果 */}
              <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-error-400 via-accent-400 to-error-500 transform rotate-3 scale-110" />
              
              <div className="relative">
                <h1 className="text-morandi-gradient text-shadow-paper text-4xl md:text-5xl font-extrabold mb-4 tracking-tight flex items-center justify-center gap-3">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-error-500/20 to-accent-500/20">
                    <Flame className="w-8 h-8 text-error-600" />
                  </div>
                  <span>热门工具排行榜</span>
                </h1>
              </div>
            </div>
            
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              根据访问量和收藏数，精选最受欢迎的 AI 工具
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in-up">
            {trendingTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="paper-card rounded-2xl p-6 relative hover:scale-102 transition-all duration-300">
                  {/* 排名徽章 - 纸张质感 */}
                  <div className={`absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' :
                    index === 2 ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' :
                    'bg-gradient-to-br from-secondary-400 to-secondary-500 text-white'
                  }`}>
                    <span className="relative z-10">{index + 1}</span>
                  </div>

                  <div className="pl-8">
                    <h3 className="text-xl font-bold text-foreground mb-2">{tool.name}</h3>
                    <p className="text-foreground/60 text-sm mb-4 leading-relaxed">{tool.description}</p>
                    <div className="flex items-center gap-4 text-sm text-foreground/50">
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>{tool.views}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-accent-500 fill-current" />
                        <span>{tool.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
