'use client';

import { useState, useMemo, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { aiTools } from '@/data/tools';
import ErrorBoundary from '@/components/ErrorBoundary';

function HomeContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const filteredTools = useMemo(() => {
    return aiTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const [filterType, filterValue] = selectedCategory.split('_');

      const matchesCategory = filterType === 'all' || filterValue === 'all' || tool.category === filterValue;
      const matchesPrice = filterType !== 'price' || (filterValue === 'all' ||
        (filterValue === 'free' && tool.priceType === 'free') ||
        (filterValue === 'freemium' && tool.priceType === 'freemium') ||
        (filterValue === 'paid' && tool.priceType === 'paid')
      );

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory]);

  const featuredTools = useMemo(() => {
    return aiTools.filter((tool) => tool.featured);
  }, []);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSearchQuery(query);
    }, 500);
  };

  // Trigger mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-to-content">
        跳到主要内容
      </a>

      {/* Animated Particle Background */}
      <div className="particle-effect">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${(i + 1) * 5}%` }} />
        ))}
      </div>

      {/* Light Reflection Effect */}
      <div className="light-reflection" />

      <main id="main-content" className="min-h-screen relative z-10" role="main">
        <div className="relative container mx-auto px-4 py-12">
          {/* Hero Section with Apple-style glass effect */}
          <header className="apple-glass rounded-3xl p-12 mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient apple-glow mb-6 animate-fade-in" style={{ animationDelay: '0ms' }}>
              AI 工具导航站
            </h1>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
              发现最优质的 AI 工具和资源
            </p>
          </header>

          {/* Search Bar with Apple-style glass effect */}
          <nav aria-label="搜索工具" className="mb-10">
            <div className={`apple-glass rounded-2xl ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <SearchBar onSearch={handleSearch} />
            </div>
          </nav>

          {/* Category Filter with Apple-style glass effect */}
          <nav aria-label="分类筛选" className="mb-10">
            <div className={`apple-glass rounded-2xl ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onFilterChange={setSelectedCategory}
              />
            </div>
          </nav>

          {/* Content Section */}
          <section aria-label="工具列表" className="min-h-[400px]">
            {/* Featured Tools */}
            {searchQuery === '' && selectedCategory === 'all' && (
              <div className={`apple-glass-elevated rounded-3xl p-8 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  精选推荐
                </h2>
                <div className="grid-responsive">
                  {featuredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            )}

            {/* Tool Grid with staggered animations */}
            <div aria-live="polite">
              {isLoading ? (
                <LoadingSpinner size="lg" message="正在搜索工具..." />
              ) : filteredTools.length > 0 ? (
                <div className={`${mounted ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="text-2xl">📦</span>
                    {selectedCategory === 'all' ? '全部工具' : selectedCategory}
                    <span className="text-muted-foreground text-lg font-normal ml-2">
                      ({filteredTools.length})
                    </span>
                  </h2>

                  <div className="grid-responsive">
                    {filteredTools.map((tool, index) => (
                      <div key={tool.id} style={{ animationDelay: `${500 + index * 100}ms` }}>
                        <ToolCard tool={tool} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`apple-glass rounded-3xl p-12 text-center ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
                  <div className="mb-4">
                    <div className="w-20 h-20 mx-auto text-5xl">🔍</div>
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">未找到匹配的工具</h2>
                  <p className="text-lg text-muted-foreground">尝试调整搜索词或筛选条件</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Modern Footer with Apple-style glass effect */}
      <footer className="border-t border-subtle mt-20 py-8 apple-glass">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 AI 工具导航站. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <ErrorBoundary fallback={<LoadingSpinner size="lg" message="加载中..." />}>
      <HomeContent />
    </ErrorBoundary>
  );
}
