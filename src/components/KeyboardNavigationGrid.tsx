'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface KeyboardNavigationGridProps {
  children: ReactNode[];
  className?: string;
  ariaLabel?: string;
  onSelectionChange?: (index: number) => void;
}

export function KeyboardNavigationGrid({ 
  children, 
  className, 
  ariaLabel,
  onSelectionChange 
}: KeyboardNavigationGridProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Calculate grid dimensions
  const getGridDimensions = () => {
    if (!gridRef.current) return { cols: 1, rows: 1 };
    
    const style = window.getComputedStyle(gridRef.current);
    const gridColumns = style.gridTemplateColumns;
    const columns = gridColumns.split(' ').length;
    
    return { cols: columns, rows: Math.ceil(children.length / columns) };
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gridRef.current) return;

      const { cols, rows } = getGridDimensions();
      let newIndex = selectedIndex;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (selectedIndex < children.length - 1) {
            newIndex = Math.min(selectedIndex + cols, children.length - 1);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (selectedIndex > 0) {
            newIndex = Math.max(selectedIndex - cols, 0);
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (selectedIndex < children.length - 1) {
            newIndex = selectedIndex + 1;
          }
          break;
        case 'ArrowLeft':
          event.preventDefault();
          if (selectedIndex > 0) {
            newIndex = selectedIndex - 1;
          }
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = children.length - 1;
          break;
        default:
          return;
      }

      if (newIndex !== selectedIndex) {
        setSelectedIndex(newIndex);
        onSelectionChange?.(newIndex);
        
        // Focus the new item
        const item = itemRefs.current[newIndex];
        if (item) {
          item.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, children.length, onSelectionChange]);

  // Handle mouse enter/leave
  const handleItemMouseEnter = (index: number) => {
    setSelectedIndex(index);
    onSelectionChange?.(index);
  };

  const handleItemMouseLeave = () => {
    setSelectedIndex(-1);
    onSelectionChange?.(-1);
  };

  // Wrap children with keyboard navigation props
  const enhancedChildren = children.map((child, index) => {
    if (!child) return null;

    return (
      <div
        key={index}
        ref={(el) => { itemRefs.current[index] = el; }}
        className={`${selectedIndex === index ? 'ring-2 ring-primary ring-offset-2 rounded-lg' : ''}`}
        tabIndex={selectedIndex === index ? 0 : -1}
        onMouseEnter={() => handleItemMouseEnter(index)}
        onMouseLeave={handleItemMouseLeave}
        role="gridcell"
        aria-label={`工具 ${index + 1}`}
      >
        {child}
      </div>
    );
  });

  return (
    <div
      ref={gridRef}
      className={className}
      role="grid"
      aria-label={ariaLabel || '可键盘导航的网格'}
    >
      {enhancedChildren}
    </div>
  );
}