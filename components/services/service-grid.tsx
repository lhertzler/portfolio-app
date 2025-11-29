'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/use-is-mobile';
import { ChevronRight } from 'lucide-react';
import { ServiceItem } from './featured-service-card';

interface ServiceGridProps {
  services: ServiceItem[];
  onOpen: (service: ServiceItem) => void;
}

export function ServiceGrid({ services, onOpen }: ServiceGridProps) {
  const isMobile = useIsMobile();

  return (
    <div className="grid md:grid-cols-3 gap-8" data-component="ServiceGrid" data-file="components/services/service-grid.tsx">
      {services.map((service, index) => {
        const createServiceSlug = (title: string) => {
          return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        };
        return (
        <motion.div
          key={service.title}
          id={`service-${createServiceSlug(service.title)}`}
          className="scroll-mt-24"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
          transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
        >
          <Card 
            className="h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-md group"
            onClick={() => onOpen(service)}
            data-cursor="tap"
          >
            <CardHeader className="pb-3 flex-1">
              <CardTitle className="text-lg font-mono mb-2">
                {service.title}
              </CardTitle>
              <CardDescription className="text-sm font-mono leading-relaxed">
                {service.description.short}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0 flex flex-col justify-between">
              {/* Badges */}
              {service.badgeLabels && service.badgeLabels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.badgeLabels.slice(0, 2).map((label) => (
                    <Badge key={label} variant="default" className="text-xs font-mono">
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Learn More Link */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(service);
                }}
                className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1 self-end group-hover:gap-2 transition-all"
                data-cursor="tap"
              >
                Learn more
                <ChevronRight className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        </motion.div>
        );
      })}
    </div>
  );
}

