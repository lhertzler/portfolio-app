'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { ServiceItem } from './featured-service-card';

interface ServiceDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: ServiceItem | null;
  onStartProject: () => void;
}

export function ServiceDetailsModal({ open, onOpenChange, service, onStartProject }: ServiceDetailsModalProps) {
  if (!service) return null;

  const handleStartProject = () => {
    onOpenChange(false);
    onStartProject();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-component="ServiceDetailsModal" data-file="components/services/service-details-modal.tsx">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl md:text-3xl font-mono">
            {service.title}
          </DialogTitle>
          {service.note && (
            <p className="text-lg text-muted-foreground leading-relaxed mt-2">
              {service.note}
            </p>
          )}
          {!service.note && service.description?.short && (
            <p className="text-lg text-muted-foreground leading-relaxed mt-2">
              {service.description.short}
            </p>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {service.description?.full && (
            <p className="text-md font-mono leading-relaxed mb-2">
              {service.description.full}
            </p>
          )}
        </div>

        <div className="space-y-6">
          {service.benefits && service.benefits.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-md font-mono leading-relaxed my-3">I can help with:</h3>
              <div className="bg-background/50 backdrop-blur-sm rounded-xl space-y-3 p-4">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-base text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badge Labels */}
          {service.badgeLabels && service.badgeLabels.length > 0 && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {service.badgeLabels.map((badge) => (
                  <Badge key={badge} variant="default" className="text-xs font-mono">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* CTA Bar */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:flex-1 font-mono"
              onClick={handleStartProject}
              data-cursor="tap"
            >
              Ready to Start?
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto font-mono"
              onClick={() => onOpenChange(false)}
              data-cursor="tap"
            >
              Back to services
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

