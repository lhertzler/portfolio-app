'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Repeat2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BadgesCarouselProps {
  badges: string[];
  className?: string;
  enableScaling?: boolean;
}

export function BadgesCarousel({ badges, className, enableScaling = true }: BadgesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
      duration: 35,
      dragFree: false,
      loop: true,
    },
    []
  );

  const [isHovered, setIsHovered] = React.useState(false);
  const [displayedIndex, setDisplayedIndex] = React.useState(0);
  const [fadingOutIndex, setFadingOutIndex] = React.useState<number | null>(null);
  const [isFadingIn, setIsFadingIn] = React.useState(false);
  const autoplayIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const fadeInTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const displayedIndexRef = React.useRef(0);
  const isTransitioningRef = React.useRef(false);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) {
      // Always 1 badge per slide, so last index = badges.length - 1
      const slidesCount = badges.length - 1;
      if (emblaApi.canScrollPrev()) {
        emblaApi.scrollPrev();
      } else {
        emblaApi.scrollTo(slidesCount, true);
      }
    }
  }, [emblaApi, badges.length]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0, true);
      }
    }
  }, [emblaApi]);

  const handleTransition = React.useCallback((newIndex: number) => {
    const currentIndex = displayedIndexRef.current;
    
    // Don't transition if it's the same index
    if (currentIndex === newIndex && !isTransitioningRef.current) {
      return;
    }

    // Clear any existing transitions
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    if (fadeInTimeoutRef.current) {
      clearTimeout(fadeInTimeoutRef.current);
      fadeInTimeoutRef.current = null;
    }

    isTransitioningRef.current = true;
    
    // Step 1: Start fade out
    // Left badge fades out immediately (500ms)
    // Right badge starts fading out after delay (500ms duration)
    // Both complete at: max(500ms, delay + 500ms) = 700ms (with 200ms delay)
    setFadingOutIndex(currentIndex);
    setIsFadingIn(false);

    // Step 2: After fade out completes (700ms) + delay (100ms) = 800ms
    // Switch to new slide and start fade in
    transitionTimeoutRef.current = setTimeout(() => {
      displayedIndexRef.current = newIndex;
      setDisplayedIndex(newIndex);
      setFadingOutIndex(null);
      setIsFadingIn(true);
      
      // After fade in completes, reset state
      fadeInTimeoutRef.current = setTimeout(() => {
        setIsFadingIn(false);
        isTransitioningRef.current = false;
        fadeInTimeoutRef.current = null;
      }, 650); // max delay (150ms) + fade in duration (500ms)
    }, 550); // 700ms fade out + 100ms delay
  }, []);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    handleTransition(newIndex);
  }, [emblaApi, handleTransition]);

  const startAutoplay = React.useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }

    if (!isHovered && emblaApi) {
      const autoplayInterval = 3500; // 3.5 seconds for all devices
      autoplayIntervalRef.current = setInterval(() => {
        if (emblaApi && !isHovered) {
          if (emblaApi.canScrollNext()) {
            emblaApi.scrollNext();
          } else {
            emblaApi.scrollTo(0, true);
          }
        }
      }, autoplayInterval);
    }
  }, [emblaApi, isHovered]);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reinitialize carousel when needed
  React.useEffect(() => {
    if (emblaApi) {
      // Clear any pending transitions
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
      if (fadeInTimeoutRef.current) {
        clearTimeout(fadeInTimeoutRef.current);
        fadeInTimeoutRef.current = null;
      }
      
      isTransitioningRef.current = false;
      emblaApi.reInit();
      displayedIndexRef.current = 0;
      setDisplayedIndex(0);
      setFadingOutIndex(null);
      setIsFadingIn(false);
    }
  }, [emblaApi]);

  // Add CSS to override Embla transforms
  React.useEffect(() => {
    const styleId = 'badges-carousel-override';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      [data-embla-container] {
        transform: translate3d(0px, 0px, 0px) !important;
      }
      [data-embla-slide] {
        transform: translate3d(0px, 0px, 0px) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  React.useEffect(() => {
    // Initialize displayedIndexRef
    displayedIndexRef.current = displayedIndex;
  }, []);

  React.useEffect(() => {
    displayedIndexRef.current = displayedIndex;
  }, [displayedIndex]);

  React.useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (fadeInTimeoutRef.current) {
        clearTimeout(fadeInTimeoutRef.current);
      }
    };
  }, [startAutoplay]);

  // Create slides: always 1 badge per slide
  const slides = React.useMemo(() => {
    const slideArray: string[][] = [];
    for (let i = 0; i < badges.length; i++) {
      slideArray.push([badges[i]]);
    }
    return slideArray;
  }, [badges]);

  if (badges.length === 0) return null;

  return (
    <div
      className={cn('group relative w-full mb-1', className)}
      onMouseEnter={() => {
        setIsHovered(true);
        if (autoplayIntervalRef.current) {
          clearInterval(autoplayIntervalRef.current);
          autoplayIntervalRef.current = null;
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        startAutoplay();
      }}
    >
      <div 
        className="overflow-hidden relative" 
        style={{ minHeight: '32px' }} 
        ref={emblaRef}
      >
        <div 
          className="flex relative" 
          data-embla-container
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0px, 0px, 0px) !important'
          }}
        >
          {slides.map((slideBadges, index) => {
            const isCurrentSlide = displayedIndex === index;
            const isFadingOutSlide = fadingOutIndex === index;
            const isFadingInSlide = isFadingIn && isCurrentSlide;
            
            // Determine target opacity:
            // - If fading out: target opacity is 0
            // - If fading in: target opacity is 1
            // - If stable and current: opacity is 1
            // - Otherwise: opacity is 0
            const targetOpacity = isFadingOutSlide ? 0 : (isFadingInSlide || (isCurrentSlide && !isFadingOutSlide && !isFadingIn)) ? 1 : 0;
            const shouldShow = targetOpacity > 0;
            
            return (
              <div
                key={index}
                data-embla-slide
                className="flex items-center justify-center gap-3 px-2 absolute w-full top-1/2 -translate-y-1/2"
                style={{ 
                  pointerEvents: shouldShow ? 'auto' : 'none',
                  zIndex: (isCurrentSlide || isFadingOutSlide) ? 1 : 0,
                  transform: 'translate3d(0px, 0px, 0px) !important'
                }}
              >
                {slideBadges.map((badge, badgeIndex) => {
                  // Since we only show 1 badge at a time, no delay needed
                  const delay = 0;
                  
                  // Determine scale:
                  // - Fading out: scale from 1 to 0.8
                  // - Fading in: scale from 0.8 to 1
                  // - Stable: scale 1
                  // - Hidden: scale 0.8 (initial state for fade in)
                  const targetScale = enableScaling
                    ? (isFadingOutSlide 
                        ? 0.8  // Scale down when fading out
                        : isFadingInSlide 
                        ? 1    // Scale up to 1 when fading in
                        : (isCurrentSlide && !isFadingOutSlide && !isFadingIn)
                        ? 1    // Normal scale when stable
                        : 0.8) // Initial scale for hidden badges
                    : 1; // No scaling when disabled
                  
                  return (
                    <Badge
                      key={`${index}-${badgeIndex}`}
                      variant="default"
                      className="text-xs whitespace-nowrap flex-shrink-0 transition-all duration-500 ease-in-out"
                      style={{
                        opacity: targetOpacity,
                        transform: enableScaling ? `scale(${targetScale})` : 'none',
                        transitionDelay: `${delay}ms`,
                      }}
                    >
                      {badge}
                    </Badge>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden absolute hover:bg-transparent hover:text-primary -left-0 top-1/2 -translate-y-1/2 h-8 w-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        onClick={scrollPrev}
        aria-label="Previous badges"
      >
        <Repeat2 className="h-5 w-5 rotate-180 hover:w-7 hover:h-7 text-white/50 hover:text-primary transition-all duration-400" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute hover:bg-transparent hover:text-primary -right-0 top-1/2 -translate-y-1/2 h-8 w-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity group-duration-400"
        onClick={scrollNext}
        aria-label="Next badges"
      >
        <Repeat2 className="h-5 w-5 text-white/50 hover:text-primary transition-all duration-700" />
      </Button>
    </div>
  );
}

