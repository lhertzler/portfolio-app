'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function HeroSection() {
  const [activeTab, setActiveTab] = useState('developer');

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
      id="hero"
      data-section="hero"
      data-component="HeroSection"
      data-file="components/home/hero-section.tsx"
      className="flex items-center justify-center scroll-mt-20 py-8 transition-all duration-1000 ease-out"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <Card className="gradient-overlay">
          <CardContent className="p-10 md:px-[60px] md:py-12 relative">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tabs positioned at top left */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                <TabsList className="h-8 bg-card/80 backdrop-blur-sm border border-border/50">
                  <TabsTrigger value="developer" className="text-xs px-3 py-1">
                    Developer / Designer
                  </TabsTrigger>
                  <TabsTrigger value="musician" className="text-xs px-3 py-1">
                    Musician
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="grid md:grid-cols-3 gap-8 items-center pt-8">
                {/* Image - appears first for musician tab, second for developer tab */}
                {activeTab === 'musician' && (
                  <div className="block relative md:order-1">
                    <div className="relative z-10 w-72 h-72 mx-auto rounded-full overflow-hidden mix-blend-difference opacity-90 border border-primary">
                      <Image
                        src="/images/luke/luke-headbanging-2008.jpeg"
                        alt="Luke Hertzler"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                      />
                    </div>
                    <div className="absolute top-0 left-0 w-72 h-72 mx-auto rounded-full overflow-hidden mix-blend-darken">
                      <Image
                        src="/images/luke/luke-headbanging-2008.jpeg"
                        alt="Luke Hertzler"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className={`md:col-span-2 space-y-6 ${activeTab === 'developer' ? 'md:border-r md:border-border/50' : activeTab === 'musician' ? 'md:border-l md:border-border/50 md:order-2' : ''}`}>
                  <TabsContent value="developer" className="mt-0 space-y-6">
                    <p className="text-muted-foreground text-sm uppercase tracking-wider">
                      👋 Hey, I&apos;m Luke.
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                      Developer <span className="text-primary">/</span> Designer
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl">
                      With expertise in cutting-edge technologies such as NodeJS, React, Angular, and Laravel... I deliver web solutions that are both innovative and robust.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      <Button
                        variant="default"
                        onClick={() => scrollToSection('portfolio')}
                        size="lg"
                        data-cursor="tap"
                      >
                        View Portfolio
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => scrollToSection('resume')}
                        data-cursor="tap"
                      >
                        Download Resume
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="musician" className="mt-0 space-y-6">
                    <p className="text-muted-foreground text-sm uppercase tracking-wider">
                      🎵 Music & Sound
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                      Musician
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl">
                      Creating original compositions and soundscapes. Exploring the intersection of technology and music through digital production and live performance.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      <Button
                        variant="default"
                        onClick={() => scrollToSection('lab')}
                        size="lg"
                        data-cursor="tap"
                      >
                        Listen to Music
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => scrollToSection('contact')}
                        data-cursor="tap"
                      >
                        Collaborate
                      </Button>
                    </div>
                  </TabsContent>
                </div>

                {/* Image - appears second for developer tab */}
                {activeTab === 'developer' && (
                  <div className="block relative md:order-3">
                    <div className="relative z-10 w-72 h-72 mx-auto rounded-full overflow-hidden mix-blend-difference opacity-90 border border-primary">
                      <Image
                        src="/images/luke/luke-poly.jpg"
                        alt="Luke Hertzler"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                      />
                    </div>
                    <div className="absolute top-0 left-0 w-72 h-72 mx-auto rounded-full overflow-hidden mix-blend-darken">
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
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
