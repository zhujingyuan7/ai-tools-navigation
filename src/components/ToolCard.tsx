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

  const handleFavoriteClick = () => {
    toggleFavorite(tool.id);
    trackToolCardClick(tool.id, tool.name, tool.category);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={`relative glass rounded-2xl p-6 overflow-hidden group
                 hover:translate-y-[-8px] hover:rotate-x-[2deg] 
                 transition-all duration-[300ms] 
                 ${isHovered ? 'scale-[1.02]' : ''}
                 animate-fade-in`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Light Reflection Effect */}
      {isHovered && (
        <div className="light-reflection" />
      )}

      {/* Card Content */}
      <div className="relative z-10 card-content">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-[150ms]">
              {tool.name}
            </h3>
            {tool.featured && (
              <div className="flex items-center gap-1.5 mt-1">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span className="px-2 py-0.5 bg-warning/20 text-warning border border-warning/30 rounded text-xs font-semibold">
                  精选
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`btn-ghost relative p-2 rounded-lg 
                         group-hover:scale-105 transition-transform duration-[200ms] 
                         ${isFavorite(tool.id) ? 'text-error' : 'text-muted-foreground'}`}
            aria-label={isFavorite(tool.id) ? "从收藏中移除" : "添加到收藏"}
          >
            <Heart 
              className={`w-5 h-5 transition-transform duration-[200ms] 
                              ${isFavorite(tool.id) ? 'fill-current scale-90' : 'scale-100 group-hover:scale-110'}`} 
            />
            {isFavorite(tool.id) && (
              <div className="absolute inset-0 bg-error/20 rounded-lg scale-90" />
            )}
          </button>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed min-h-[2.5em]">
          {tool.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="tag px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs font-semibold text-primary">
              {tool.category}
            </span>
            <span className="tag px-2 py-1 bg-secondary/20 border border-secondary/30 rounded text-xs font-semibold text-secondary-foreground">
              {tool.priceType}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-semibold">⭐ {tool.rating}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 4).map((tag, index) => (
            <span
              key={tag}
              className={`tag px-3 py-1.5 rounded text-xs font-medium
                         hover:bg-primary/30 hover:text-primary
                         transition-all duration-[200ms] animate-fade-in`}
              style={{ animationDelay: `${index * 80}ms` }}
              aria-label={`标签: ${tag}`}
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 4 && (
            <span className="px-3 py-1.5 bg-surface border border-subtle rounded text-xs text-muted-foreground">
              +{tool.tags.length - 4}
            </span>
          )}
        </div>

        {/* Action button */}
        <Link
          href={`/tools/${tool.id}`}
          onClick={() => trackToolWebsiteClick(tool.id, tool.name)}
          className="btn btn-primary w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm"
          aria-label={`查看详情: ${tool.name}`}
        >
          查看详情
          <ExternalLink className="w-4 h-4 ml-1 transition-transform duration-[200ms] group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
