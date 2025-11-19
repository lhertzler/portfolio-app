'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const PITCH_CARDS = [
  {
    title: 'Full-Service Build',
    description:
      "I handle design, architecture, and development end-to-end — no more juggling multiple freelancers or agencies.",
  },
  {
    title: 'Commerce-First Engineering',
    description:
      "From storefront UX to backend workflows, everything I build is tuned for performance, reliability, and revenue.",
  },
  {
    title: 'High-ROI Delivery',
    description:
      "When the foundation is clear and the architecture is deliberate, great work ships quickly — and stays reliable.",
  },
];

export function WhyHireSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Fade in as scrolling down, fade out as exiting
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <section
      ref={sectionRef}
      data-section="why-hire"
      data-component="WhyHireSection"
      data-file="components/home/why-hire-section.tsx"
      className="py-8 sm:py-12 md:pb-0 md:pt-0 overflow-visible min-h-[300px] flex items-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible w-full">
        <motion.div
          style={{ opacity, y }}
        >
          <Card className="p-3 sm:p-4 gradient-overlay">
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 overflow-visible">
              {PITCH_CARDS.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative flex flex-col justify-center p-3 sm:p-4 ${
                    index < PITCH_CARDS.length - 1 ? 'md:after:content-[""] md:after:absolute md:after:right-[-0.75rem] md:after:top-6 md:after:bottom-6 md:after:w-px md:after:bg-border' : ''
                  }`}
                >
                <div>
                  <div className="text-primary font-mono text-base sm:text-lg font-bold text-center">
                    {card.title}
                  </div>
                  <div className="pt-2 sm:pt-3 px-1 sm:px-2">
                    <p className="text-sm sm:text-base text-foreground text-center mb-0">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        </motion.div>
      </div>
    </section>
  );
}

