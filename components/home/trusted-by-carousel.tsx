'use client';

import Image from 'next/image';
import { Card } from '../ui/card';

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
      className="py-8 sm:py-12 md:pb-0 md:pt-0 overflow-visible flex items-center"
      data-component="TrustedByCarousel"
      data-file="components/home/trusted-by-carousel.tsx"
    >

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
      <Card className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center py-4 sm:py-6 gradient-overlay">
        {/* Left Text - Full width on mobile, 1/8 on desktop */}
        <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-0">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-foreground whitespace-nowrap text-center sm:text-left">
            Trusted by Top Brands
          </h2>
        </div>

        {/* Carousel Container - Full width on mobile, 7/8 on desktop */}
        <div className="relative overflow-hidden w-full sm:flex-1">
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

