import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
      } catch {
        return [];
      }
    }
    return [];
  });

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(toolId);
      let updated: string[];
      
      if (exists) {
        updated = prev.filter((id: string) => id !== toolId);
      } else {
        updated = [...prev, toolId];
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(updated));
      }
      
      return updated;
    });
  };

  const isFavorite = (toolId: string) => {
    return favorites.includes(toolId);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'favorites') {
        try {
          const newFavorites = JSON.parse(e.newValue || '[]');
          setFavorites(newFavorites);
        } catch {
          setFavorites([]);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  return { favorites, toggleFavorite, isFavorite };
}
