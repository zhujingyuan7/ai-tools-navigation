'use client';

import { useTheme } from '@/hooks/useTheme';
import { Search, Heart, AlertCircle } from 'lucide-react';

// ============================================
// ThemeSwitcher - 主题切换器
// ============================================
export function ThemeSwitcher() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`tag flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95
                 ${isDark 
                   ? 'bg-primary-500/20 text-primary-700 border-primary-500/30 hover:bg-primary-500/30' 
                   : 'bg-accent-500/20 text-accent-700 border-accent-500/30 hover:bg-accent-500/30'
                 }`}
      title={isDark ? '切换到亮色主题' : '切换到暗色主题'}
      aria-label={isDark ? '切换到亮色主题' : '切换到暗色主题'}
    >
      <span className="text-xl">{isDark ? '🌙' : '☀️'}</span>
      <span className="font-medium">{isDark ? '暗色' : '亮色'}</span>
    </button>
  );
}

// ============================================
// LoadingSpinner - 加载动画
// ============================================
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-3',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-xl" />
        
        <div className="relative">
          <div className={`rounded-full border-2 border-t-transparent border-r-transparent border-primary-500/50 animate-spin ${sizeClasses[size]}`} />
          <div
            className={`absolute inset-0 rounded-full border-2 border-t-transparent border-r-transparent border-accent-500/40 animate-spin ${sizeClasses[size]}`}
            style={{ animationDuration: '2s', animationDelay: '0.3s' }}
          />
          <div
            className={`absolute inset-2 rounded-full border border-primary-500/30 ${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'} animate-spin`}
            style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
          />
          <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-pulse-slow mix-blend-multiply" />
        </div>
      </div>

      {message && (
        <p className="text-foreground/60 text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

// ============================================
// EmptyState - 空状态组件
// ============================================
interface EmptyStateProps {
  type: 'no-results' | 'no-favorites' | 'error';
  title: string;
  description: string;
  action?: {
    text: string;
    onClick: () => void;
  };
}

export function EmptyState({ type, title, description, action }: EmptyStateProps) {
  const icons = {
    'no-results': <Search className="w-16 h-16" />,
    'no-favorites': <Heart className="w-16 h-16" />,
    'error': <AlertCircle className="w-16 h-16" />,
  };

  const iconBgColors = {
    'no-results': 'from-primary-500/20 to-primary-600/20',
    'no-favorites': 'from-accent-500/20 to-accent-600/20',
    'error': 'from-error-500/20 to-error-600/20',
  };

  const iconTextColors = {
    'no-results': 'text-primary-600',
    'no-favorites': 'text-accent-600',
    'error': 'text-error-600',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className={`absolute inset-0 bg-gradient-to-br ${iconBgColors[type]} rounded-full blur-2xl opacity-50`} />
        <div className={`relative p-6 rounded-full bg-gradient-to-br ${iconBgColors[type]} border-2 border-border-subtle`}>
          <div className={iconTextColors[type]}>
            {icons[type]}
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-6 text-shadow-paper">
        {title}
      </h2>

      <p className="text-lg text-foreground/60 mb-8 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="btn-paper px-8 py-3.5 rounded-xl font-bold text-base max-w-xs mx-auto shadow-lg hover:shadow-xl transition-all"
          aria-label={action.text}
        >
          <span className="btn-content">{action.text}</span>
        </button>
      )}
    </div>
  );
}
