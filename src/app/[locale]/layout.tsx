import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import "../globals.css";

// 生成静态参数（用于 SSG）
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 生成元数据
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const messages = await getMessages({ locale });

  return {
    title: messages.metadata.title as string,
    description: messages.metadata.description as string,
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  // 验证语言是否支持
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // 获取翻译消息
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
