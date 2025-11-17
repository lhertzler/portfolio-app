'use client';

import { useUIStore } from '@/store/ui-store';
import Image from 'next/image';

export function BackgroundImage() {
  const themeMode = useUIStore((state) => state.themeMode);
  
  // Use bg-dark.png for dark and studio themes, bg.png for light theme
  const imageSrc = themeMode === 'dark' || themeMode === 'studio'
    ? '/images/layout/bg-dark.png' 
    : '/images/layout/bg.png';

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-[628px] z-0 pointer-events-none mix-blend-difference">
      <Image
        src={imageSrc}
        alt="Background"
        width={1920}
        height={628}
        className="w-full h-[628px] object-cover"
        priority
        quality={100}
      />
    </div>
  );
}

