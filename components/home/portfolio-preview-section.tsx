'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/projects';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Helper function to truncate text to 20 words
function truncateText(text: string, maxWords: number = 20): string {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

export function PortfolioPreviewSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate carousel with fade transitions
  useEffect(() => {
    if (isPlaying && featuredProjects.length > 1) {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
          setIsTransitioning(false);
        }, 500); // Half of transition duration
      }, 8000); // Rotate every 8 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, featuredProjects.length]);

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
      setIsTransitioning(false);
    }, 500);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const currentProject = featuredProjects[activeIndex];
  const isOdd = activeIndex % 2 === 0; // 0-indexed, so 0, 2, 4 are "odd" positions
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      data-section="portfolio"
      data-component="PortfolioPreviewSection"
      data-file="components/home/portfolio-preview-section.tsx"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8"
    >
      {/* Section Heading */}
      <motion.div 
        className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-normal lg:leading-normal">
          Solutions I've <span className="text-primary">Crafted</span>
        </h2>
      </motion.div>
      <div className="h-[400px] sm:h-[500px] md:h-[600px]">
        {/* Navigation Arrow - Left */}
        <button
          onClick={goToPrevious}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 p-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all text-primary"
          aria-label="Previous project"
          data-cursor="tap"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        {/* Container Parent */}
        <motion.div 
          className="w-full h-full"
          style={{ opacity, y, scale }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {/* Card Container */}
          <Card className="w-full h-full overflow-hidden relative bg-card">
            {/* Content Container - Flex Layout */}
            <div className="relative z-20 h-full flex">
              {/* Navigation Dots - Left Side */}
              <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 sm:gap-3 z-30">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                      index === activeIndex
                        ? 'bg-primary w-1.5 h-6 sm:w-2 sm:h-8'
                        : 'bg-muted-foreground/50 hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    data-cursor="tap"
                  />
                ))}
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="mt-1 sm:mt-2 p-1 sm:p-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all"
                  aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
                  data-cursor="tap"
                >
                  {isPlaying ? (
                    <Pause className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  ) : (
                    <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  )}
                </button>
              </div>

              {/* Layout: Image (50%) + Content (50%) - Flips on odd/even */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: 'easeInOut' }}
                  className={`flex h-full w-full ${isOdd ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Image Section - 50% width */}
                  <div className="relative w-1/2 h-full" style={{ boxShadow: 'inset 0 0 80px 20px rgba(0, 0, 0, 0.5)' }}>
                    {currentProject.featuredImage ? (
                      <Image
                        src={currentProject.featuredImage}
                        alt={currentProject.title}
                        fill
                        className="object-cover object-center"
                        quality={90}
                      />
                    ) : (
                      <div 
                        className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-background"
                        style={{
                          backgroundImage: `linear-gradient(to bottom right, hsl(var(--primary) / 0.2), hsl(var(--background))), linear-gradient(to top, hsl(var(--background)))`,
                        }}
                      />
                    )}
                  </div>

                  {/* Content Section - 50% width */}
                  <div className="relative w-1/2 h-full flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent" />
                    <div className="relative z-10 w-full max-w-2xl">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`content-${activeIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 1.0, ease: 'easeInOut' }}
                        >
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
                            {currentProject.title}
                          </h2>
                          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                            {truncateText(currentProject.summary, 20)}
                          </p>
                          <div className="mb-4 sm:mb-6">
                            <Link href={`/portfolio/${currentProject.slug}`}>
                              <Button
                                variant="default"
                                size="lg"
                                className="font-mono text-sm sm:text-base"
                                data-cursor="tap"
                              >
                                View Project
                              </Button>
                            </Link>
                          </div>
                          {/* Tags Badges */}
                          <div className="flex flex-wrap gap-2">
                            {currentProject.tags.slice(0, 4).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>

        {/* Navigation Arrow - Right */}
        <button
          onClick={goToNext}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 p-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all text-primary"
          aria-label="Next project"
          data-cursor="tap"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}

