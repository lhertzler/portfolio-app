'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/use-is-mobile';

export function ValuePropositionSection() {
  const isMobile = useIsMobile();
  return (
    <section
      data-section="value-proposition"
      data-component="ValuePropositionSection"
      data-file="components/home/value-proposition-section.tsx"
      className="pt-12 sm:pt-16 pb-20 sm:pb-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center space-y-3 sm:space-y-4"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
          transition={isMobile ? undefined : { duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-normal lg:leading-normal">
            Custom <span className="text-primary">Shopify</span> systems and modern <span className="text-primary">Next.js</span> applications.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed sm:leading-normal lg:leading-normal">
            I build custom Shopify solutions and bespoke Next.js apps that are engineered for performance, scalability, and long-term growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

