'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/use-is-mobile';
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

  return (
    <motion.div
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
      transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
      className="w-full"
    >
      <Link href={`/portfolio/${project.slug}`}>
        <Card className="w-full overflow-hidden relative bg-card hover:shadow-lg transition-all duration-300" data-component="PortfolioItem" data-file="components/portfolio/portfolio-item.tsx">
          {/* Content Container - Flex Layout */}
          <div className="relative z-20 flex">
            {/* Layout: Image (50%) + Content (50%) - Image always on left */}
            <div className="flex flex-col md:flex-row w-full">
              {/* Image Section - Full width on mobile, 50% on desktop */}
              <div className="relative w-full md:w-1/2 h-80 sm:h-96 md:h-[500px] flex-shrink-0" style={{ boxShadow: 'inset 0 0 80px 20px rgba(0, 0, 0, 0.5)' }}>
                {project.featuredImage ? (
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="object-contain object-center"
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

              {/* Content Section - Full width on mobile, 50% on desktop */}
              <div className="relative w-full md:w-1/2 md:h-[500px] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex-shrink-0">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent" />
                <div className="relative z-10 w-full max-w-2xl">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                      {truncateText(project.summary, 30)}
                    </p>
                    <div className="mb-4 sm:mb-6">
                      <Button
                        variant="default"
                        size="lg"
                        className="font-mono text-sm sm:text-base"
                        data-cursor="tap"
                      >
                        View Project
                      </Button>
                    </div>
                    {/* Tags Badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

