'use client';

import { useEffect } from 'react';
import { usePlayerStore } from '@/store/player-store';

export function BodyClassManager() {
  const showing = usePlayerStore((state) => state.showing);

  useEffect(() => {
    const body = document.body;
    if (showing) {
      body.classList.add('pb-[70px]');
    } else {
      body.classList.remove('pb-[70px]');
    }

    return () => {
      body.classList.remove('pb-[70px]');
    };
  }, [showing]);

  return null;
}

