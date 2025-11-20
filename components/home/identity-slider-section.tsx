'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlayerStore } from '@/store/player-store';
import { useIsMobile } from '@/lib/use-is-mobile';

const IDENTITIES = [
  {
    id: 'engineer',
    title: 'The Engineer',
    tagline: 'I architect scalable web systems.',
    bullets: ['Next.js', 'Supabase', 'Stripe', 'Real-time', 'RLS'],
  },
  {
    id: 'designer',
    title: 'The Designer',
    tagline: 'I design interfaces that actually feel good to use.',
    bullets: ['Figma', 'Design Systems', 'UX Process'],
  },
  {
    id: 'musician',
    title: 'The Musician',
    tagline: 'I write and produce heavy, melodic music.',
    bullets: ['Kavalkade', 'Guitar/Production', 'SoundVent'],
  },
];

export function IdentitySliderSection() {
  const [activeTab, setActiveTab] = useState('engineer');
  const { playTrack } = usePlayerStore();
  const isMobile = useIsMobile();

  const activeIdentity = IDENTITIES.find((i) => i.id === activeTab) || IDENTITIES[0];

  return (
    <section
      id="identity"
      data-section="identity"
      data-component="IdentitySliderSection"
      data-file="components/home/identity-slider-section.tsx"
      className="py-12 sm:py-16 md:py-24 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Who I Am</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Full-Stack Engineer, UI/UX Designer, Musician
          </p>
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6 md:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
                <TabsTrigger value="engineer" className="text-xs sm:text-sm">Engineer</TabsTrigger>
                <TabsTrigger value="designer" className="text-xs sm:text-sm">Designer</TabsTrigger>
                <TabsTrigger value="musician" className="text-xs sm:text-sm">Musician</TabsTrigger>
              </TabsList>

              <AnimatePresence mode={isMobile ? undefined : "wait"}>
                <motion.div
                  key={activeTab}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  exit={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={isMobile ? undefined : { duration: 0.3 }}
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{activeIdentity.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6">
                      {activeIdentity.tagline}
                    </p>
                    <ul className="space-y-2 mb-4 sm:mb-6">
                      {activeIdentity.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-sm sm:text-base">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    {activeTab === 'musician' && (
                      <button
                        onClick={() => playTrack('prisoner-in-me')}
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Play a track
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
