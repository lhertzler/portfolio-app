'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useUIStore } from '@/store/ui-store';
import { useToast } from '@/components/ui/toast';
import { Loader2 } from 'lucide-react';

const SERVICES = [
  'Custom Shopify Theme',
  'General Frontend Work',
  'Shopify Feature / App',
  'Migrations',
  'Headless / Next.js',
  'Other',
] as const;

export function AgencyContactDialog() {
  const { isAgencyContactDialogOpen, closeAgencyContactDialog } = useUIStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agencyName: '',
    website: '',
    engagementType: '',
    servicesNeeded: [] as string[],
    otherService: '',
    urgency: '',
    projectBudget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.agencyName.trim()) {
      newErrors.agencyName = 'Agency name is required';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    } else if (!/^https?:\/\/.+\..+/.test(formData.website.trim())) {
      newErrors.website = 'Please enter a valid URL (e.g., https://example.com)';
    }

    // Optional fields validation (only validate if "Other" is selected)
    if (formData.servicesNeeded.includes('Other') && !formData.otherService.trim()) {
      newErrors.otherService = 'Please specify the other service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const newServices = prev.servicesNeeded.includes(service)
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service];
      return { ...prev, servicesNeeded: newServices };
    });
    if (errors.servicesNeeded) {
      setErrors({ ...errors, servicesNeeded: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form.',
        variant: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact/agency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: 'Message Sent!',
        description: data.message || 'Thank you for your message. I\'ll get back to you soon.',
        variant: 'success',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        agencyName: '',
        website: '',
        engagementType: '',
        servicesNeeded: [],
        otherService: '',
        urgency: '',
        projectBudget: '',
        message: '',
      });
      setErrors({});
      closeAgencyContactDialog();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isAgencyContactDialogOpen} onOpenChange={closeAgencyContactDialog}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle>Let&apos;s partner together.</DialogTitle>
          <DialogDescription>
            Fill out the form below to get in touch.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Name *"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                className={errors.name ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={errors.email ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Agency Name and Website Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Agency Name *"
                value={formData.agencyName}
                onChange={(e) => {
                  setFormData({ ...formData, agencyName: e.target.value });
                  if (errors.agencyName) setErrors({ ...errors, agencyName: '' });
                }}
                className={errors.agencyName ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.agencyName && <p className="text-sm text-red-500 mt-1">{errors.agencyName}</p>}
            </div>
            <div>
              <Input
                type="url"
                placeholder="Website *"
                value={formData.website}
                onChange={(e) => {
                  setFormData({ ...formData, website: e.target.value });
                  if (errors.website) setErrors({ ...errors, website: '' });
                }}
                className={errors.website ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.website && <p className="text-sm text-red-500 mt-1">{errors.website}</p>}
            </div>
          </div>

          {/* Message */}
          <div>
            <Textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: '' });
              }}
              className={errors.message ? 'border-red-500' : ''}
              rows={6}
              disabled={isSubmitting}
            />
            {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
          </div>

          {/* Additional Options Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="additional-options">
              <AccordionTrigger>Additional Options</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                {/* Engagement Type */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Engagement Type</Label>
                  <RadioGroup
                    value={formData.engagementType}
                    onValueChange={(value) => {
                      setFormData({ ...formData, engagementType: value, projectBudget: value !== 'One-Time Project' ? '' : formData.projectBudget });
                      if (errors.engagementType) setErrors({ ...errors, engagementType: '' });
                    }}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="One-Time Project" id="engagement-one-time" />
                      <Label htmlFor="engagement-one-time" className="text-sm font-normal cursor-pointer">
                        One-Time Project
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ongoing Work / Retainer" id="engagement-retainer" />
                      <Label htmlFor="engagement-retainer" className="text-sm font-normal cursor-pointer">
                        Ongoing Work / Retainer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Both / Not Sure" id="engagement-both" />
                      <Label htmlFor="engagement-both" className="text-sm font-normal cursor-pointer">
                        Both / Not Sure
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.engagementType && <p className="text-sm text-red-500 mt-1">{errors.engagementType}</p>}
                </div>

                {/* Services Needed */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Services Needed</Label>
                  <div className="space-y-2">
                    {SERVICES.map((service) => {
                      const serviceId = `service-${service.toLowerCase().replace(/\s+/g, '-')}`;
                      const isChecked = formData.servicesNeeded.includes(service);
                      return (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={serviceId}
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              setFormData((prev) => {
                                if (checked) {
                                  return { ...prev, servicesNeeded: [...prev.servicesNeeded, service] };
                                } else {
                                  return { ...prev, servicesNeeded: prev.servicesNeeded.filter((s) => s !== service) };
                                }
                              });
                              if (errors.servicesNeeded) {
                                setErrors({ ...errors, servicesNeeded: '' });
                              }
                            }}
                            disabled={isSubmitting}
                          />
                          <Label htmlFor={serviceId} className="text-sm font-normal cursor-pointer">
                            {service}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  {formData.servicesNeeded.includes('Other') && (
                    <div className="mt-3">
                      <Input
                        placeholder="Please specify other service"
                        value={formData.otherService}
                        onChange={(e) => {
                          setFormData({ ...formData, otherService: e.target.value });
                          if (errors.otherService) setErrors({ ...errors, otherService: '' });
                        }}
                        className={errors.otherService ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.otherService && <p className="text-sm text-red-500 mt-1">{errors.otherService}</p>}
                    </div>
                  )}
                  {errors.servicesNeeded && <p className="text-sm text-red-500 mt-1">{errors.servicesNeeded}</p>}
                </div>

                {/* Urgency / Timeline */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Urgency / Timeline</Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => {
                      setFormData({ ...formData, urgency: value });
                      if (errors.urgency) setErrors({ ...errors, urgency: '' });
                    }}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ASAP (This Week)" id="urgency-asap" />
                      <Label htmlFor="urgency-asap" className="text-sm font-normal cursor-pointer">
                        ASAP (This Week)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Within 2 Weeks" id="urgency-2weeks" />
                      <Label htmlFor="urgency-2weeks" className="text-sm font-normal cursor-pointer">
                        Within 2 Weeks
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Within 30 Days" id="urgency-30days" />
                      <Label htmlFor="urgency-30days" className="text-sm font-normal cursor-pointer">
                        Within 30 Days
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Just Exploring Options" id="urgency-exploring" />
                      <Label htmlFor="urgency-exploring" className="text-sm font-normal cursor-pointer">
                        Just Exploring Options
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.urgency && <p className="text-sm text-red-500 mt-1">{errors.urgency}</p>}
                </div>

                {/* Project Budget - Only visible if engagement type is One-Time Project */}
                {formData.engagementType === 'One-Time Project' && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Project Budget</Label>
                    <Select
                      value={formData.projectBudget}
                      onValueChange={(value) => {
                        setFormData({ ...formData, projectBudget: value });
                        if (errors.projectBudget) setErrors({ ...errors, projectBudget: '' });
                      }}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className={errors.projectBudget ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<$5k">&lt;$5k</SelectItem>
                        <SelectItem value="$5k–$10k">$5k–$10k</SelectItem>
                        <SelectItem value="$10k–$25k">$10k–$25k</SelectItem>
                        <SelectItem value="$25k–$50k">$25k–$50k</SelectItem>
                        <SelectItem value="$50k+">$50k+</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.projectBudget && <p className="text-sm text-red-500 mt-1">{errors.projectBudget}</p>}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeAgencyContactDialog}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

