'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/store/ui-store';

const ACCENT_COLOR_MAP: Record<string, { light: string; dark: string }> = {
  green: {
    light: '120 55% 40%',
    dark: '130 55% 52%',
  },
  yellow: {
    light: '45 100% 50%',
    dark: '50 100% 55%',
  },
  red: {
    light: '0 84% 60%',
    dark: '0 84% 65%',
  },
  blue: {
    light: '217 91% 60%',
    dark: '217 91% 65%',
  },
  purple: {
    light: '280 80% 60%',
    dark: '280 80% 65%',
  },
  pink: {
    light: '330 75% 60%',
    dark: '330 75% 65%',
  },
  orange: {
    light: '25 95% 55%',
    dark: '25 95% 60%',
  },
  lightblue: {
    light: '200 100% 65%',
    dark: '200 100% 70%',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useUIStore((state) => state.themeMode);
  const accentColor = useUIStore((state) => state.accentColor);
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
    } else {
      root.classList.add('dark');
    }
  }, [themeMode, mounted]);

  // Apply accent color
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const colorMap = ACCENT_COLOR_MAP[accentColor] || ACCENT_COLOR_MAP.green;
    const isLight = themeMode === 'light';
    const colorValue = isLight ? colorMap.light : colorMap.dark;

    root.style.setProperty('--primary', colorValue);
    root.style.setProperty('--ring', colorValue);
    
    // Update accent color for dark mode
    if (!isLight) {
      root.style.setProperty('--accent', colorValue);
    }
  }, [accentColor, themeMode, mounted]);

  // Apply dark mode by default on mount
  useEffect(() => {
    if (!mounted) {
      const root = document.documentElement;
      if (!root.classList.contains('light')) {
        root.classList.add('dark');
      }
    }
  }, [mounted]);

  return <>{children}</>;
}

