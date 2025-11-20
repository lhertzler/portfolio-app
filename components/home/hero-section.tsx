'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUIStore } from '@/store/ui-store';

export function HeroSection() {
  const openContactDialog = useUIStore((s) => s.openContactDialog);

  return (
    <section
      id="hero"
      data-section="hero"
      data-component="HeroSection"
      data-file="components/home/hero-section.tsx"
      className="flex items-center justify-center scroll-mt-20 py-6 sm:py-8 transition-all duration-1000 ease-out"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Card className="gradient-overlay">
          <CardContent className="p-6 sm:p-8 md:px-[60px] md:py-10 relative">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-center">
              {/* Content */}
              <div className="md:col-span-2 space-y-6 sm:space-y-8 md:space-y-10 md:border-r md:border-border/50 md:pr-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold !leading-tight sm:!leading-normal">
                Shopify & Next.js Solutions <span className="text-primary font-mono">&lt;Architect/&gt;</span>
                </h1>
                <p className="text-base sm:text-lg text-foreground max-w-xl">
                I design, architect, and build custom Shopify themes, bespoke apps, and high-performance Next.js experiences that actually move the needle.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                  <Button
                    variant="default"
                    onClick={openContactDialog}
                    size="lg"
                    className="w-full sm:w-auto"
                    data-cursor="tap"
                  >
                    Start A Project
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">Now booking high-impact Shopify & Next.js builds</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="block relative md:order-3 flex justify-center md:block">
                <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden dark:mix-blend-difference opacity-90 border border-primary">
                  <Image
                    src="/images/luke/luke-poly.jpg"
                    alt="Luke Hertzler"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                  />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden mix-blend-darken">
                  <Image
                    src="/images/luke/luke-poly.jpg"
                    alt="Luke Hertzler"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
