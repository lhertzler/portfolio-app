'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface ImageAndTextProps {
  card?: boolean;
  gradientOverlay?: boolean;
  wrapperLink?: string;
  imagePosition?: 'left' | 'right';
  imageFit?: 'contain' | 'cover';
  image: string;
  title?: string;
  content?: string;
  buttonText?: string;
  buttonLink?: string;
  badges?: string[];
  imageFullscreen?: boolean;
}

export function ImageAndText({
  card = true,
  gradientOverlay = true,
  wrapperLink,
  imagePosition = 'left',
  imageFit = 'contain',
  image,
  title,
  content,
  buttonText,
  buttonLink,
  badges = [],
  imageFullscreen = false,
}: ImageAndTextProps) {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const imageSection = (
    <div 
      className="relative w-full md:w-1/2 h-80 sm:h-96 md:h-[500px] flex-shrink-0"
      style={card ? { boxShadow: 'inset 0 0 80px 20px rgba(0, 0, 0, 0.5)' } : undefined}
    >
      <Image
        src={image}
        alt={title ?? 'Super rad image'}
        fill
        className={`object-${imageFit} object-center`}
        quality={90}
      />
      {imageFullscreen && (
        <>
          <button
            className="absolute top-4 right-4 z-20 p-2 rounded-md bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFullscreenOpen(true);
            }}
            data-cursor="tap"
            aria-label="View fullscreen"
            type="button"
          >
            <Maximize2 className="h-4 w-4 text-foreground" />
          </button>
          <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-black/95 border-none">
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={image}
                  alt={title ?? 'Fullscreen image'}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                  quality={100}
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );

  const contentSection = (
    <div className="relative w-full md:w-1/2 md:h-[500px] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex-shrink-0">
      {/* Gradient Overlay */}
      {gradientOverlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent" />
      )}
      <div className="relative z-10 w-full max-w-2xl">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            {title}
          </h2>
          {content && (
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              {content}
            </p>
          )}
          {buttonText && (
            <div className="mb-4 sm:mb-6">
              {buttonLink ? (
                <Link href={buttonLink}>
                  <Button
                    variant="default"
                    size="lg"
                    className="font-mono text-sm sm:text-base"
                    data-cursor="tap"
                  >
                    {buttonText}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="default"
                  size="lg"
                  className="font-mono text-sm sm:text-base"
                  data-cursor="tap"
                >
                  {buttonText}
                </Button>
              )}
            </div>
          )}
          {/* Tags Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <Badge
                  key={`${badge}-${index}`}
                  variant="secondary"
                  className="text-xs"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const contentWrapper = (
    <div className="relative z-20 flex">
      <div className="flex flex-col md:flex-row w-full">
        {imagePosition === 'left' ? (
          <>
            {imageSection}
            {contentSection}
          </>
        ) : (
          <>
            {contentSection}
            {imageSection}
          </>
        )}
      </div>
    </div>
  );

  const cardWrapper = card ? (
    <Card className="w-full overflow-hidden relative bg-card hover:shadow-lg transition-all duration-300">
      {contentWrapper}
    </Card>
  ) : (
    <div className="w-full overflow-hidden relative">
      {contentWrapper}
    </div>
  );

  if (wrapperLink) {
    return (
      <Link href={wrapperLink}>
        {cardWrapper}
      </Link>
    );
  }

  return cardWrapper;
}

