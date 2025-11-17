'use client';

import { useUIStore } from '@/store/ui-store';
import Image from 'next/image';

export function BackgroundImage() {
  const themeMode = useUIStore((state) => state.themeMode);
  
  // Use bg-dark.png for dark and studio themes, bg.png for light theme
  const imageSrc = themeMode === 'light' 
    ? '/images/layout/bg.png' 
    : '/images/layout/bg-dark.png';

  return (
    <div className="fixed inset-0 top-0 -z-10 w-full h-full pointer-events-none">
      <Image
        src={imageSrc}
        alt="Background"
        fill
        className="object-cover object-top"
        priority
        quality={90}
      />
    </div>
  );
}

