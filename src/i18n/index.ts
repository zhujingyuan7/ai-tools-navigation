import { routing } from './routing';

// 从 routing 对象中提取常用属性
export { routing };
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
export type { Locale } from './routing';
