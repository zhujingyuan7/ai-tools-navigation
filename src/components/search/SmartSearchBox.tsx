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
        return <Clock className="w-4 h-4 text-primary-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-accent-600" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-error-600" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-warning-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="search-container w-full max-w-2xl mx-auto px-4">
      {/* 搜索框 - 纸张质感 */}
      <form onSubmit={handleSubmit} className="search-box relative" ref={searchRef}>
        {/* 纸张光泽背景 */}
        <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 rounded-2xl" />
        
        <div className="relative">
          {/* 搜索图标 */}
          <Search className="search-icon absolute left-4 text-foreground/60" />

          {/* 搜索输入框 - 纸张质感 */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(query.length > 0 || history.length > 0)}
            placeholder={placeholder}
            className="input-paper search-input w-full pl-12 pr-12 py-4 rounded-2xl shadow-lg text-foreground placeholder-foreground/50 focus:shadow-xl transition-all"
            autoComplete="off"
          />

          {/* 清除按钮 - 纸张质感 */}
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); searchRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* 搜索建议下拉 - 纸张质感 */}
      <AnimatePresence>
        {isOpen && (suggestions.length > 0 || history.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="paper-card search-suggestions absolute left-4 right-4 mt-2 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50 border border-border-medium"
          >
            {/* 搜索历史标签 */}
            {history.length > 0 && (
              <div className="px-4 py-3 border-b border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground/60 font-medium">
                    搜索历史
                  </span>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-primary-700 hover:text-primary-600 transition-colors font-medium"
                  >
                    清除
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {history.slice(0, 5).map(h => (
                    <span
                      key={h.id}
                      onClick={() => handleSuggestionClick({ type: 'history', text: h.query })}
                      className="tag px-3 py-1.5 bg-secondary-500/30 text-foreground/70 border border-border-subtle rounded-full text-sm cursor-pointer hover:bg-primary-500/20 hover:text-primary-700 hover:border-primary-500/30 transition-all"
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
                className="suggestion-item px-4 py-3 hover:bg-primary-500/10 cursor-pointer transition-colors flex items-center justify-between group border-b border-border-subtle last:border-0"
              >
                <div className="flex items-center gap-3">
                  {renderIcon(s.icon)}
                  <span className="suggestion-text flex-grow text-foreground/80 group-hover:text-foreground transition-colors">
                    {s.text}
                  </span>
                </div>
                <div className="text-xs text-foreground/40 group-hover:text-primary-600 transition-colors font-medium">
                  {s.type === 'history' ? '历史' : s.type === 'trending' ? '热门' : '相关'}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 热门搜索词 - 纸张质感 */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
          <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-accent-500/20 to-primary-500/20">
            <TrendingUp className="w-5 h-5 text-accent-600" />
          </div>
          <span className="ml-2">热门搜索</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {trendingSearches.map((keyword, index) => (
            <motion.button
              key={keyword}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSuggestionClick({ type: 'trending', text: keyword })}
              className="tag px-4 py-2 bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-foreground/80 border border-primary-500/30 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105 hover:shadow-sm hover:bg-primary-500/30 hover:text-primary-700"
            >
              {keyword}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
