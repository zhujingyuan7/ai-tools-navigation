'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all"
      title={isDark ? '切换到浅色主题' : '切换到深色主题'}
    >
      {isDark ? '🌙' : '🌙️'}
      <span className="ml-2 text-slate-300">
        {isDark ? '深色模式' : '浅色模式'}
      </span>
    </button>
  );
}
