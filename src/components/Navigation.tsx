'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Home, Sparkles, Clock, Search as SearchIcon, Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@/i18n/routing';

export default function Navigation() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', icon: Home, label: '首页' },
    { href: '/recommendations', icon: Sparkles, label: '推荐库' },
    { href: '/new-tools', icon: Clock, label: '新工具' },
    { href: '/trending', icon: SearchIcon, label: '热门' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname?.match(/^\/[a-z]{2}-[A-Z]{2}$/);
    }
    return pathname?.includes(href);
  };

  return (
    <nav className="sticky top-0 z-40 paper-glass border-b border-border-subtle shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - 纸张质感 */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 font-bold text-xl text-foreground hover:text-primary-700 transition-colors group"
          >
            <div className="relative w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <BookOpen className="w-5 h-5 text-white relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg leading-tight">Waffle Brain</span>
              <span className="text-xs text-foreground/50 font-normal tracking-wide">AI 工具导航</span>
            </div>
          </Link>

          {/* Desktop Navigation - 纸张质感 */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium relative overflow-hidden group
                             ${active
                               ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                               : 'text-foreground/70 hover:bg-secondary-500/30 hover:text-foreground'
                             }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button - 纸张质感 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-secondary-500/20 transition-all duration-200 active:scale-95"
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground/70" />
            ) : (
              <Menu className="w-6 h-6 text-foreground/70" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - 纸张质感 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4 border-t border-border-subtle"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium relative overflow-hidden group
                                 ${active
                                   ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                                   : 'text-foreground/70 hover:bg-secondary-500/30 hover:text-foreground'
                                 }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="relative z-10">{item.label}</span>
                      {active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
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
