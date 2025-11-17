'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/store/ui-store';

export function InspectorOverlay() {
  const { inspectMode } = useUIStore();
  const [highlighted, setHighlighted] = useState<{
    component: string;
    file: string;
    rect: DOMRect;
  } | null>(null);

  useEffect(() => {
    if (!inspectMode) {
      setHighlighted(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (!element) {
        setHighlighted(null);
        return;
      }

      // Walk up the DOM tree to find element with data-component
      let current: Element | null = element;
      while (current) {
        const component = current.getAttribute('data-component');
        const file = current.getAttribute('data-file') || '';
        if (component) {
          const rect = current.getBoundingClientRect();
          setHighlighted({ component, file, rect });
          return;
        }
        current = current.parentElement;
      }
      setHighlighted(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [inspectMode]);

  if (!inspectMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {highlighted && (
        <>
          <div
            className="absolute border-2 border-primary bg-primary/10"
            style={{
              left: `${highlighted.rect.left}px`,
              top: `${highlighted.rect.top}px`,
              width: `${highlighted.rect.width}px`,
              height: `${highlighted.rect.height}px`,
            }}
          />
          <div
            className="absolute bg-primary text-primary-foreground px-2 py-1 text-xs rounded shadow-lg pointer-events-auto"
            style={{
              left: `${highlighted.rect.left}px`,
              top: `${highlighted.rect.top - 30}px`,
            }}
          >
            <div className="font-semibold">{highlighted.component}</div>
            {highlighted.file && (
              <div className="text-[10px] opacity-75">{highlighted.file}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

