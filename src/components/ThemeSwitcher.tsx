'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`tag flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95
                 ${isDark 
                   ? 'bg-primary-500/20 text-primary-700 border-primary-500/30 hover:bg-primary-500/30' 
                   : 'bg-accent-500/20 text-accent-700 border-accent-500/30 hover:bg-accent-500/30'
                 }`}
      title={isDark ? '切换到亮色主题（微黄色）' : '切换到暗色主题（温暖棕）'}
      aria-label={isDark ? '切换到亮色主题' : '切换到暗色主题'}
    >
      <span className="text-xl">
        {isDark ? '🌙' : '☀️'}
      </span>
      <span className="font-medium">
        {isDark ? '暗色' : '亮色'}
      </span>
    </button>
  );
}
