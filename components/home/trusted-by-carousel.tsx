'use client';

import Image from 'next/image';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

const CLIENT_LOGOS = [
  'anchorhead-studio.png',
  'august.png',
  'dwarven-forge.png',
  'ehouse.png',
  'kavalkade-white.png',
  'levi-strauss.png',
  'sleepless-media.png',
  'soundvent.png',
  'tepui.png',
  'yale.png',
];

export function TrustedByCarousel() {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      className="py-8 sm:py-12 md:pb-0 md:pt-0 overflow-visible"
      data-component="TrustedByCarousel"
      data-file="components/home/trusted-by-carousel.tsx"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <Card className="relative w-full max-w-6xl mx-auto py-4 sm:py-6 gradient-overlay">
          <Badge 
            className="inline-flex items-center rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/20 bg-primary text-primary-foreground absolute left-1/2 -translate-x-1/2 -top-3 font-mono text-md sm:text-md px-10 sm:px-10 py-1 font-bold"
          >
            Trusted by Top Brands
          </Badge>
          {/* Carousel Container - Full width */}
          <div className="relative overflow-hidden w-full">
          {/* Left Fade Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-card to-transparent" />
          
          {/* Right Fade Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-card to-transparent" />

          {/* Carousel Track */}
          <div className="flex animate-scroll">
            {duplicatedLogos.map((logo, index) => {
              const isLeviStrauss = logo === 'levi-strauss.png';
              const isAugust = logo === 'august.png';
              const isDwarvenForge = logo === 'dwarven-forge.png';
              const needsBrightening = isLeviStrauss || isAugust;
              const needsSizeIncrease = isLeviStrauss || isDwarvenForge;
              return (
                <div
                  key={`${logo}-${index}`}
                  className={`flex-shrink-0 mx-2 sm:mx-4 flex items-center justify-center ${needsSizeIncrease ? 'w-[200px] sm:w-[300px]' : 'w-[120px] sm:w-[170px]'}`}
                >
                  <div
                    className={`w-full relative transition-all duration-300 ${
                      needsBrightening
                        ? 'h-20 sm:h-32 brightness-175 opacity-100 grayscale'
                        : 'h-12 sm:h-20 grayscale hover:grayscale-0 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={`/images/client-logos/${logo}`}
                      alt={logo.replace('.png', '').replace(/-/g, ' ')}
                      fill
                      className="object-contain"
                      sizes={needsSizeIncrease ? '(max-width: 640px) 200px, 300px' : '(max-width: 640px) 120px, 170px'}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 50s linear infinite;
          display: flex;
          width: fit-content;
        }
      `}</style>
    </section>
  );
}

