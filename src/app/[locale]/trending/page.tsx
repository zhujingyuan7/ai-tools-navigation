'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { routing, type Locale } from '@/i18n/routing';
import { trendingTools } from '@/data/trending';
import { Eye, Star, Flame, Home, Menu, X, Globe, BookOpen, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function TrendingLeaderboard() {
  const t = useTranslations();

  return (
    <>
      <Navigation />
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      <main className="min-h-screen paper-texture">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-error-500/20 via-accent-500/20 to-error-600/20" />

          <div className="relative container mx-auto px-4 py-12">
          {/* 页面标题 */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-error-400 via-accent-400 to-error-500 transform rotate-3 scale-110" />
              
              <div className="relative">
                <h1 className="text-morandi-gradient text-shadow-paper text-4xl md:text-5xl font-extrabold mb-4 tracking-tight flex items-center justify-center gap-3">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-error-500/20 to-accent-500/20">
                    <Flame className="w-8 h-8 text-error-600" />
                  </div>
                  <span>{t('trending.title')}</span>
                </h1>
              </div>
            </div>
            
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {t('trending.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in-up">
            {trendingTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="paper-card rounded-2xl p-6 relative hover:scale-102 transition-all duration-300">
                  {/* 排名徽章 */}
                  <div className={`absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' :
                    index === 2 ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' :
                    'bg-gradient-to-br from-secondary-400 to-secondary-500 text-white'
                  }`}>
                    <span className="relative z-10">{index + 1}</span>
                  </div>

                  <div className="pl-8">
                    <h3 className="text-xl font-bold text-foreground mb-2">{tool.name}</h3>
                    <p className="text-foreground/60 text-sm mb-4 leading-relaxed">{tool.description}</p>
                    <div className="flex items-center gap-4 text-sm text-foreground/50">
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>{tool.views}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-accent-500 fill-current" />
                        <span>{tool.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
