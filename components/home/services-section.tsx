'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, ShoppingCart, Palette, Settings } from 'lucide-react';

const SERVICES = [
  {
    id: 'fullstack',
    title: 'Full-Stack Product Builds',
    icon: Code,
    description: 'End-to-end web applications built with modern stacks.',
    bullets: ['Next.js', 'Supabase', 'Stripe', 'Messaging', 'Dashboards'],
    tech: ['Next.js', 'Supabase', 'Stripe'],
  },
  {
    id: 'shopify',
    title: 'Shopify + E-commerce Systems',
    icon: ShoppingCart,
    description: 'Custom themes, apps, and integrations for e-commerce.',
    bullets: ['Theme Dev', 'Custom Apps', 'Printful', 'Headless'],
    tech: ['Shopify', 'Liquid', 'Printful'],
  },
  {
    id: 'design',
    title: 'UI/UX Design & Systems',
    icon: Palette,
    description: 'Thoughtful interfaces and scalable design systems.',
    bullets: ['Figma', 'Design Systems', 'Component Libraries'],
    tech: ['Figma', 'Design Systems'],
  },
  {
    id: 'consulting',
    title: 'Architecture & Technical Consulting',
    icon: Settings,
    description: 'Codebase audits, scaling strategies, and refactors.',
    bullets: ['Codebase Audits', 'Scaling Strategies', 'Refactors'],
    tech: ['Architecture', 'Performance'],
  },
];

export function ServicesSection() {
  const [activeService, setActiveService] = useState(SERVICES[0].id);

  const activeServiceData = SERVICES.find((s) => s.id === activeService) || SERVICES[0];

  return (
    <section
      id="services"
      data-section="services"
      data-component="ServicesSection"
      data-file="components/home/services-section.tsx"
      className="py-24 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Services</h2>
          <p className="text-lg text-muted-foreground">
            Designing solutions customized to meet your requirements
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>What I Offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      activeService === service.id
                        ? 'bg-accent/50 border border-border'
                        : 'hover:bg-accent/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{service.title}</span>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{activeServiceData.title}</CardTitle>
              <CardDescription>{activeServiceData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {activeServiceData.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {activeServiceData.tech.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
