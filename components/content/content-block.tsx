'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/use-is-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ContentBlockProps {
  title: string;
  titleHighlight?: string[];
  content?: Array<{ text: string; className?: string }>;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  textClassName?: string;
  primaryButton?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  outlineButton?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

function highlightTitle(title: string, highlights: string[] = []): React.ReactNode {
  if (highlights.length === 0) {
    return title;
  }

  // Create a regex pattern that matches any of the highlight strings
  const escapedHighlights = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escapedHighlights.join('|')})`, 'gi');
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = pattern.exec(title)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(title.substring(lastIndex, match.index));
    }
    
    // Add the highlighted match
    parts.push(
      <span key={`highlight-${keyIndex++}`} className="text-primary">
        {match[0]}
      </span>
    );
    
    lastIndex = pattern.lastIndex;
  }

  // Add remaining text after the last match
  if (lastIndex < title.length) {
    parts.push(title.substring(lastIndex));
  }

  return parts.length > 0 ? parts : title;
}

export function ContentBlock({ 
  title, 
  titleHighlight = [],
  content,
  className,
  contentClassName,
  titleClassName,
  textClassName,
  primaryButton,
  outlineButton,
}: ContentBlockProps) {
  const isMobile = useIsMobile();
  
  return (
    <section
      data-section="content-block"
      data-component="ContentBlock"
      data-file="components/content/content-block.tsx"
      className={cn("max-w-6xl mx-auto px-4 py-12 sm:py-16 lg:py-20 sm:px-6 lg:px-8", className)}
    >
      <div className={cn("max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", contentClassName)}>
        <motion.div 
          className={cn("text-center space-y-3 sm:space-y-4")}  
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
          transition={isMobile ? undefined : { duration: 0.5 }}
        >
          <h2 className={cn("text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-normal lg:leading-normal", titleClassName)}>
            {highlightTitle(title, titleHighlight)}
          </h2>
          
          <div className={cn("space-y-3 sm:space-y-4", textClassName)}>
            {content?.map((paragraph, index) => (
              <p 
                key={index}
                className={cn(
                  "text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed sm:leading-normal lg:leading-normal",
                  paragraph.className
                )}
              >
                {paragraph.text}
              </p>
            ))}
          </div>

          {(primaryButton || outlineButton) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              {primaryButton && (
                <Button
                  variant="default"
                  onClick={primaryButton.onClick}
                  asChild={!!primaryButton.href}
                >
                  {primaryButton.href ? (
                    <a href={primaryButton.href}>{primaryButton.label}</a>
                  ) : (
                    primaryButton.label
                  )}
                </Button>
              )}
              {outlineButton && (
                <Button
                  variant="outline"
                  onClick={outlineButton.onClick}
                  asChild={!!outlineButton.href}
                >
                  {outlineButton.href ? (
                    <a href={outlineButton.href}>{outlineButton.label}</a>
                  ) : (
                    outlineButton.label
                  )}
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

