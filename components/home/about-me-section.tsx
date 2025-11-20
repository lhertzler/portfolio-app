'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/use-is-mobile';

export function AboutMeSection() {
  const isMobile = useIsMobile();
  return (
    <section
      id="about"
      data-section="about"
      data-component="AboutMeSection"
      data-file="components/home/about-me-section.tsx"
      className="py-8 sm:py-12 md:py-16 overflow-visible"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
          transition={isMobile ? undefined : { duration: 0.5 }}
        >
          <Card className="gradient-overlay p-0">
            <CardContent className="p-4 sm:p-6 md:p-0">
              <div className="grid md:grid-cols-2 gap-6 md:gap-0 items-center">
                {/* Image */}
                <div className="relative w-full aspect-square max-w-sm sm:max-w-md mx-auto md:mx-0">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src="/images/luke/luke-techaron.jpg"
                      alt="Luke Hertzler"
                      fill
                      className="object-cover rounded-xl"
                      priority
                      quality={90}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 sm:space-y-6 md:mr-8 lg:mr-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">About Me</h2>
                  <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-foreground leading-relaxed">
                    <p>
                      I&apos;m Luke — a full-stack architect specializing in Shopify systems and modern web applications. I care about clarity, performance, and building software that feels intentional.
                    </p>
                    <p>
                      When I&apos;m not engineering products, I&apos;m writing music, recording with my band Kavalkade, or experimenting with audio tech and machine learning.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

