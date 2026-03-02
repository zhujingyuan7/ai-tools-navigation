'use client';

import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  isLoading: boolean;
  children: ReactNode;
  fallback?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function LoadingState({ 
  isLoading, 
  children, 
  fallback, 
  size = 'md',
  message = '加载中...' 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  if (isLoading) {
    return fallback || (
      <div 
        className="flex items-center justify-center py-8"
        role="status"
        aria-label={message}
        aria-live="polite"
      >
        <div className="flex items-center gap-3 px-6 py-3 paper-glass rounded-xl">
          <div className="relative">
            {/* 纸张光泽背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-full blur-sm" />
            <Loader2 
              className={`${sizeClasses[size]} animate-spin text-primary-600 relative z-10`}
              aria-hidden="true"
            />
          </div>
          <span className="text-foreground/70 font-medium">{message}</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
