'use client';

import { useEffect, useRef } from 'react';

interface UseKeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation(options: UseKeyboardNavigationOptions = {}) {
  const {
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    enabled = true,
  } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          onEscape?.();
          break;
        case 'Enter':
          if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            // Allow form submission
            return;
          }
          event.preventDefault();
          onEnter?.();
          break;
        case 'ArrowUp':
          if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            // Allow text navigation
            return;
          }
          event.preventDefault();
          onArrowUp?.();
          break;
        case 'ArrowDown':
          if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            // Allow text navigation
            return;
          }
          event.preventDefault();
          onArrowDown?.();
          break;
        case 'ArrowLeft':
          if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            // Allow text navigation
            return;
          }
          event.preventDefault();
          onArrowLeft?.();
          break;
        case 'ArrowRight':
          if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            // Allow text navigation
            return;
          }
          event.preventDefault();
          onArrowRight?.();
          break;
        case 'Tab':
          onTab?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab]);
}

interface UseFocusTrapOptions {
  enabled?: boolean;
  initialFocus?: HTMLElement | null;
  restoreFocus?: HTMLElement | null;
}

export function useFocusTrap(options: UseFocusTrapOptions = {}) {
  const { enabled = true, initialFocus, restoreFocus } = options;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Set initial focus
    if (initialFocus) {
      initialFocus.focus();
    } else if (firstElement) {
      firstElement.focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      // Restore focus
      if (restoreFocus) {
        restoreFocus.focus();
      }
    };
  }, [enabled, initialFocus, restoreFocus]);

  return containerRef;
}