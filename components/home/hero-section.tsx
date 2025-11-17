'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function HeroSection() {
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
      className="min-h-screen flex items-center justify-center scroll-mt-24 py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <Card>
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  Hey, I&apos;m Luke.
                </p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Senior{' '}
                  <span className="text-primary">
                    {'{'}Full Stack{'}'}
                  </span>
                  <br />
                  Web & App developer
                </h1>
                <p className="text-lg text-muted-foreground">
                  With expertise in cutting-edge technologies such as NodeJS, React, Angular, and Laravel... I deliver web solutions that are both innovative and robust.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Button
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
              </div>
              <div className="hidden md:block">
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
