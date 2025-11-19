'use client'

import { Button } from "../ui/button";
import { motion } from 'framer-motion';

export function ValuePropositionThreeSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-normal lg:leading-normal">
          Ready to build something serious? <span className="text-primary">Let's talk.</span>
          </h2>
          <Button
            variant="default"
            onClick={() => scrollToSection('contact')}
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

