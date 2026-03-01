'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-3',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        {/* Outer ring - Apple style */}
        <div className={`rounded-full border-2 border-t-transparent border-r-transparent border-primary/30 animate-spin ${sizeClasses[size]}`}>
        </div>

        {/* Middle ring - delayed */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-t-transparent border-r-transparent border-primary/20 animate-spin ${sizeClasses[size]}`}
          style={{ animationDuration: '2s', animationDelay: '0.3s' }}
        />
        </div>

        {/* Inner ring - further delayed */}
        <div
          className={`absolute inset-2 rounded-full border border-primary/10 ${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'} animate-spin`}
          style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
        />

        {/* Core glow */}
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-slow" />
      </div>

      {message && (
        <p className="text-muted-foreground text-sm animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
