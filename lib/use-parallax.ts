'use client';

import { useRef } from 'react';
import { useScroll, useTransform, MotionValue, UseScrollOptions } from 'framer-motion';

export function useParallax(
  distance: number = 100,
  offset: number = 0
): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return { ref, y, opacity };
}

export function useScrollProgress(
  offset: NonNullable<UseScrollOptions['offset']> = ['start end', 'end start']
): {
  ref: React.RefObject<HTMLDivElement>;
  scrollProgress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  return { ref, scrollProgress: scrollYProgress };
}

