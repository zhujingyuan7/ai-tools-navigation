'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { Globe } from 'lucide-react';

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
        className="input-paper appearance-none cursor-pointer pl-10 pr-10 text-sm font-medium"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === 'zh-CN' ? '中文' : loc === 'en-US' ? 'English' : loc}
          </option>
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
