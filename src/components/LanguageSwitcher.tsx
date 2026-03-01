'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    // 获取当前路径并移除语言代码
    const segments = pathname.split('/');
    // 移除语言代码（第一个是空字符，第二个是语言代码）
    const pathWithoutLocale = segments.length > 2
      ? '/' + segments.slice(2).join('/')
      : '/';

    // 切换到新语言
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value as Locale)}
        className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 pr-8 text-sm text-white hover:bg-slate-700 transition-colors cursor-pointer"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === 'zh-CN' ? '中文' : loc === 'en-US' ? 'English' : loc}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
