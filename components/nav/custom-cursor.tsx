'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/store/ui-store';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<string>('default');
  const [isMobile, setIsMobile] = useState(false);
  const { customCursorEnabled, motionPreference } = useUIStore();

  useEffect(() => {
    // Check if device is mobile/touch device
    const checkMobile = () => {
      return window.matchMedia('(max-width: 1024px)').matches || 
             'ontouchstart' in window || 
             navigator.maxTouchPoints > 0;
    };
    
    setIsMobile(checkMobile());
    
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const handleChange = () => setIsMobile(checkMobile());
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!customCursorEnabled || motionPreference === 'reduced' || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target) {
        const cursorAttr = target.getAttribute('data-cursor');
        setCursorType(cursorAttr || 'default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [customCursorEnabled, motionPreference, isMobile]);

  if (!customCursorEnabled || motionPreference === 'reduced' || isMobile) return null;

  const cursorStyles: Record<string, string> = {
    default: 'w-4 h-4 border border-foreground/30',
    link: 'w-6 h-6 border-2 border-primary',
    tap: 'w-8 h-8 border-2 border-accent',
    view: 'w-10 h-10 border-2 border-primary/50',
  };

  return (
    <div
      className={`fixed pointer-events-none z-[9999] rounded-full transition-all duration-150 ease-out ${
        cursorStyles[cursorType] || cursorStyles.default
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

