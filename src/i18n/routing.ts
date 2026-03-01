import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['zh-CN', 'en-US', 'es-ES', 'fr-FR', 'ja-JP', 'ko-KR'],
 
  // Used when no locale matches
  defaultLocale: 'zh-CN'
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

// Export Locale type
export type Locale = (typeof routing.locales)[number];
