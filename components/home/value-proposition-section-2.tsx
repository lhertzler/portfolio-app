'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/use-is-mobile';

export function ValuePropositionTwoSection() {
  const isMobile = useIsMobile();
  return (
    <section
      data-section="value-proposition-2"
      data-component="ValuePropositionTwoSection"
      data-file="components/home/value-proposition-section-2.tsx"
      className="py-8 sm:py-12 md:pb-10 md:pt-20 lg:pt-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center space-y-3 sm:space-y-4"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
          transition={isMobile ? undefined : { duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-normal lg:leading-normal">
            Thoughtfully <span className="text-primary">crafted</span> products that get the <span className="text-primary">results</span> you're looking for.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed sm:leading-normal lg:leading-normal">
          Modern, scalable, beautifully engineered products — tailored for visionaries who want things done right the first time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

