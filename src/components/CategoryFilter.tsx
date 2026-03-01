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

  return (
    <div className="space-y-8">
      {/* Category Filter with Apple-style glassmorphism */}
      <div className="apple-glass rounded-3xl p-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between mb-5 text-left transition-all duration-[300ms]"
          aria-expanded={isOpen}
          aria-controls="category-filter"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              📁 分类筛选
              <ChevronDown
                className={`w-5 h-5 ml-2 transition-transform duration-[300ms] ${isOpen ? 'rotate-180' : ''}`}
              />
            </h3>
          </div>
        </button>

        <div
          id="category-filter"
          className={`overflow-hidden transition-all duration-[300ms] ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="space-y-2 pt-2">
            {/* All */}
            <button
              onClick={() => {
                setPriceFilter('all');
                onFilterChange('all');
              }}
              className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-[200ms] text-left hover:translate-x-1 ${
                selectedCategory === 'all' && priceFilter === 'all'
                  ? 'btn btn-primary'
                  : 'btn btn-secondary'
              }`}
            >
              🎯 全部
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onFilterChange(category)}
                className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-[200ms] text-left hover:translate-x-1 ${
                  selectedCategory === category && priceFilter === 'all'
                    ? 'btn btn-primary'
                    : 'btn btn-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price Filter with Apple-style glassmorphism */}
      <div className="apple-glass rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
          💰 价格筛选
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handlePriceFilter('all')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-[200ms] hover:translate-y-[-1px] hover:scale-[1.02] ${
              priceFilter === 'all' ? 'btn btn-primary' : 'btn btn-secondary'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => handlePriceFilter('free')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-[200ms] hover:translate-y-[-1px] hover:scale-[1.02] ${
              priceFilter === 'free' ? 'btn btn-primary' : 'btn btn-secondary'
            }`}
          >
            🆓 免费
          </button>
          <button
            onClick={() => handlePriceFilter('freemium')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-[200ms] hover:translate-y-[-1px] hover:scale-[1.02] ${
              priceFilter === 'freemium' ? 'btn btn-primary' : 'btn btn-secondary'
            }`}
          >
            🎁 Freemium
          </button>
          <button
            onClick={() => handlePriceFilter('paid')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-[200ms] hover:translate-y-[-1px] hover:scale-[1.02] ${
              priceFilter === 'paid' ? 'btn btn-primary' : 'btn btn-secondary'
            }`}
          >
            💎 付费
          </button>
        </div>
      </div>
    </div>
  );
}
