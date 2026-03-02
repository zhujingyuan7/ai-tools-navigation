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
      {/* 顶部时间筛选器 - 纸张质感 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="paper-glass rounded-2xl shadow-lg p-6 mb-8 border border-border-medium"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 mr-3">
              <Clock className="w-6 h-6 text-primary-600" />
            </div>
            新工具发现
          </h2>

          <div className="flex items-center gap-2">
            {timeRanges.map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id as '24h' | '7d' | '30d')}
                className={`px-4 py-2 rounded-xl transition-all font-medium relative overflow-hidden group
                           ${timeRange === range.id
                             ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                             : 'bg-secondary-500/20 text-foreground/70 hover:bg-secondary-500/30 hover:text-foreground'
                           }`}
              >
                <span className="relative z-10">{range.label}</span>
                {timeRange === range.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-foreground/60">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-warning-600" />
            <span>找到 <span className="font-bold text-foreground">{filteredTools.length}</span> 个新工具</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success-600" />
            <span><span className="font-bold text-foreground">{filteredTools.filter(t => t.trending).length}</span> 个正在上升</span>
          </div>
        </div>
      </motion.div>

      {/* 新工具时间轴 - 纸张质感 */}
      <div className="relative pl-8">
        {/* 时间轴线 */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-600 rounded-full" />

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
              {/* 时间点 - 纸张质感 */}
              <div className="timeline-dot absolute left-[-18px] w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 group-hover:scale-125 transition-transform shadow-lg shadow-primary-500/50 border-2 border-white" />

              {/* 工具卡片 - 纸张质感 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01, y: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="tool-card paper-card rounded-2xl p-6 border border-border-medium group-hover:border-primary-500/50 transition-all duration-300"
              >
                {/* 新工具标识 */}
                {tool.trending && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="new-badge absolute -top-2 -right-2 flex items-center gap-1 bg-gradient-to-r from-warning-500 to-warning-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/50"
                  >
                    <Zap className="w-3 h-3" />
                    新发布
                  </motion.div>
                )}

                {/* 工具徽章 - 纸张质感 */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {tool.badges.map(badge => (
                    <span
                      key={badge}
                      className="tag px-2 py-1 text-xs rounded-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-700 border border-primary-500/30 font-medium"
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
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {tool.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-foreground/60">
                          <span className="tag px-2 py-0.5 bg-secondary-500/30 text-foreground/70 border border-border-subtle rounded">
                            {tool.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(tool.releasedAt)}
                          </span>
                        </div>
                      </div>

                      {/* 评分 - 纸张质感 */}
                      <div className="flex items-center gap-1 bg-warning-500/10 px-3 py-1 rounded-xl border border-warning-500/20">
                        <Star className="w-4 h-4 text-warning-600 fill-current" />
                        <span className="font-bold text-foreground">
                          {tool.rating}
                        </span>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-foreground/70 mb-4 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* 功能列表 */}
                    <div className="mb-4">
                      <p className="text-sm font-bold text-foreground mb-2">
                        核心功能：
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tool.features.map(feature => (
                          <div key={feature} className="flex items-center text-sm text-foreground/60">
                            <Check className="w-4 h-4 mr-2 text-primary-600" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 价格类型标签 - 纸张质感 */}
                    <div className="flex items-center gap-2 mb-4">
                      {tool.priceType === 'free' && (
                        <span className="tag px-3 py-1 bg-success-500/20 text-success-700 border border-success-500/30 rounded-full text-sm font-medium">
                          免费
                        </span>
                      )}
                      {tool.priceType === 'freemium' && (
                        <span className="tag px-3 py-1 bg-primary-500/20 text-primary-700 border border-primary-500/30 rounded-full text-sm font-medium">
                          免费增值
                        </span>
                      )}
                      {tool.priceType === 'paid' && (
                        <span className="tag px-3 py-1 bg-accent-500/20 text-accent-700 border border-accent-500/30 rounded-full text-sm font-medium">
                          付费
                        </span>
                      )}
                    </div>

                    {/* 快速操作 - 纸张质感 */}
                    <div className="flex items-center gap-3">
                      <button
                        className="btn-paper flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="btn-content">访问网站</span>
                      </button>
                      <button className="tag flex items-center gap-2 px-4 py-2 bg-secondary-500/30 text-foreground/70 border border-border-subtle rounded-xl transition-all hover:bg-secondary-500/40 hover:text-foreground">
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

        {/* 空状态 - 纸张质感 */}
        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="paper-card rounded-2xl p-12 text-center"
          >
            <Clock className="w-16 h-16 mx-auto mb-4 text-foreground/30" />
            <p className="text-foreground/60 font-medium">
              该时间段内没有新工具发布
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
