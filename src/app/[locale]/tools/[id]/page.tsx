'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { routing, type Locale } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Star, Heart, Share2, Globe, DollarSign, Users, TrendingUp, Tag, Calendar, Eye, Home, Menu, X, BookOpen, Search } from 'lucide-react';
import { aiTools } from '@/data/tools';
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

export default function ToolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { trackToolWebsiteClick } = useAnalytics();
  const [tool, setTool] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const foundTool = aiTools.find(t => t.id === params.id);
    if (foundTool) {
      setTool(foundTool);
    }
  }, [params.id]);

  if (!tool) {
    return (
      <>
        <Navigation />
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <div className="min-h-screen paper-texture flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('toolDetail.notFound')}</h2>
            <Link href="/" className="btn-paper px-6 py-3 rounded-xl inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="btn-content">{t('toolDetail.backToHome')}</span>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleVisitWebsite = () => {
    trackToolWebsiteClick(tool.id, tool.name);
    window.open(tool.website, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Navigation />
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      <div className="min-h-screen paper-texture">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary-500/20 via-accent-500/20 to-primary-600/20" />

          <div className="relative container mx-auto px-4 py-12 max-w-6xl">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <Link href="/" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">{t('toolDetail.backToHome')}</span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tool Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="paper-card p-8"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-3xl font-bold text-foreground">{tool.name}</h1>
                          {tool.featured && (
                            <span className="px-3 py-1 bg-accent-500/20 text-accent-700 border border-accent-500/30 rounded-full text-xs font-semibold flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              {t('toolDetail.featured')}
                            </span>
                          )}
                          {tool.isNew && (
                            <span className="px-3 py-1 bg-primary-500/20 text-primary-700 border border-primary-500/30 rounded-full text-xs font-semibold">
                              {t('toolDetail.new')}
                            </span>
                          )}
                        </div>
                        <p className="text-lg text-foreground/70 leading-relaxed">{tool.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleVisitWebsite}
                      className="btn-paper px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 flex-1 sm:flex-none justify-center"
                    >
                      <span className="btn-content">{t('toolDetail.visitWebsite')}</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      className={`px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all ${
                        isFavorite(tool.id)
                          ? 'bg-accent-500/20 text-accent-700 border-2 border-accent-500/30 hover:bg-accent-500/30'
                          : 'bg-secondary-500/20 text-foreground/70 border-2 border-secondary-500/30 hover:bg-secondary-500/30'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(tool.id) ? 'fill-current' : ''}`} />
                      <span>{isFavorite(tool.id) ? t('toolDetail.favorited') : t('toolDetail.favorite')}</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 bg-secondary-500/20 text-foreground/70 border-2 border-secondary-500/30 hover:bg-secondary-500/30 transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{copied ? t('toolDetail.copied') : t('toolDetail.share')}</span>
                    </button>
                  </div>
                </motion.div>

                {/* Tool Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="paper-card p-6"
                >
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                    {t('toolDetail.toolData')}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl border border-primary-500/20">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-accent-500 fill-current" />
                        <span className="text-2xl font-bold text-foreground">{tool.rating}</span>
                      </div>
                      <p className="text-sm text-foreground/60">{t('toolDetail.rating')}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-accent-500/10 to-accent-600/10 rounded-xl border border-accent-500/20">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Eye className="w-4 h-4 text-primary-600" />
                        <span className="text-2xl font-bold text-foreground">{tool.views.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-foreground/60">{t('toolDetail.views')}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-secondary-500/10 to-secondary-600/10 rounded-xl border border-secondary-500/20">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Heart className="w-4 h-4 text-accent-600" />
                        <span className="text-2xl font-bold text-foreground">{tool.favorites.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-foreground/60">{t('toolDetail.favorites')}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-xl border border-primary-500/20">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Users className="w-4 h-4 text-primary-600" />
                        <span className="text-2xl font-bold text-foreground">{Math.floor(tool.views / 10).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-foreground/60">{t('toolDetail.users')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Tool Features */}
                {tool.features && tool.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="paper-card p-6"
                  >
                    <h2 className="text-xl font-bold text-foreground mb-4">{t('toolDetail.mainFeatures')}</h2>
                    <ul className="space-y-3">
                      {tool.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-primary-600" />
                          </div>
                          <span className="text-foreground/80 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Tool Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="paper-card p-6"
                >
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary-600" />
                    {t('toolDetail.tags')}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="tag px-4 py-2 bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-foreground/80 border border-primary-500/30 rounded-full text-sm font-medium cursor-pointer hover:scale-105 hover:bg-primary-500/30 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Tool Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="paper-card p-6 sticky top-24"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">{t('toolDetail.toolInfo')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/60 mb-1">{t('toolDetail.category')}</p>
                        <p className="font-semibold text-foreground">{tool.category}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-accent-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/60 mb-1">{t('toolDetail.priceType')}</p>
                        <p className="font-semibold text-foreground capitalize">{tool.priceType}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary-500/20 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/60 mb-1">{t('toolDetail.addedDate')}</p>
                        <p className="font-semibold text-foreground">{new Date(tool.addedAt).toLocaleDateString('zh-CN')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/60 mb-1">{t('toolDetail.officialWebsite')}</p>
                        <a
                          href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-primary-600 hover:text-primary-700 transition-colors break-all"
                        >
                          {t('toolDetail.visitSite')} →
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border-subtle">
                    <button
                      onClick={handleVisitWebsite}
                      className="btn-paper w-full px-6 py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
                    >
                      <span className="btn-content">{t('toolDetail.useNow')}</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
