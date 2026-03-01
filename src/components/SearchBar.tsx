'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SearchBarProps {
  onSearch: (query: string) => void;
  autoFocus?: boolean;
}

export default function SearchBar({ onSearch, autoFocus = false }: SearchBarProps) {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto group">
      {/* Search icon with Apple-style glow */}
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10 transition-colors duration-[300ms] group-focus-within:text-primary">
        <Search className={`w-5 h-5 ${isFocused ? 'text-primary' : 'text-muted-foreground'} transition-colors duration-[300ms]`} />
      </div>

      {/* Apple-style glassmorphism input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={t('search.placeholder')}
        autoFocus={autoFocus}
        className={`input w-full pl-14 pr-12 py-4 text-base
                   ${isFocused ? 'ring-2 ring-primary/50 apple-glow' : ''}
                   transition-all duration-[300ms]`}
        aria-label="搜索工具"
        aria-describedby="search-clear"
      />

      {/* Clear button with Apple-style hover effect */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg text-muted-foreground hover:text-error transition-all duration-[200ms] hover:bg-error/10"
          aria-label="清除搜索"
        >
          <X className="w-4 h-4 transition-transform duration-[200ms] hover:rotate-90" />
        </button>
      )}
    </div>
  );
}
