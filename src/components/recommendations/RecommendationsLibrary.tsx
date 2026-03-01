'use client';
import React from 'react';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, TrendingUp, Grid, MessageSquare, Image, Code, FileText, Layout, Search } from 'lucide-react';
import { Recommendation } from '@/types/recommendations';
import { recommendations, recommendationCategories } from '@/data/recommendations';
import { recommendationEngine } from '@/lib/recommendation-engine';

// 图标映射
const iconMap: Record<string, any> = {
  MessageSquare,
  Image,
  Code,
  FileText,
  Layout,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Grid,
};

export default function RecommendationsLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [personalizedRecs, setPersonalizedRecs] = useState<Recommendation[]>([]);
  const [communityRecs, setCommunityRecs] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 加载推荐数据
  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      try {
        const [personalized, community] = await Promise.all([
          recommendationEngine.getPersonalizedRecommendations(),
          recommendationEngine.getCommunityRecommendations(),
        ]);
        setPersonalizedRecs(personalized);
        setCommunityRecs(community);
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  // 根据选中的类别获取推荐
  const categoryRecs = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  return (
    <div className="w-full">
      {/* 推荐横幅 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-8 mb-8 text-white"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-10 h-10" />
          <h1 className="text-3xl font-bold">为您推荐</h1>
        </div>
        <p className="text-lg opacity-90 max-w-2xl">
          基于您的使用习惯，发现最适合的 AI 工具
        </p>
      </motion.div>

      {/* 个性化推荐 */}
      {!isLoading && personalizedRecs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            个性化推荐
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalizedRecs.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    rec.priority === 'high' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : rec.priority === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {rec.priority === 'high' ? '强烈推荐' : rec.priority === 'medium' ? '推荐' : '建议'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {rec.type === 'handpicked' ? '精选' : rec.type === 'algorithmic' ? '智能' : '社区'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {rec.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {rec.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {rec.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  包含 {rec.tools.length} 个工具
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 分类浏览 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Grid className="w-6 h-6 mr-2 text-blue-500" />
          按分类浏览
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recommendationCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer ${
                selectedCategory === cat.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'bg-white dark:bg-gray-800'
              } rounded-xl p-6 text-center shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300`}
            >
              {iconMap[cat.icon] && (
                <div className="flex justify-center mb-3">
                  {React.createElement(iconMap[cat.icon], {
                    className: 'w-12 h-12 text-blue-500 dark:text-blue-400'
                  })}
                </div>
              )}
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {cat.count} 个工具
              </p>
              {selectedCategory === cat.id && (
                <div className="mt-3 flex items-center justify-center text-sm text-blue-500 dark:text-blue-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  探索
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 分类推荐 */}
      {selectedCategory !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {recommendationCategories.find(c => c.id === selectedCategory)?.name} 推荐
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryRecs.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {rec.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {rec.description}
                </p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    核心功能：
                  </p>
                  <ul className="space-y-1">
                    {rec.features.map(feature => (
                      <li key={feature} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 社区热门推荐 */}
      {!isLoading && communityRecs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
            社区热门
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityRecs.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 shadow-lg border border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                    热门推荐
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {rec.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {rec.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>包含 {rec.tools.length} 个工具</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 加载状态 */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">加载推荐中...</p>
        </div>
      )}
    </div>
  );
}

