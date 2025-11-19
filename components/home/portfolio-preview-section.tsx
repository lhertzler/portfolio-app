'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/projects';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

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
        }, 300); // Half of transition duration
      }, 5000); // Rotate every 5 seconds
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
    }, 300);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
      setIsTransitioning(false);
    }, 300);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const currentProject = featuredProjects[activeIndex];
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
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8"
    >
      <div className="h-[300px] sm:h-[400px] md:h-[500px]">
        {/* Navigation Arrow - Left */}
        <button
          onClick={goToPrevious}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-4 z-30 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all"
          aria-label="Previous project"
          data-cursor="tap"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Container Parent */}
        <motion.div 
          className="w-full h-full"
          style={{ opacity, y, scale }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {/* Card Container */}
          <Card className="w-full h-full overflow-hidden relative">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <div className="relative w-full h-full gradient-overlay">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    {currentProject.featuredImage ? (
                      <Image
                        src={currentProject.featuredImage}
                        alt={currentProject.title}
                        fill
                        className="object-cover"
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
                  </motion.div>
                </AnimatePresence>
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/60 z-10" />
              </div>
            </div>

            {/* Content Container */}
            <div className="relative z-20 h-full flex">
              {/* Navigation Dots - Left Side */}
              <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 sm:gap-3 z-20">
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

              {/* Project Info - Bottom Left */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-16 pb-8 sm:pb-12 md:pb-16 transition-opacity duration-500">
                <div className="max-w-2xl">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4 text-foreground">
                    {currentProject.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 max-w-xl">
                    {currentProject.summary}
                  </p>
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
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation Arrow - Right */}
        <button
          onClick={goToNext}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-4 z-30 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all"
          aria-label="Next project"
          data-cursor="tap"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}

