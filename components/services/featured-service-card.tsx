'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/use-is-mobile';
import { ChevronRight, LucideIcon } from 'lucide-react';

export type ServiceItem = {
  title: string;
  description: {
    full: string;
    short: string;
  };
  badgeLabels: string[];
  benefits: string[];
  note?: string;
  priority?: 'featured' | 'secondary' | 'default';
  graphicType?: string; // Used to determine which graphic to render
  icon?: LucideIcon; // Icon component from lucide-react
};

interface FeaturedServiceCardProps {
  service: ServiceItem;
  onOpen: (service: ServiceItem) => void;
  onStartProject: () => void;
}

// Render custom graphic based on service type
const renderFeaturedGraphic = (graphicType?: string) => {
  // Headless Shopify - Show headless architecture with React UI connecting to Shopify backend
  if (graphicType === 'headless') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8 gap-4">
        <div className="relative w-full max-w-md">
          {/* React Frontend - Browser Window */}
          <div className="relative bg-background/95 backdrop-blur-sm rounded-xl shadow-2xl border-2 border-primary/40 overflow-hidden">
            {/* Browser Bar - macOS style */}
            <div className="h-8 bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/30 flex items-center gap-2 px-3">
              {/* Window Controls */}
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-destructive/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              {/* Address Bar */}
              <div className="flex-1 h-3 bg-background/60 rounded text-xs font-mono text-primary/60 px-2 flex items-center">
                storefront.example.com
              </div>
            </div>
            
            {/* Storefront Content */}
            <div className="p-6 space-y-3">
              {/* Hero Section */}
              <div className="h-16 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg flex items-center px-4">
                <div className="h-4 bg-primary/30 rounded w-1/2" />
              </div>
              
              {/* Product Grid - 3x2 */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i} 
                    className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded border border-primary/20"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Connection Pipelines */}
          <div className="relative flex flex-col items-center gap-3 mt-4">
            {/* Data Flow Lines */}
            <div className="relative w-full flex items-center justify-center">
              {/* Left side - React/Next.js */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-background/90 rounded-lg border-2 border-primary/40 flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                  </div>
                </div>
                <div className="text-xs font-mono text-primary/70">React</div>
              </div>
              
              {/* Connection Pipeline */}
              <div className="flex-1 flex items-center justify-center gap-1 mx-4">
                <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-primary/20" />
                {/* Data packets */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
                <div className="flex-1 h-0.5 bg-gradient-to-l from-primary/30 to-primary/20" />
              </div>
              
              {/* Right side - Shopify */}
              <div className="flex items-center gap-2">
                <div className="text-xs font-mono text-muted-foreground">Shopify</div>
                <div className="w-8 h-8 bg-background/90 rounded-lg border-2 border-border/50 flex items-center justify-center shadow-lg">
                  <div className="w-5 h-5 bg-muted/50 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary/20 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* API Layer Label */}
            <div className="relative w-full flex items-center justify-center">
              <div className="absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-background/80 rounded-full border border-primary/20">
                <div className="text-[10px] font-mono text-primary/60">Storefront API</div>
              </div>
            </div>

            {/* Shopify Backend Representation */}
            <div className="relative w-full bg-background/80 rounded-lg border border-border/40 p-3 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <div className="text-xs font-mono text-muted-foreground">Products • Collections • Cart</div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 bg-muted/40 rounded border border-border/30" />
                ))}
              </div>
            </div>
          </div>

          {/* Subtle Glow */}
          <div className="absolute inset-0 -z-10 bg-primary/5 blur-3xl rounded-lg" />
        </div>
      </div>
    );
  }

  // Default - Generic Shopify Theme
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-sm">
        {/* Mock Browser/App Frame */}
        <div className="relative bg-background/90 backdrop-blur-sm rounded-lg shadow-2xl border border-border/50 overflow-hidden">
          {/* Browser Bar */}
          <div className="h-8 bg-muted/50 border-b border-border/50 flex items-center gap-2 px-3">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-destructive/40" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
              <div className="w-2 h-2 rounded-full bg-green-500/40" />
            </div>
            <div className="flex-1 h-4 bg-background/50 rounded mx-2" />
          </div>
          
          {/* Mock UI Content */}
          <div className="p-6 space-y-4">
            {/* Header Bar */}
            <div className="h-6 bg-primary/20 rounded w-3/4" />
            
            {/* Content Bars */}
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
              <div className="h-3 bg-muted rounded w-4/6" />
            </div>
            
            {/* Button Mock */}
            <div className="pt-4">
              <div className="h-10 bg-primary/30 rounded w-32" />
            </div>
            
            {/* Grid Mock */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-muted/50 rounded" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Subtle Shadow/Glow */}
        <div className="absolute inset-0 -z-10 bg-primary/5 blur-2xl rounded-lg" />
      </div>
    </div>
  );
};

export function FeaturedServiceCard({ service, onOpen, onStartProject }: FeaturedServiceCardProps) {
  const isMobile = useIsMobile();
  
  const createServiceSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  return (
    <motion.div
      id={`service-${createServiceSlug(service.title)}`}
      className="mb-8 scroll-mt-24"
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={isMobile ? undefined : { once: true }}
      transition={isMobile ? undefined : { duration: 0.6 }}
      data-component="FeaturedServiceCard"
      data-file="components/services/featured-service-card.tsx"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Visual Mockup */}
            <div className="bg-primary/25 w-full md:w-[45%] relative h-64 md:h-auto min-h-[300px] md:min-h-[400px] flex items-center justify-center">
              {renderFeaturedGraphic(service.graphicType)}
            </div>
            
            {/* Right Column - Content */}
            <div className="w-full md:w-[55%] relative flex items-center justify-center p-8 md:p-12">
              <div className="relative z-10 w-full max-w-2xl space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    {service.icon && (
                      <service.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary shrink-0" />
                    )}
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono">
                      {service.title}
                    </h3>
                  </div>
                  {/* Badges */}
                  {service.badgeLabels && service.badgeLabels.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.badgeLabels.slice(0, 4).map((label) => (
                        <Badge
                          key={label}
                          variant="default"
                          className="text-xs font-mono"
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  
                  <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                    {service.description.full}
                  </p>

                  {service.benefits && service.benefits.length > 0 && (
                    <ul className="bg-background/50 backdrop-blur-sm rounded-xl space-y-3 p-4">
                      {service.benefits.map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    )}

                  {/* CTA Row */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="default"
                      size="lg"
                      className="font-mono w-full"
                      onClick={onStartProject}
                      data-cursor="tap"
                    >
                      Start a Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

