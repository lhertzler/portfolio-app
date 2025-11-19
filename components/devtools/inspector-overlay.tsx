'use client';

import { useEffect, useState, useRef } from 'react';
import { useUIStore } from '@/store/ui-store';

export function InspectorOverlay() {
  const { inspectMode } = useUIStore();
  const overlayRef = useRef<HTMLDivElement>(null);
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
      // Get all elements at this point, filtering out the overlay itself
      const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
      
      // Filter out the overlay and its children
      const overlayElement = overlayRef.current;
      let relevantElements = elementsAtPoint.filter(el => {
        if (!overlayElement) return true;
        return !overlayElement.contains(el) && el !== overlayElement;
      });

      if (relevantElements.length === 0) {
        setHighlighted(null);
        return;
      }

      // Find ALL elements with data-component attributes in the entire tree
      // We want to find the most specific (innermost/closest to cursor) component
      const candidates: Array<{ 
        component: string; 
        file: string; 
        element: Element; 
        priority: number;
        depth: number;
        area: number;
      }> = [];
      
      // Start from the topmost element (closest to cursor)
      const topElement = relevantElements[0];
      
      // Walk up the entire tree from the cursor element
      let current: Element | null = topElement;
      let depth = 0;
      while (current && current !== document.documentElement) {
        const component = current.getAttribute('data-component');
        if (component) {
          const file = current.getAttribute('data-file') || '';
          const rect = current.getBoundingClientRect();
          const style = window.getComputedStyle(current);
          const isFixed = style.position === 'fixed';
          const isAbsolute = style.position === 'absolute';
          
          // Skip if fixed/absolute but cursor is not actually within bounds
          if (isFixed || isAbsolute) {
            if (
              e.clientX < rect.left ||
              e.clientX > rect.right ||
              e.clientY < rect.top ||
              e.clientY > rect.bottom
            ) {
              current = current.parentElement;
              depth++;
              continue;
            }
          }
          
          // Calculate priority: lower number = higher priority
          // Non-fixed elements get priority 0-1, fixed elements get priority 2-3
          let priority = isFixed || isAbsolute ? 2 : 0;
          
          // If it's header or audio player, give it lower priority
          if (component === 'Header' || component === 'AudioPlayer') {
            priority += 1;
          }
          
          // Calculate area - smaller area = more specific component
          const area = rect.width * rect.height;
          
          candidates.push({ 
            component, 
            file, 
            element: current, 
            priority,
            depth, // Lower depth = closer to cursor
            area   // Smaller area = more specific
          });
        }
        current = current.parentElement;
        depth++;
      }

      // Sort by priority, then by depth (closer to cursor), then by area (smaller = more specific)
      if (candidates.length > 0) {
        candidates.sort((a, b) => {
          // First sort by priority
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          // Then by depth (lower depth = closer to cursor = more specific)
          if (a.depth !== b.depth) {
            return a.depth - b.depth;
          }
          // Finally by area (smaller area = more specific component)
          return a.area - b.area;
        });
        
        const found = candidates[0];
        const rect = found.element.getBoundingClientRect();
        setHighlighted({ 
          component: found.component, 
          file: found.file, 
          rect 
        });
      } else {
        setHighlighted(null);
      }
    };

    // Use capture phase to ensure we get the event
    document.addEventListener('mousemove', handleMouseMove, true);
    return () => document.removeEventListener('mousemove', handleMouseMove, true);
  }, [inspectMode]);

  if (!inspectMode) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none z-[9999]" 
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
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

