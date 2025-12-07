'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface CaseStudyCardProps {
  title: string;
  summary: string;
  fullContent: string;
  isMonospace?: boolean;
}

export function CaseStudyCard({ title, summary, fullContent, isMonospace = false }: CaseStudyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-foreground text-3xl font-bold font-mono">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="prose prose-sm sm:prose-base max-w-none mb-4">
            <p className="text-foreground whitespace-pre-line">{summary}</p>
          </div>
          <div className="mt-auto pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
              data-cursor="tap"
            >
              <span>Read More</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className={`prose prose-sm sm:prose-base max-w-none mt-4 ${isMonospace ? 'font-mono text-sm' : ''}`}>
            <div className="whitespace-pre-line text-foreground">{fullContent}</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

