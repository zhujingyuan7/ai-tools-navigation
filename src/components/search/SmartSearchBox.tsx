'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp, Flame, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchHistory, SearchSuggestion } from '@/types/recommendations';
import { trendingSearches } from '@/data/recommendations';

interface SmartSearchBoxProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SmartSearchBox({ onSearch, placeholder = '搜索 AI 工具...' }: SmartSearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const searchRef = useRef<HTMLFormElement>(null);

  // 从本地存储加载搜索历史
  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = localStorage.getItem('searchHistory');
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (error) {
          console.error('Failed to load search history:', error);
        }
      }
    };
    
    loadHistory();
  }, []);

  // 点击外部关闭下拉
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 搜索联想
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);

    // 生成搜索建议
    if (value.length > 0) {
      const mockSuggestions: SearchSuggestion[] = [
        { type: 'history', text: value },
        { type: 'trending', text: `${value} AI`, icon: 'TrendingUp' },
        { type: 'trending', text: `${value} 2024`, icon: 'Flame' },
        { type: 'related', text: `${value} Pro`, icon: 'Zap' },
        { type: 'related', text: `Best ${value}`, icon: 'Star' },
      ];
      
      // 添加匹配的历史搜索
      const matchingHistory = history
        .filter(h => h.query.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3)
        .map(h => ({ type: 'history' as const, text: h.query, icon: 'Clock' }));
      
      setSuggestions([...matchingHistory, ...mockSuggestions]);
    } else {
      setSuggestions([]);
    }
  };

  // 处理建议点击
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setIsOpen(false);
    executeSearch(suggestion.text);
  };

  // 执行搜索
  const executeSearch = (searchQuery: string) => {
    // 添加到搜索历史
    const newHistory: SearchHistory = {
      id: Date.now().toString(),
      query: searchQuery,
      category: 'all',
      timestamp: new Date(),
      resultsCount: 0,
    };
    
    const updatedHistory = [newHistory, ...history.filter(h => h.query !== searchQuery)].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    // 调用搜索回调
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      executeSearch(query);
    }
  };

  // 清除搜索历史
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // 渲染图标
  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-red-500" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="search-container w-full max-w-2xl mx-auto px-4">
      {/* 搜索框 */}
      <form onSubmit={handleSubmit} className="search-box relative" ref={searchRef}>
        {/* 搜索图标 */}
        <Search className="search-icon absolute left-4 text-gray-400" />

        {/* 搜索输入框 */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(query.length > 0 || history.length > 0)}
          placeholder={placeholder}
          className="search-input w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          autoComplete="off"
        />

        {/* 清除按钮 */}
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); searchRef.current?.focus(); }}
            className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* 搜索建议下拉 */}
      <AnimatePresence>
        {isOpen && (suggestions.length > 0 || history.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="search-suggestions absolute left-4 right-4 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50"
          >
            {/* 搜索历史标签 */}
            {history.length > 0 && (
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    搜索历史
                  </span>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    清除
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {history.slice(0, 5).map(h => (
                    <span
                      key={h.id}
                      onClick={() => handleSuggestionClick({ type: 'history', text: h.query })}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                    >
                      {h.query}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 搜索建议 */}
            {suggestions.map((s, index) => (
              <motion.div
                key={`${s.type}-${s.text}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(s)}
                className="suggestion-item px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  {renderIcon(s.icon)}
                  <span className="suggestion-text flex-grow text-gray-700 dark:text-gray-200">
                    {s.text}
                  </span>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors">
                  {s.type === 'history' ? '历史' : s.type === 'trending' ? '热门' : '相关'}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 热门搜索词 */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
          热门搜索
        </h3>
        <div className="flex flex-wrap gap-3">
          {trendingSearches.map((keyword, index) => (
            <motion.button
              key={keyword}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSuggestionClick({ type: 'trending', text: keyword })}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800 dark:hover:to-purple-800 text-gray-800 dark:text-gray-200 rounded-full text-sm cursor-pointer transition-all hover:scale-105 shadow-sm"
            >
              {keyword}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}


