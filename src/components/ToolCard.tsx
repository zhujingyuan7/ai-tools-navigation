'use client';

import { useState } from 'react';
import { Heart, ExternalLink, Star, Users, TrendingUp } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    category: string;
    rating: number;
    priceType: string;
    website: string;
    tags: string[];
    featured?: boolean;
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { trackToolCardClick, trackToolWebsiteClick } = useAnalytics();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleFavoriteClick = () => {
    toggleFavorite(tool.id);
    trackToolCardClick(tool.id, tool.name, tool.category);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <div
      className={`relative paper-card overflow-hidden group animate-fade-in
                 ${isHovered ? 'scale-[1.02]' : ''}
                 ${isPressed ? 'scale-[0.98]' : ''}
                 ${isFavorite(tool.id) ? 'ring-2 ring-accent-500/50 ring-offset-2' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* 纸张光泽效果 */}
      {isHovered && (
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none transition-opacity duration-300" />
      )}

      {/* Card Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary-700 transition-colors duration-200 truncate">
              {tool.name}
            </h3>
            {tool.featured && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Star className="w-3.5 h-3.5 text-accent-500 fill-current" />
                <span className="px-2 py-0.5 bg-accent-500/20 text-accent-700 border border-accent-500/30 rounded text-xs font-semibold">
                  精选
                </span>
              </div>
            )}
          </div>

          {/* 收藏按钮 - 纸张质感 */}
          <button
            onClick={handleFavoriteClick}
            className={`relative p-2 rounded-lg transition-all duration-200
                         ${isFavorite(tool.id) 
                           ? 'bg-accent-500/20 text-accent-600 hover:bg-accent-500/30' 
                           : 'bg-secondary-500/20 text-foreground/60 hover:bg-secondary-500/30 hover:text-foreground'
                         }`}
            aria-label={isFavorite(tool.id) ? "从收藏中移除" : "添加到收藏"}
          >
            <Heart 
              className={`w-5 h-5 transition-transform duration-200 
                              ${isFavorite(tool.id) 
                                ? 'fill-current scale-90' 
                                : 'group-hover:scale-110'
                              }`} 
            />
          </button>
        </div>

        {/* Description */}
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2 leading-relaxed min-h-[2.5em]">
          {tool.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="tag px-2 py-1 bg-primary-500/20 text-primary-700 border border-primary-500/30 rounded text-xs font-semibold">
              {tool.category}
            </span>
            <span className="tag px-2 py-1 bg-secondary-500/20 text-foreground/70 border border-secondary-500/30 rounded text-xs font-semibold">
              {tool.priceType}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-accent-500 fill-current" />
              <span className="font-semibold text-foreground/80">{tool.rating}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 4).map((tag, index) => (
            <span
              key={tag}
              className={`tag px-3 py-1.5 rounded text-xs font-medium cursor-pointer
                         hover:bg-primary-500/30 hover:text-primary-700
                         transition-all duration-200 animate-fade-in`}
              style={{ animationDelay: `${index * 50}ms` }}
              aria-label={`标签: ${tag}`}
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 4 && (
            <span className="px-3 py-1.5 bg-secondary-500/20 text-foreground/50 border border-secondary-500/30 rounded text-xs font-medium">
              +{tool.tags.length - 4}
            </span>
          )}
        </div>

        {/* Action button - 纸张质感 */}
        <Link
          href={`/tools/${tool.id}`}
          onClick={() => trackToolWebsiteClick(tool.id, tool.name)}
          className="btn-paper w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm"
          aria-label={`查看详情: ${tool.name}`}
        >
          <span className="btn-content">查看详情</span>
          <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 纸张纹理覆盖 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-gradient-to-br from-transparent via-foreground/5 to-transparent mix-blend-multiply" />
    </div>
  );
}
