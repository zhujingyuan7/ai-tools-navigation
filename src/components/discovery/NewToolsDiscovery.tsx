'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Zap, Check, Star, Share2, ExternalLink } from 'lucide-react';
import { NewTool } from '@/types/recommendations';
import { newTools, timeRanges } from '@/data/recommendations';

export default function NewToolsDiscovery() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  // 根据时间范围过滤工具
  const filteredTools = newTools.filter(tool => {
    const now = Date.now();
    const releasedAt = tool.releasedAt.getTime();
    const diffHours = (now - releasedAt) / (1000 * 60 * 60);

    switch (timeRange) {
      case '24h':
        return diffHours <= 24;
      case '7d':
        return diffHours <= 168; // 7 * 24
      case '30d':
        return diffHours <= 720; // 30 * 24
      default:
        return true;
    }
  });

  // 格式化时间
  const formatTimeAgo = (date: Date) => {
    const now = Date.now();
    const diff = now - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="w-full">
      {/* 顶部时间筛选器 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Clock className="w-6 h-6 mr-2 text-blue-500" />
            新工具发现
          </h2>

          <div className="flex items-center gap-2">
            {timeRanges.map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id as '24h' | '7d' | '30d')}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  timeRange === range.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>找到 {filteredTools.length} 个新工具</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span>{filteredTools.filter(t => t.trending).length} 个正在上升</span>
          </div>
        </div>
      </motion.div>

      {/* 新工具时间轴 */}
      <div className="relative pl-8">
        {/* 时间轴线 */}
        <div className="timeline-line absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

        {/* 工具列表 */}
        <div className="space-y-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="timeline-item relative group"
            >
              {/* 时间点 */}
              <div className="timeline-dot absolute left-[-18px] w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 group-hover:scale-125 transition-transform shadow-lg shadow-blue-500/50" />

              {/* 工具卡片 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="tool-card relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group-hover:shadow-xl dark:group-hover:shadow-gray-900/30 transition-all duration-300"
              >
                {/* 新工具标识 */}
                {tool.trending && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="new-badge absolute -top-2 -right-2 flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                  >
                    <Zap className="w-3 h-3" />
                    新发布
                  </motion.div>
                )}

                {/* 工具徽章 */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {tool.badges.map(badge => (
                    <span
                      key={badge}
                      className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* 工具信息 */}
                <div className="flex items-start gap-4">
                  {/* 工具 logo */}
                  <div className="text-4xl">{tool.logo}</div>

                  <div className="flex-grow">
                    {/* 工具名称和类别 */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {tool.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                            {tool.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(tool.releasedAt)}
                          </span>
                        </div>
                      </div>

                      {/* 评分 */}
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-gray-900 dark:text-white">
                          {tool.rating}
                        </span>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* 功能列表 */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        核心功能：
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tool.features.map(feature => (
                          <div key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Check className="w-4 h-4 mr-2 text-blue-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 价格类型标签 */}
                    <div className="flex items-center gap-2 mb-4">
                      {tool.priceType === 'free' && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                          免费
                        </span>
                      )}
                      {tool.priceType === 'freemium' && (
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                          免费增值
                        </span>
                      )}
                      {tool.priceType === 'paid' && (
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                          付费
                        </span>
                      )}
                    </div>

                    {/* 快速操作 */}
                    <div className="flex items-center gap-3">
                      <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        访问网站
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                        分享
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">
              该时间段内没有新工具发布
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
