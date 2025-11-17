'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/store/ui-store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useUIStore((state) => state.themeMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'studio');
    
    if (themeMode === 'light') {
      root.classList.add('light');
    } else if (themeMode === 'studio') {
      root.classList.add('studio');
    } else {
      root.classList.add('dark');
    }
  }, [themeMode, mounted]);

  // Apply dark mode by default on mount
  useEffect(() => {
    if (!mounted) {
      const root = document.documentElement;
      if (!root.classList.contains('light') && !root.classList.contains('studio')) {
        root.classList.add('dark');
      }
    }
  }, [mounted]);

  return <>{children}</>;
}

