'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { categories } from '@/data/tools';

interface CategoryFilterProps {
  selectedCategory: string;
  onFilterChange: (filter: string) => void;
}

export default function CategoryFilter({ selectedCategory, onFilterChange }: CategoryFilterProps) {
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'freemium' | 'paid'>('all');
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceFilter = (priceType: 'all' | 'free' | 'freemium' | 'paid') => {
    setPriceFilter(priceType);
    onFilterChange(selectedCategory === 'all' && priceType === 'all' ? 'all' : `${selectedCategory}_${priceType}`);
  };

  const isSelected = (category: string, type?: string) => {
    if (type) {
      return priceFilter === type && (category === 'all' || selectedCategory.includes(category));
    }
    return selectedCategory === category;
  };

  return (
    <div className="space-y-8">
      {/* Category Filter - 纸张质感 */}
      <div className="paper-glass rounded-3xl p-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between mb-5 text-left transition-all duration-300"
          aria-expanded={isOpen}
          aria-controls="category-filter"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
              <Filter className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span>📁</span>
              <span>分类筛选</span>
              <ChevronDown
                className={`w-5 h-5 ml-2 text-foreground/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </h3>
          </div>
        </button>

        <div
          id="category-filter"
          className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="space-y-2 pt-2">
            {/* All */}
            <button
              onClick={() => {
                setPriceFilter('all');
                onFilterChange('all');
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left relative overflow-hidden group
                         ${isSelected('all') && priceFilter === 'all'
                           ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                           : 'bg-secondary-500/20 text-foreground/80 hover:bg-secondary-500/30 hover:text-foreground'
                         }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🎯</span>
                <span>全部</span>
              </span>
              {isSelected('all') && priceFilter === 'all' && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onFilterChange(category)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left relative overflow-hidden group
                           ${isSelected(category) && priceFilter === 'all'
                             ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                             : 'bg-secondary-500/20 text-foreground/80 hover:bg-secondary-500/30 hover:text-foreground'
                           }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>📂</span>
                  <span>{category}</span>
                </span>
                {isSelected(category) && priceFilter === 'all' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price Filter - 纸张质感 */}
      <div className="paper-glass rounded-3xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-accent-500/20 to-primary-500/20">
            <span className="text-lg">💰</span>
          </div>
          <span className="ml-3">价格筛选</span>
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handlePriceFilter('all')}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-102 hover:-translate-y-0.5 relative overflow-hidden group
                       ${priceFilter === 'all'
                         ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                         : 'bg-secondary-500/20 text-foreground/80 hover:bg-secondary-500/30 hover:text-foreground'
                       }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>🌟</span>
              <span>全部</span>
            </span>
          </button>
          <button
            onClick={() => handlePriceFilter('free')}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-102 hover:-translate-y-0.5 relative overflow-hidden group
                       ${priceFilter === 'free'
                         ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                         : 'bg-secondary-500/20 text-foreground/80 hover:bg-secondary-500/30 hover:text-foreground'
                       }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>🆓</span>
              <span>免费</span>
            </span>
          </button>
          <button
            onClick={() => handlePriceFilter('freemium')}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-102 hover:-translate-y-0.5 relative overflow-hidden group
                       ${priceFilter === 'freemium'
                         ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                         : 'bg-secondary-500/20 text-foreground/80 hover:bg-secondary-500/30 hover:text-foreground'
                       }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>🎁</span>
              <span>Freemium</span>
            </span>
          </button>
          <button
            onClick={() => handlePriceFilter('paid')}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-102 hover:-translate-y-0.5 relative overflow-hidden group
                       ${priceFilter === 'paid'
                         ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                         : 'bg-secondary-500/20 text-foreground/80 hover:bg-secondary-500/30 hover:text-foreground'
                       }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>💎</span>
              <span>付费</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
