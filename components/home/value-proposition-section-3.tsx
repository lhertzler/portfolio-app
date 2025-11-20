'use client'

import { Button } from "../ui/button";
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/ui-store';
import { useIsMobile } from '@/lib/use-is-mobile';

export function ValuePropositionThreeSection() {
  const openContactDialog = useUIStore((s) => s.openContactDialog);
  const isMobile = useIsMobile();
  return (
    <section
      data-section="value-proposition-3"
      data-component="ValuePropositionThreeSection"
      data-file="components/home/value-proposition-section-3.tsx"
      className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center space-y-4 sm:space-y-6"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
          transition={isMobile ? undefined : { duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-normal lg:leading-normal">
          Ready to build something serious? <span className="text-primary">Let's talk.</span>
          </h2>
          <Button
            variant="default"
            onClick={openContactDialog}
            size="lg"
            className="text-sm sm:text-base"
            data-cursor="tap"
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

