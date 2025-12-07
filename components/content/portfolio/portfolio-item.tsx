'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/lib/use-is-mobile';
import { ImageAndText } from '@/components/content/image-and-text';
import type { Project } from '@/lib/projects';

// Helper function to truncate text to a specific word count
function truncateText(text: string, maxWords: number): string {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

interface PortfolioItemProps {
  project: Project;
  index: number;
}

export function PortfolioItem({ project, index }: PortfolioItemProps) {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isVisible, setIsVisible] = useState(isMobile || index < 3); // First 3 items visible immediately

  // Check if element is in viewport on mount
  useEffect(() => {
    if (isMobile || isVisible) return;

    const checkVisibility = () => {
      if (ref.current) {
        const rect = (ref.current as HTMLElement).getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight + 200 && rect.bottom > -200;
        if (inViewport) {
          setIsVisible(true);
        }
      }
    };

    // Check immediately
    checkVisibility();
    // Also check after a brief delay to catch any layout shifts
    const timeout = setTimeout(checkVisibility, 100);
    
    return () => clearTimeout(timeout);
  }, [isMobile, isVisible]);

  // Trigger when useInView detects it
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={isMobile || index < 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      animate={isMobile || isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={isMobile ? undefined : { delay: index < 3 ? index * 0.1 : 0, duration: 0.5 }}
      className="w-full"
      data-component="PortfolioItem"
      data-file="components/portfolio/portfolio-item.tsx"
    >
      <ImageAndText
        card={true}
        wrapperLink={`/portfolio/${project.slug}`}
        imagePosition="left"
        image={project.featuredImage || '/images/layout/bg.png'}
        title={project.title}
        content={truncateText(project.summary, 30)}
        buttonText="View Project"
        badges={project.tags.slice(0, 4)}
      />
    </motion.div>
  );
}

