'use client';

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
    'no-results': (
      <svg className="w-20 h-20 text-muted-foreground mx-auto mb-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0 4 4 0 015.656 0 4 4 0 01-5.656 5.656" />
      </svg>
    ),
    'no-favorites': (
      <svg className="w-20 h-20 text-muted-foreground mx-auto mb-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.84 4.61a5.5 0 0 0-7.78 0L12 4.24l-1.06 1.06-7.07 7.07L4.16 10.07a5.5 0 0 0 0-7.78 0 11.5 11.5 0 011.5-11.5 0 11.5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.8 4.8a3.24 3.24 0 0 1 4.6 1.24" />
      </svg>
    ),
    'error': (
      <svg className="w-20 h-20 text-error mx-auto mb-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 0h2m-2 0h-2m0 0h2m-2 0h-2M9 9h6" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      {/* Icon with glow effect */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow" />
        {icons[type]}
      </div>

      {/* Title with Apple-style shadow */}
      <h2 className="text-3xl font-bold text-foreground mb-6 text-shadow-glow">
        {title}
      </h2>

      {/* Description */}
      <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {/* Action button */}
      {action && (
        <button
          onClick={action.onClick}
          className="btn btn-primary px-6 py-3 rounded-xl font-semibold text-sm max-w-xs mx-auto apple-glow"
          aria-label={action.text}
        >
          {action.text}
        </button>
      )}
    </div>
  );
}
