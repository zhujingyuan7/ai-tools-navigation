'use client';

import { Search, Heart, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-results' | 'no-favorites' | 'error';
  title: string;
  description: string;
  action?: {
    text: string;
    onClick: () => void;
  };
}

export default function EmptyState({ type, title, description, action }: EmptyStateProps) {
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
      {/* Icon with paper glow effect */}
      <div className="relative mb-6">
        {/* 纸张光泽背景 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${iconBgColors[type]} rounded-full blur-2xl opacity-50`} />
        <div className={`relative p-6 rounded-full bg-gradient-to-br ${iconBgColors[type]} border-2 border-border-subtle`}>
          <div className={iconTextColors[type]}>
            {icons[type]}
          </div>
        </div>
      </div>

      {/* Title - 纸张质感 */}
      <h2 className="text-3xl font-bold text-foreground mb-6 text-shadow-paper">
        {title}
      </h2>

      {/* Description */}
      <p className="text-lg text-foreground/60 mb-8 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {/* Action button - 纸张质感 */}
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
