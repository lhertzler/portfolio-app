'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/ui-store';

export function ContactDialog() {
  const { isContactDialogOpen, closeContactDialog } = useUIStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    closeContactDialog();
  };

  return (
    <Dialog open={isContactDialogOpen} onOpenChange={closeContactDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Let&apos;s build something.</DialogTitle>
          <DialogDescription>
            Fill out the form below or reach out directly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Select
              value={formData.projectType}
              onValueChange={(value) => setFormData({ ...formData, projectType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-build">Full Build</SelectItem>
                <SelectItem value="shopify">Shopify</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="collab">Collab / Music</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={closeContactDialog}>
              Cancel
            </Button>
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

