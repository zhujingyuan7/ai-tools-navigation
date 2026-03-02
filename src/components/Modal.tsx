'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useFocusTrap, useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  ariaLabel?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnEscape = true,
  closeOnOverlay = true,
  ariaLabel,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the previously focused element
  useEffect(() => {
    if (isOpen && typeof document !== 'undefined') {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useKeyboardNavigation({
    onEscape: closeOnEscape ? onClose : undefined,
    enabled: isOpen,
  });

  // Handle focus trap
  const focusTrapRef = useFocusTrap({
    enabled: isOpen,
    restoreFocus: previousFocusRef.current,
  });

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onClose();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabel || 'modal-title'}
      aria-describedby={ariaLabel ? `${ariaLabel}-description` : undefined}
      onClick={handleOverlayClick}
    >
      {/* Overlay - 纸张质感 */}
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-foreground/20" 
        aria-hidden="true"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
          backgroundBlendMode: 'multiply'
        }}
      />
      
      {/* Modal content - 纸张质感 */}
      <div
        ref={modalRef}
        className={`relative paper-card w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden animate-fade-in shadow-2xl border-2 border-border-medium`}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-border-subtle">
          <h2 id="modal-title" className="text-xl font-bold text-foreground">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-all active:scale-95"
            aria-label="关闭对话框"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
