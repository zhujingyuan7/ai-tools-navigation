'use client';

import { useState } from 'react';
import { categories } from '@/data/tools';

interface CategoryFilterProps {
  selectedCategory: string;
  onFilterChange: (filter: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'freemium' | 'paid'>('all');

  const handlePriceFilter = (priceType: 'all' | 'free' | 'freemium' | 'paid') => {
    setPriceFilter(priceType);
    onCategoryChange(selectedCategory === 'all' && priceType === 'all' ? 'all' : `${selectedCategory}_${priceType}`);
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <span>📂</span> 分类
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            key="all"
            onClick={() => {
              setPriceFilter('all');
              onCategoryChange('all');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === 'all' && priceFilter === 'all'
                ? 'bg-gradient-to-r from-primary-500 to-indigo-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
            }`}
          >
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category && priceFilter === 'all'
                  ? 'bg-gradient-to-r from-primary-500 to-indigo-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <span>💰</span> 价格筛选
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => handlePriceFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              priceFilter === 'all'
                ? 'bg-gradient-to-r from-primary-500 to-indigo-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => handlePriceFilter('free')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              priceFilter === 'free'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
            }`}
          >
            免费
          </button>
          <button
            onClick={() => handlePriceFilter('freemium')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              priceFilter === 'freemium'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
            }`}
          >
            Freemium
          </button>
          <button
            onClick={() => handlePriceFilter('paid')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              priceFilter === 'paid'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
            }`}
          >
            付费
          </button>
        </div>
      </div>
    </div>
  );
}
