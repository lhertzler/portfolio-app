'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Gradient = {
  id: string;
  x: number;
  y: number;
  size: number;
  scrollOffset: number;
};

export function AnimatedGradients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const [gradients, setGradients] = useState<Gradient[]>([]);

  // Generate random gradients on mount
  useEffect(() => {
    const generateGradients = () => {
      const newGradients: Gradient[] = [];
      const count = 6; // Number of gradient orbs
      
      for (let i = 0; i < count; i++) {
        newGradients.push({
          id: `gradient-${i}`,
          x: Math.random() * 100, // Random x position (0-100%)
          y: Math.random() * 100, // Random y position (0-100%)
          size: 600 + Math.random() * 800, // Random size between 600-1400px (larger)
          scrollOffset: i * 0.15, // Offset each gradient's animation (more overlap)
        });
      }
      
      setGradients(newGradients);
    };

    generateGradients();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      data-component="AnimatedGradients"
      data-file="components/layout/animated-gradients.tsx"
    >
      {gradients.map((gradient) => (
        <GradientOrb
          key={gradient.id}
          gradient={gradient}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function GradientOrb({ gradient, scrollYProgress }: { gradient: Gradient; scrollYProgress: any }) {
  // Create opacity transform - subtle but visible
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, gradient.scrollOffset - 0.2),
      gradient.scrollOffset,
      gradient.scrollOffset + 0.4,
      Math.min(1, gradient.scrollOffset + 0.6),
    ],
    [0.08, 0.2, 0.2, 0.08] // Subtle opacity - starts at 0.08, peaks at 0.2
  );

  const [animationValues] = useState({
    scale: [1, 1.15 + Math.random() * 0.15, 1],
    x: [0, (Math.random() - 0.5) * 120, 0],
    y: [0, (Math.random() - 0.5) * 120, 0],
  });

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${gradient.x}%`,
        top: `${gradient.y}%`,
        width: `${gradient.size}px`,
        height: `${gradient.size}px`,
        background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.1) 40%, transparent 80%)`,
        transform: 'translate(-50%, -50%)',
        opacity,
        filter: 'blur(200px)',
      }}
      animate={{
        scale: animationValues.scale,
        x: animationValues.x,
        y: animationValues.y,
      }}
      transition={{
        duration: 8 + Math.random() * 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

