'use client';

import { useEffect, useState, useRef } from "react";
import Logo from "../ui/logo";

export default function SplashScreen() {
  const [logoVisible, setLogoVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);
  const hasMountedRef = useRef(false);
  const logoShowStartTime = useRef<number | null>(null);
  const MIN_SHOW_DURATION = 1200; // 1 second minimum show duration

  useEffect(() => {
    // Only run once on mount
    if (hasMountedRef.current) return;
    hasMountedRef.current = true;

    // Check if this is a full page load/refresh vs client-side navigation
    // Use performance API to detect navigation type
    let isFullPageLoad = true; // Default to true (show splash) if we can't determine
    
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (navigation) {
        // Only show on 'navigate' (initial load) or 'reload' (refresh)
        // Don't show on 'back_forward' or other types
        isFullPageLoad = navigation.type === 'navigate' || navigation.type === 'reload';
      }
    } catch (e) {
      // Performance API not available, default to showing (safer for initial loads)
      console.warn('Performance API not available, defaulting to show splash screen');
    }
    
    // Only show on full page loads (initial load or refresh), not on client-side navigation
    if (!isFullPageLoad) {
      return;
    }

    setShouldMount(true);

    let loadHandler: (() => void) | null = null;
    let loadTimer: NodeJS.Timeout | null = null;

    // Show logo after a short delay
    const showTimer = setTimeout(() => {
      // Track when logo starts showing
      logoShowStartTime.current = Date.now();
      setLogoVisible(true);
      
      // Detect when window is fully loaded (after logo has shown)
      loadHandler = () => {
        const hideLogo = () => {
          // Set logo visibility to false
          setLogoVisible(false);
          
          // Wait for logo hide animation to complete
          // Longest animation: 700ms duration + 250ms delay = 950ms total
          // Use 900ms to fade out slightly before the last element finishes for snappier feel
          setTimeout(() => {
            // Fade out splash screen immediately after logo finishes hiding
            setIsFadingOut(true);
            
            // Unmount after fade animation completes (700ms fade duration)
            setTimeout(() => {
              setShouldMount(false);
            }, 700);
          }, 700);
        };

        // Calculate how long the logo has been showing
        if (logoShowStartTime.current !== null) {
          const elapsed = Date.now() - logoShowStartTime.current;
          const remaining = MIN_SHOW_DURATION - elapsed;
          
          if (remaining > 0) {
            // Wait for the remaining time to complete the minimum show duration
            setTimeout(() => {
              hideLogo();
            }, remaining);
          } else {
            // Minimum duration has passed, hide immediately
            hideLogo();
          }
        } else {
          // Fallback if timing wasn't tracked
          hideLogo();
        }
      };

      // Check if already loaded (in case event fired before we attached listener)
      if (document.readyState === 'complete') {
        // Page already loaded, but ensure logo shows for minimum duration
        loadTimer = setTimeout(() => {
          if (loadHandler) loadHandler();
        }, Math.max(200, MIN_SHOW_DURATION));
      } else {
        window.addEventListener('load', loadHandler);
      }
    }, 250);

    return () => {
      clearTimeout(showTimer);
      if (loadTimer) clearTimeout(loadTimer);
      if (loadHandler) {
        window.removeEventListener('load', loadHandler);
      }
    };
  }, []);

  // Don't render if unmounted
  if (!shouldMount) {
    return null;
  }

  return (    
    <div className={`fixed top-0 left-0 right-0 bottom-0 bg-background/50 backdrop-blur-lg z-[9999] flex items-center justify-center transition-all duration-300 ${
      isFadingOut ? 'h-[0vh]' : 'h-[100vh]'
    }`}>
      <div className="w-[200px] h-[200px] flex items-center justify-center animate-pulse">
        <Logo isVisible={logoVisible} />
      </div>
    </div>
  );
}