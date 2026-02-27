'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    // 从当前路径中移除语言前缀
    const segments = pathname.split('/');
    // 移除语言代码（第一个段是空字符串，第二个是语言代码）
    const pathWithoutLocale = segments.length > 2
      ? '/' + segments.slice(2).join('/')
      : '/';

    // 切换到新语言
    const newPathname = `/${newLocale}${pathWithoutLocale}`;

    // 保存到 localStorage
    localStorage.setItem('preferred-locale', newLocale);

    // 导航到新路径
    router.push(newPathname);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-sm"
      >
        <span className="text-sm font-medium">
          {locale === 'zh-CN' ? '中文' :
           locale === 'en-US' ? 'English' :
           locale === 'ja-JP' ? '日本語' :
           locale === 'ko-KR' ? '한국어' :
           locale === 'es-ES' ? 'Español' : 'Français'}
        </span>
        <svg
          className="h-4 w-4 transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-sm">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLanguageChange(loc)}
            className={`w-full px-4 py-2 text-left text-sm transition-colors ${
              locale === loc
                ? 'bg-primary-500/20 text-primary-400'
                : 'text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            {loc === 'zh-CN' ? '中文' :
             loc === 'en-US' ? 'English' :
             loc === 'ja-JP' ? '日本語' :
             loc === 'ko-KR' ? '한국어' :
             loc === 'es-ES' ? 'Español' : 'Français'}
          </button>
        ))}
      </div>
    </div>
  );
}
