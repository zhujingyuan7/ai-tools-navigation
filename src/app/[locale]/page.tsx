'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { routing, type Locale } from '@/i18n/routing';
import { Sparkles, Search, BookOpen, Lightbulb, ChevronRight, Home, Menu, X, Globe, Heart, Star, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiTools } from '@/data/tools';
import { categories } from '@/data/tools';
import { useFavorites } from '@/hooks/useFavorites';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ThemeSwitcher } from '@/components/UI';

// ============================================
// LanguageSwitcher
// ============================================
function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    const segments = pathname.split('/');
    const pathWithoutLocale = segments.length > 2 ? '/' + segments.slice(2).join('/') : '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative">
      <select value={locale} onChange={(e) => handleChange(e.target.value as Locale)} className="input-paper appearance-none cursor-pointer pl-10 pr-14 text-sm font-medium min-w-[140px] text-center">
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>{loc === 'zh-CN' ? '中文' : 'English'}</option>
        ))}
      </select>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <Globe className="w-4 h-4 text-foreground/50" />
      </div>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

// ============================================
// Navigation
// ============================================
function Navigation() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', icon: Home, label: t('nav.home') },
    { href: '/trending', icon: Search, label: t('nav.trending') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname?.match(/^\/[a-z]{2}-[A-Z]{2}$/);
    return pathname?.includes(href);
  };

  return (
    <nav className="sticky top-0 z-40 paper-glass border-b border-border-subtle">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-foreground hover:text-primary-700 transition-colors group">
            <div className="relative w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <BookOpen className="w-5 h-5 text-white relative z-10" />
            </div>
            <span className="text-lg leading-tight">Waffle Brain</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium relative overflow-hidden group ${active ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md' : 'text-foreground/70 hover:bg-secondary-500/30 hover:text-foreground'}`}>
                  <Icon className="w-4 h-4" />
                  <span className="relative z-10">{item.label}</span>
                  {active && <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
                </Link>
              );
            })}
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2.5 rounded-xl hover:bg-secondary-500/20 transition-all duration-200 active:scale-95" aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}>
            {isMobileMenuOpen ? <X className="w-6 h-6 text-foreground/70" /> : <Menu className="w-6 h-6 text-foreground/70" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden py-4 border-t border-border-subtle">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium relative overflow-hidden group ${active ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md' : 'text-foreground/70 hover:bg-secondary-500/30 hover:text-foreground'}`}>
                      <Icon className="w-5 h-5" />
                      <span className="relative z-10">{item.label}</span>
                      {active && <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ============================================
// ToolCard
// ============================================
function ToolCard({ tool }: { tool: any }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { trackToolCardClick } = useAnalytics();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    trackToolCardClick(tool.id, tool.name, tool.category);
    router.push(`/tools/${tool.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(tool.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`relative paper-card overflow-hidden group animate-fade-in cursor-pointer ${isHovered ? 'scale-[1.02]' : ''} ${isFavorite(tool.id) ? 'ring-2 ring-accent-500/50 ring-offset-2' : ''}`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none transition-opacity duration-300" />}
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary-700 transition-colors duration-200 truncate">{tool.name}</h3>
            {tool.featured && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Star className="w-3.5 h-3.5 text-accent-500 fill-current" />
                <span className="px-2 py-0.5 bg-accent-500/20 text-accent-700 border border-accent-500/30 rounded text-xs font-semibold">精选</span>
              </div>
            )}
          </div>
          <button onClick={handleFavoriteClick} className={`relative p-2 rounded-lg transition-all duration-200 ${isFavorite(tool.id) ? 'bg-accent-500/20 text-accent-600 hover:bg-accent-500/30' : 'bg-secondary-500/20 text-foreground/60 hover:bg-secondary-500/30 hover:text-foreground'}`}>
            <Heart className={`w-5 h-5 transition-transform duration-200 ${isFavorite(tool.id) ? 'fill-current scale-90' : 'group-hover:scale-110'}`} />
          </button>
        </div>
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2 leading-relaxed min-h-[2.5em]">{tool.description}</p>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="tag px-2 py-1 bg-primary-500/20 text-primary-700 border border-primary-500/30 rounded text-xs font-semibold">{tool.category}</span>
            <span className="tag px-2 py-1 bg-secondary-500/20 text-foreground/70 border border-secondary-500/30 rounded text-xs font-semibold">{tool.priceType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-accent-500 fill-current" />
            <span className="font-semibold text-foreground/80">{tool.rating}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 4).map((tag: string, index: number) => (
            <span key={tag} className="tag px-3 py-1.5 rounded text-xs font-medium cursor-pointer hover:bg-primary-500/30 hover:text-primary-700 transition-all duration-200">{tag}</span>
          ))}
          {tool.tags.length > 4 && <span className="px-3 py-1.5 bg-secondary-500/20 text-foreground/50 border border-secondary-500/30 rounded text-xs font-medium">+{tool.tags.length - 4}</span>}
        </div>
      </div>
    </div>
  );
}

// ============================================
// SmartSearchBox
// ============================================
const trendingSearches = ['ChatGPT', 'Midjourney', 'Stable Diffusion', 'AI 写作', '图像生成', '代码助手'];

function SmartSearchBox({ onSearch, placeholder = '搜索 AI 工具...' }: { onSearch?: (query: string) => void; placeholder?: string }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const searchRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (error) {}
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
    if (value.length > 0) {
      const mockSuggestions = [
        { type: 'history', text: value },
        { type: 'trending', text: `${value} AI`, icon: 'TrendingUp' },
      ];
      const matchingHistory = history.filter((h: any) => h.query.toLowerCase().includes(value.toLowerCase())).slice(0, 3).map((h: any) => ({ type: 'history', text: h.query, icon: 'Clock' }));
      setSuggestions([...matchingHistory, ...mockSuggestions]);
    } else {
      setSuggestions([]);
    }
  };

  const executeSearch = (searchQuery: string) => {
    const newHistory = { id: Date.now().toString(), query: searchQuery, category: 'all', timestamp: new Date(), resultsCount: 0 };
    const updatedHistory = [newHistory, ...history.filter((h: any) => h.query !== searchQuery)].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    if (onSearch) onSearch(searchQuery);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      executeSearch(query);
    }
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Clock': return <Clock className="w-4 h-4 text-primary-600" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-accent-600" />;
      default: return null;
    }
  };

  return (
    <div className="search-container w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="search-box relative" ref={searchRef}>
        <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 rounded-2xl" />
        <div className="relative">
          <Search className="search-icon absolute left-4 text-foreground/60" />
          <input type="text" value={query} onChange={handleInputChange} onFocus={() => setIsOpen(query.length > 0 || history.length > 0)} placeholder={placeholder} className="input-paper search-input w-full pl-12 pr-12 py-4 rounded-2xl shadow-lg text-foreground placeholder-foreground/50 focus:shadow-xl transition-all" autoComplete="off" />
          {query && (
            <button type="button" onClick={() => { setQuery(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-all">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && (suggestions.length > 0 || history.length > 0) && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="paper-card absolute left-4 right-4 mt-2 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50 border border-border-medium">
            {history.length > 0 && (
              <div className="px-4 py-3 border-b border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground/60 font-medium">搜索历史</span>
                  <button onClick={() => { setHistory([]); localStorage.removeItem('searchHistory'); }} className="text-xs text-primary-700 hover:text-primary-600 transition-colors font-medium">清除</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {history.slice(0, 5).map((h: any) => (
                    <span key={h.id} onClick={() => { setQuery(h.query); setIsOpen(false); executeSearch(h.query); }} className="tag px-3 py-1.5 bg-secondary-500/30 text-foreground/70 border border-border-subtle rounded-full text-sm cursor-pointer hover:bg-primary-500/20 hover:text-primary-700 transition-all">{h.query}</span>
                  ))}
                </div>
              </div>
            )}
            {suggestions.map((s: any, index: number) => (
              <motion.div key={`${s.type}-${s.text}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} onClick={() => { setQuery(s.text); setIsOpen(false); executeSearch(s.text); }} className="px-4 py-3 hover:bg-primary-500/10 cursor-pointer transition-colors flex items-center gap-3 border-b border-border-subtle last:border-0">
                {renderIcon(s.icon)}
                <span className="flex-grow text-foreground/80">{s.text}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
          <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-accent-500/20 to-primary-500/20">
            <TrendingUp className="w-5 h-5 text-accent-600" />
          </div>
          <span className="ml-2">热门搜索</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {trendingSearches.map((keyword, index) => (
            <motion.button key={keyword} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} onClick={() => { setQuery(keyword); setIsOpen(false); executeSearch(keyword); }} className="tag px-4 py-2 bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-foreground/80 border border-primary-500/30 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105 hover:shadow-sm hover:bg-primary-500/30 hover:text-primary-700">{keyword}</motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// HomePage
// ============================================
export default function HomePage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = useMemo(() => {
    return aiTools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase()) || tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Navigation />
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      <main className="min-h-screen paper-texture">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary-500/20 via-accent-500/20 to-primary-600/20" />
          <div className="relative container mx-auto px-4 py-8">
            <div className="flex gap-8">
              <motion.aside initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:block w-64 flex-shrink-0">
                <nav className="paper-glass rounded-3xl p-6 h-[calc(100vh-8rem)] sticky top-24 overflow-y-auto custom-scrollbar">
                  <div className="mb-6">
                    <Link href="/" className="flex items-center gap-3 mb-6 text-foreground hover:text-primary-700 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg font-bold">Waffle Brain</span>
                    </Link>
                  </div>
                  <h3 className="text-sm font-bold text-foreground/70 mb-4 uppercase tracking-wider">{t('categories.title')}</h3>
                  <ul className="space-y-1.5">
                    <li>
                      <button onClick={() => setSelectedCategory('all')} className={`w-full px-4 py-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group ${selectedCategory === 'all' ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md' : 'text-foreground/70 hover:bg-secondary-500/30 hover:text-foreground'}`}>
                        <div className={`p-2 rounded-lg ${selectedCategory === 'all' ? 'bg-white/20' : 'bg-secondary-500/30 group-hover:bg-primary-500/20'}`}>
                          <Search className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{t('categories.all')}</span>
                        {selectedCategory === 'all' && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <button onClick={() => setSelectedCategory(category)} className={`w-full px-4 py-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group ${selectedCategory === category ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md' : 'text-foreground/70 hover:bg-secondary-500/30 hover:text-foreground'}`}>
                          <div className={`p-2 rounded-lg ${selectedCategory === category ? 'bg-white/20' : 'bg-secondary-500/30 group-hover:bg-primary-500/20'}`}>
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{category}</span>
                          {selectedCategory === category && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.aside>

              <div className="flex-grow min-w-0">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8 max-w-2xl mx-auto mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl" />
                    <SmartSearchBox onSearch={setSearchQuery} placeholder={t('search.placeholder')} />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <div className="inline-flex p-2 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                      <Lightbulb className="w-5 h-5 text-primary-600" />
                    </div>
                    {selectedCategory === 'all' ? t('tools.toolsCount') : selectedCategory}
                    <span className="text-foreground/50 text-lg font-normal ml-2">({filteredTools.length})</span>
                  </h2>

                  {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTools.map((tool, index) => (
                        <motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}>
                          <ToolCard tool={tool} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="paper-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
                      <div className="text-6xl mb-4">🔍</div>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">{t('tools.noResultsTitle')}</h2>
                      <p className="text-foreground/60">{t('tools.noResultsDesc')}</p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
