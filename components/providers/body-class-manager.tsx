'use client';

import { useEffect } from 'react';

export function BodyClassManager() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const body = document.body;
    
    const updatePadding = () => {
      const isMinimized = body.classList.contains('player-minimized');
      if (!isMinimized) {
        body.classList.add('pb-[70px]');
      } else {
        body.classList.remove('pb-[70px]');
      }
    };
    
    // Initial check
    updatePadding();
    
    // Listen for minimize events instead of MutationObserver
    const handleMinimizeChange = () => {
      updatePadding();
    };
    
    window.addEventListener('player-minimize-change', handleMinimizeChange);

    return () => {
      window.removeEventListener('player-minimize-change', handleMinimizeChange);
      body.classList.remove('pb-[70px]');
    };
  }, []);

  return null;
}

