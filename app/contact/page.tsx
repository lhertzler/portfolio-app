'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { Loader2 } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    websiteUrl: '',
    service: '',
    estimatedBudget: '',
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

    if (!formData.service) {
      newErrors.service = 'Service is required';
    }

    if (!formData.estimatedBudget) {
      newErrors.estimatedBudget = 'Estimated budget is required';
    }

    // Website URL validation (optional but if provided, should be valid)
    if (formData.websiteUrl.trim() && !/^https?:\/\/.+\..+/.test(formData.websiteUrl.trim())) {
      newErrors.websiteUrl = 'Please enter a valid URL (e.g., https://example.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      const response = await fetch('/api/contact', {
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
        businessName: '',
        websiteUrl: '',
        service: '',
        estimatedBudget: '',
        message: '',
      });
      setErrors({});
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
    <div className="max-w-4xl mx-auto space-y-8" data-component="ContactPage" data-file="app/contact/page.tsx">
      <div data-component="ContactHeader" data-file="app/contact/page.tsx">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-muted-foreground">Let&apos;s build something together.</p>
      </div>
      <Card data-component="ContactForm" data-file="app/contact/page.tsx">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>Fill out the form below or reach out directly</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Business Name and Website URL Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={(e) => {
                    setFormData({ ...formData, businessName: e.target.value });
                    if (errors.businessName) setErrors({ ...errors, businessName: '' });
                  }}
                  className={errors.businessName ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.businessName && <p className="text-sm text-red-500 mt-1">{errors.businessName}</p>}
              </div>
              <div>
                <Input
                  type="url"
                  placeholder="Website URL"
                  value={formData.websiteUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, websiteUrl: e.target.value });
                    if (errors.websiteUrl) setErrors({ ...errors, websiteUrl: '' });
                  }}
                  className={errors.websiteUrl ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.websiteUrl && <p className="text-sm text-red-500 mt-1">{errors.websiteUrl}</p>}
              </div>
            </div>

            {/* Service and Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  value={formData.service}
                  onValueChange={(value) => {
                    setFormData({ ...formData, service: value });
                    if (errors.service) setErrors({ ...errors, service: '' });
                  }}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.service ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Service *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopify-theme-edits">Shopify Theme Edits</SelectItem>
                    <SelectItem value="custom-shopify-theme">Custom Shopify Theme Build</SelectItem>
                    <SelectItem value="shopify-app-development">Shopify App Development (Custom Private Apps)</SelectItem>
                    <SelectItem value="headless-shopify-build">Headless Shopify Build (Next.js)</SelectItem>
                    <SelectItem value="shopify-performance-optimization">Shopify Performance Optimization</SelectItem>
                    <SelectItem value="shopify-systems-integrations">Shopify Systems & Integrations</SelectItem>
                    <SelectItem value="custom-web-application">Custom Web Application (Next.js + Supabase)</SelectItem>
                    <SelectItem value="internal-tools-dashboards">Internal Tools / Dashboards</SelectItem>
                    <SelectItem value="api-development-integrations">API Development & Integrations</SelectItem>
                    <SelectItem value="long-term-engineering-partnership">Long-Term Engineering Partnership / Retainer</SelectItem>
                    <SelectItem value="consulting-architecture-review">Consulting / Architecture Review</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-sm text-red-500 mt-1">{errors.service}</p>}
              </div>
              <div>
                <Select
                  value={formData.estimatedBudget}
                  onValueChange={(value) => {
                    setFormData({ ...formData, estimatedBudget: value });
                    if (errors.estimatedBudget) setErrors({ ...errors, estimatedBudget: '' });
                  }}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.estimatedBudget ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Estimated Budget *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-10k">Less than $10k</SelectItem>
                    <SelectItem value="10k-20k">$10k - $20k</SelectItem>
                    <SelectItem value="20k-40k">$20k - $40k</SelectItem>
                    <SelectItem value="40k-80k">$40k - $80k</SelectItem>
                    <SelectItem value="80k-plus">$80k+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.estimatedBudget && <p className="text-sm text-red-500 mt-1">{errors.estimatedBudget}</p>}
              </div>
            </div>
            <div>
              <Textarea
                placeholder="Briefly describe your project..."
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

