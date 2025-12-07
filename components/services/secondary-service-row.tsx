'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/use-is-mobile';
import { ServiceItem } from './featured-service-card';
import { ServiceGraphic } from './service-graphic';

interface SecondaryServiceRowProps {
  services: ServiceItem[];
  onOpen: (service: ServiceItem) => void;
}

export function SecondaryServiceRow({ services, onOpen }: SecondaryServiceRowProps) {
  const isMobile = useIsMobile();

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8" data-component="SecondaryServiceRow" data-file="components/services/secondary-service-row.tsx">
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
            className="h-full flex flex-col gradient-overlay-softer cursor-pointer transition-all duration-300 hover:shadow-lg group overflow-hidden"
            onClick={() => onOpen(service)}
            data-cursor="tap"
          >
            {/* Service Graphic */}
            <ServiceGraphic graphicType={service.graphicType} />
            
            <CardHeader className="pb-4 flex-1">
              <div className="flex items-center gap-3 mb-3">
                {service.icon && (
                  <service.icon className="h-6 w-6 text-primary shrink-0" />
                )}
                <CardTitle className="text-xl md:text-2xl font-mono">
                  {service.title}
                </CardTitle>
              </div>
              <CardDescription className="text-md font-mono leading-relaxed">
                {service.description.full}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Badges */}
              {service.badgeLabels && service.badgeLabels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.badgeLabels.slice(0, 3).map((label) => (
                    <Badge key={label} variant="default" className="text-xs font-mono">
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* More Details Link */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(service);
                }}
                className="text-sm font-mono text-primary hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                data-cursor="tap"
              >
                More details
                <span className="text-xs">→</span>
              </button>
            </CardContent>
          </Card>
        </motion.div>
        );
      })}
    </div>
  );
}

