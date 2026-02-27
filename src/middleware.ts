import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // 支持的语言列表
  locales,

  // 默认语言
  defaultLocale,

  // 语言前缀
  localePrefix: 'as-needed',

  // 语言检测顺序：cookie > header > 路径
  localeDetection: true,
});

export const config = {
  // 匹配除了 _next、api、static 等特殊路径之外的所有路径
  matcher: ['/', '/(zh-CN|en-US|ja-JP|ko-KR|es-ES|fr-FR)/:path*'],
};
