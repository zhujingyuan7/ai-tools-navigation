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
        {/* 纸张光泽效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-xl" />
        
        <div className="relative">
          {/* Outer ring - 纸张质感 */}
          <div className={`rounded-full border-2 border-t-transparent border-r-transparent border-primary-500/50 animate-spin ${sizeClasses[size]}`} />

          {/* Middle ring - 延迟 */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-t-transparent border-r-transparent border-accent-500/40 animate-spin ${sizeClasses[size]}`}
            style={{ animationDuration: '2s', animationDelay: '0.3s' }}
          />

          {/* Inner ring - 进一步延迟 */}
          <div
            className={`absolute inset-2 rounded-full border border-primary-500/30 ${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'} animate-spin`}
            style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
          />

          {/* Core glow - 温暖的光晕 */}
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
