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
        <div className="flex items-center gap-3">
          <Loader2 
            className={`${sizeClasses[size]} animate-spin text-primary`}
            aria-hidden="true"
          />
          <span className="text-muted-foreground">{message}</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}