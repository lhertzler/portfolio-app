'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUIStore } from '@/store/ui-store';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const SHOPIFY_SERVICES = [
  'Custom theme development',
  'Shopify app development',
  'Store optimization & performance',
  'Headless commerce solutions',
];

const CUSTOM_APP_SERVICES = [
  'Full-stack web applications',
  'Internal tools & dashboards',
  'Database design & implementation',
  'API development & integration',
];

export function ServicesSection() {
  const openContactDialog = useUIStore((s) => s.openContactDialog);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Cards start far apart, come together when centered, then stay together
  const leftCardX = useTransform(scrollYProgress, [0, 0.5, 1], [-80, 0, 0]);
  const rightCardX = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-section="services"
      data-component="ServicesSection"
      data-file="components/home/services-section.tsx"
      className="overflow-visible py-8 sm:py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 overflow-visible">
          {/* Shopify Services Card */}
          <motion.div
            style={{ x: leftCardX, opacity, scale }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <Card className="relative flex flex-col">
            <Badge 
              variant="default" 
              className="bg-primary text-primary-foreground absolute left-1/2 -translate-x-1/2 -top-3 font-mono text-md sm:text-md px-10 sm:px-10 py-1 font-bold"
            >
              Shopify
            </Badge>
            <div className="animated-border">
            <CardContent className="flex-1 flex flex-col pt-6 sm:pt-8 p-0">
              <div className="grid grid-cols-2 gap-0 flex-1 px-3 sm:px-6">
                {SHOPIFY_SERVICES.map((service, index) => {
                  const [firstWord, ...restWords] = service.split(' ');
                  const restText = restWords.join(' ');
                  const isTopLeft = index === 0;
                  const isTopRight = index === 1;
                  const isBottomLeft = index === 2;
                  
                  return (
                    <div
                      key={service}
                      className={`px-2 sm:px-4 min-h-32 sm:min-h-48 h-full flex flex-col items-center justify-center border-b border-r border-border last:border-r-0 ${
                        isTopLeft ? 'md:border-b md:border-r md:border-border' :
                        isTopRight ? 'md:border-b md:border-border' :
                        isBottomLeft ? 'md:border-r md:border-border' :
                        ''
                      }`}
                    >
                      <span className="text-sm sm:text-lg text-primary font-medium mb-1 text-center">{firstWord}</span>
                      <span className="text-xs sm:text-lg text-center">{restText}</span>
                    </div>
                  );
                })}
              </div>
              <Button 
                variant="outline"
                size="lg"
                onClick={openContactDialog}
                className="py-5 sm:py-7 w-full rounded-none rounded-b-2xl mt-auto bg-background/10 border-1 border-b !border-[#121212] text-primary hover:bg-primary hover:text-primary-foreground text-sm sm:text-base"
              >
                Start A Shopify Project
              </Button>
            </CardContent>
            </div>
          </Card>
          </motion.div>

          {/* Custom Application Development Card */}
          <motion.div
            style={{ x: rightCardX, opacity, scale }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <Card className="relative flex flex-col">
            <Badge 
              variant="default" 
              className="bg-primary text-primary-foreground absolute left-1/2 -translate-x-1/2 -top-3 font-mono text-md sm:text-md px-10 sm:px-10 py-1 font-bold"
            >
              Applications
            </Badge>
            <div className="animated-border">
            <CardContent className="flex-1 flex flex-col pt-6 sm:pt-8 p-0">
              <div className="grid grid-cols-2 gap-0 flex-1 px-3 sm:px-6">
                {CUSTOM_APP_SERVICES.map((service, index) => {
                  const [firstWord, ...restWords] = service.split(' ');
                  const restText = restWords.join(' ');
                  const isTopLeft = index === 0;
                  const isTopRight = index === 1;
                  const isBottomLeft = index === 2;
                  
                  return (
                    <div
                      key={service}
                      className={`px-2 sm:px-4 min-h-32 sm:min-h-48 h-full flex flex-col items-center justify-center border-b border-r border-border last:border-r-0 ${
                        isTopLeft ? 'md:border-b md:border-r md:border-border' :
                        isTopRight ? 'md:border-b md:border-border' :
                        isBottomLeft ? 'md:border-r md:border-border' :
                        ''
                      }`}
                    >
                      <span className="text-sm sm:text-lg text-primary font-medium mb-1 text-center">{firstWord}</span>
                      <span className="text-xs sm:text-lg text-center">{restText}</span>
                    </div>
                  );
                })}
              </div>
              <Button 
                variant="outline"
                size="lg"
                onClick={openContactDialog}
                className="py-5 sm:py-7 w-full rounded-none rounded-b-2xl mt-auto bg-background/10 border-1 border-b !border-[#121212] text-primary hover:bg-primary hover:text-primary-foreground text-sm sm:text-base"
              >
                Start An App Project
              </Button>
            </CardContent>
            </div>
          </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
