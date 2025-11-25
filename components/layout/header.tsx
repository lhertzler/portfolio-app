'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useUIStore } from '@/store/ui-store';
import { PanelRightOpen, Music, Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '../ui/logo';

type NavItem = {
  id: string;
  label: string;
  href: string;
};

const HOME_SECTIONS: NavItem[] = [
  { id: 'headless-shopify', label: 'Headless Shopify', href: '/headless-shopify' },
  { id: 'solutions', label: 'Solutions', href: '/solutions' },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  // Start with consistent initial value to avoid hydration mismatch
  const [liveUsersCount, setLiveUsersCount] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [isIncrease, setIsIncrease] = useState(true);
  const [isNoChange, setIsNoChange] = useState(false);
  const prevCountRef = useRef<number>(5);
  const isHomePage = pathname === '/';
  const isLogoVisible = useUIStore((s) => s.isLogoVisible);
  const setLogoVisible = useUIStore((s) => s.setLogoVisible);
  const isInitialMount = useRef(true);
  const previousPathname = useRef(pathname);
  const hideStartTime = useRef<number | null>(null);
  const MIN_HIDE_DURATION = 700; // 1 second minimum hide duration
  
  // Load from localStorage after mount to avoid hydration issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('liveUsersCount');
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 10) {
          setLiveUsersCount(parsed);
          prevCountRef.current = parsed;
        } else {
          // If stored value is invalid, generate random and save it
          const randomValue = Math.floor(Math.random() * 10) + 1;
          setLiveUsersCount(randomValue);
          prevCountRef.current = randomValue;
          localStorage.setItem('liveUsersCount', randomValue.toString());
        }
      } else {
        // No stored value, generate random and save it
        const randomValue = Math.floor(Math.random() * 10) + 1;
        setLiveUsersCount(randomValue);
        prevCountRef.current = randomValue;
        localStorage.setItem('liveUsersCount', randomValue.toString());
      }
    }
  }, []);

  const openSettings = useUIStore((s) => s.openSettings);
  const openContactDialog = useUIStore((s) => s.openContactDialog);
  const openEditorNav = useUIStore((s) => s.openEditorNav);
  const isContactDialogOpen = useUIStore((s) => s.isContactDialogOpen);

  // Listen for minimize events from audio player
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    const handleMinimizeChange = (e: CustomEvent<boolean>) => {
      setIsPlayerMinimized(e.detail);
    };
    
    window.addEventListener('player-minimize-change', handleMinimizeChange as EventListener);
    
    // Check initial state after mount to avoid hydration mismatch
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const bodyHasClass = document.body.classList.contains('player-minimized');
      setIsPlayerMinimized(bodyHasClass);
    });
    
    return () => {
      window.removeEventListener('player-minimize-change', handleMinimizeChange as EventListener);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Add hysteresis to prevent rapid toggling
          // Use different thresholds for scrolling up vs down
          if (currentScrollY > lastScrollY) {
            // Scrolling down
            setIsScrolled(currentScrollY > 80);
          } else {
            // Scrolling up
            setIsScrolled(currentScrollY > 40);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save live users count to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('liveUsersCount', liveUsersCount.toString());
    }
  }, [liveUsersCount]);

  // Live users count update
  const iterationCountRef = useRef(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsersCount(prev => {
        iterationCountRef.current += 1;
        // Every other time, change by 2, otherwise change by 1
        const changeAmount = iterationCountRef.current % 2 === 0 ? 2 : 1;
        
        let change: number;
        
        // If at 0, force positive change
        if (prev === 0) {
          change = changeAmount;
        } else {
          // Three options: increase, no change, or decrease
          const random = Math.random();
          if (random < 0.33) {
            // Increase
            change = changeAmount;
          } else if (random < 0.66) {
            // No change
            change = 0;
          } else {
            // Decrease
            change = -changeAmount;
          }
        }
        
        let next = prev + change;
        // Clamp values
        if (next < 0) next = 0;
        if (next > 10) next = 10;
        
        // Track change type for color coding
        const actualChange = next - prev;
        setIsNoChange(actualChange === 0);
        setIsIncrease(actualChange > 0);
        prevCountRef.current = next;
        
        // Trigger animation: fade out dot, fade in number
        setShowNumber(false); // Reset to dot first
        setTimeout(() => {
          setShowNumber(true); // Show number
          // After showing number briefly, fade back to dot
          setTimeout(() => {
            setShowNumber(false);
          }, 2000); // Show number for 2 seconds
        }, 300); // Small delay to ensure dot fades out first
        
        return next;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Track active section on homepage
  useEffect(() => {
    if (!isHomePage) return;

    const sections = HOME_SECTIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isHomePage]);

  // Handle hash navigation on mount
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash.slice(1);
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, [isHomePage]);

  // Show logo when page initially loads
  useEffect(() => {
    setLogoVisible(true);
  }, [setLogoVisible]);

  // Handle route changes: show after route loads (with minimum hide duration)
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousPathname.current = pathname;
      return;
    }

    // Only handle if pathname actually changed
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      
      // Calculate how long we've been hiding
      const showLogo = () => {
        setLogoVisible(true);
        hideStartTime.current = null;
      };

      if (hideStartTime.current !== null) {
        const elapsed = Date.now() - hideStartTime.current;
        const remaining = MIN_HIDE_DURATION - elapsed;
        
        if (remaining > 0) {
          // Wait for the remaining time to complete the minimum hide duration
          const timer = setTimeout(() => {
            showLogo();
          }, remaining);
          return () => clearTimeout(timer);
        } else {
          // Minimum duration has passed, show immediately
          showLogo();
        }
      } else {
        // No hide time tracked, show after small delay
        const timer = setTimeout(() => {
          showLogo();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, setLogoVisible]);

  // Global link click handler for all Next.js Link components
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      // Only handle internal links (starts with /)
      // Skip hash-only links (/#section) when on homepage (just scrolling)
      if (href.startsWith('/')) {
        // If it's a hash link on homepage, don't hide logo (just scrolling)
        if (href.startsWith('/#') && isHomePage) {
          return;
        }
        
        // If it's the same page, don't hide logo
        if (href === pathname) {
          return;
        }
        
        // Hide logo for navigation to different pages and track hide start time
        hideStartTime.current = Date.now();
        setLogoVisible(false);
      }
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, [pathname, isHomePage, setLogoVisible]);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();

    if (href === '/contact' || href === '/#contact') {
      openContactDialog();
      return;
    }

    // If href is a page route (starts with / but not /#), navigate to it
    if (href.startsWith('/') && !href.startsWith('/#')) {
      // Hide logo immediately on click and track hide start time
      hideStartTime.current = Date.now();
      setLogoVisible(false);
      router.push(href);
      return;
    }

    // Handle section anchors (/#section)
    if (href.startsWith('/#')) {
      if (isHomePage) {
        // On homepage, scroll to section (no navigation, keep logo visible)
        const sectionId = href.replace('/#', '');
        if (sectionId) {
          scrollToSection(sectionId);
        }
      } else {
        // On other pages, navigate to homepage with hash
        hideStartTime.current = Date.now();
        setLogoVisible(false);
        router.push(href);
      }
      return;
    }

    // Handle root path
    if (href === '/') {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        hideStartTime.current = Date.now();
        setLogoVisible(false);
        router.push('/');
      }
    }
  };

  const getNavItems = () => {
    return HOME_SECTIONS;
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Spacer to maintain layout when header is fixed */}
      <div className="h-[60px] sm:h-[65px] lg:h-[73px]" />
      <header
        className={`fixed top-0 left-0 right-0 z-40 mx-auto border font-mono overflow-x-hidden backdrop-blur-lg ${
          // Mobile: always fixed at top, no animation
          'lg:rounded-lg lg:transition-all lg:duration-700 lg:ease-in-out lg:will-change-transform'
        } ${
          isScrolled
            ? 'max-w-full bg-card/80 border-none shadow-lg shadow-black/10 translate-y-0'
            : 'max-w-full lg:max-w-7xl bg-card/80 dark:border-none translate-y-0 lg:translate-y-4 xl:translate-y-6'
        }`}
        data-component="Header"
        data-file="components/layout/header.tsx"
      >
        <div className={`animated-border bg-transparent flex items-center justify-between px-3 sm:px-4 lg:px-4 transition-all duration-700 ease-in-out ${
          isScrolled
            ? 'py-2 sm:py-2.5 lg:py-3 shadow-lg shadow-black/5'
            : 'py-2.5 sm:py-3 lg:py-4'
        }`}>
        {/* Left: Hamburger Menu (Mobile) + Brand */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hamburger Menu Button - Mobile Only */}
          <Button
            variant="ghost"
            size="icon"
            onClick={openEditorNav}
            className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 hover:bg-accent/50"
            aria-label="Open navigation menu"
            data-cursor="tap"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          <Link
            href="/"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // Hide logo when clicking to navigate home and track hide start time
                hideStartTime.current = Date.now();
                setLogoVisible(false);
              }
            }}
            className="flex items-center gap-1 sm:gap-2 font-mono"
          >
            <div className={`relative animate-pulse-slow md:ml-1 mr-2 transition-all duration-700 ease-in-out ${
              isScrolled 
                ? 'w-4 h-4' 
                : 'w-4 h-4 md:w-5 md:h-5 md:mr-1'
            }`}>
                <Logo isVisible={isLogoVisible} />
            </div>
            <span className={`font-bold transition-none lg:transition-all lg:duration-700 lg:ease-in-out hover:text-primary ${
              isScrolled 
                ? 'text-base lg:text-lg' 
                : 'text-base lg:text-xl xl:text-2xl'
            }`}>
              <span className="">Luke</span>
              <span className=""> Hertzler</span>
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-12 text-lg font-mono">
          {navItems.map((item) => {
            const isActive = isHomePage && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.href, e)}
                data-cursor="link"
                className={`transition-colors transition-all duration-500 ease-in-out font-mono font-bold whitespace-nowrap${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search + Music + Settings + Start A Project */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Icon Buttons - Hidden on Mobile (shown in hamburger menu) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Music Icon - Shows when player is minimized */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                document.body.classList.remove('player-minimized');
                setIsPlayerMinimized(false);
                
                // Dispatch event for other components
                window.dispatchEvent(new CustomEvent('player-minimize-change', { detail: false }));
              }}
              className={`h-9 w-9 hover:bg-accent/50 transition-opacity duration-200 ${
                isPlayerMinimized ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Show music player"
              data-cursor="tap"
            >
              <Music className="h-4 w-4" />
            </Button>

          </div>

          {/* Settings Icon */}
          <div className="scale-[1] hover:scale-[1.20] transition-all duration-400">
            <Button
              variant="ghost"
              size="icon"
              onClick={openSettings}
              className="hover:bg-transparent animate-settings-icon hover:text-primary hover:scale-[1.20] transition-all duration-400"
              aria-label="Explore & Settings"
              data-cursor="tap"
            >
              <Sparkles className="h-5 w-5" />
            </Button>
          </div>

          {/* Start A Project / Contact Button */}
          <Button
            variant="default"
            onClick={(e) => {
              e.preventDefault();
              openContactDialog();
            }}
            className="font-mono relative bottom-0 animate-grow-grow text-sm sm:text-base px-4 sm:px-4 h-9 sm:h-9 md:mr-1 transition-all duration-300 ease-in-out hover:bottom-0.5 hover:shadow-[0px_5px_10px_3px_rgba(0,0,0,0.3)] "
            data-cursor="tap"
          >
            <span className="hidden sm:inline">Start a Project</span>
            <span className="sm:hidden">Contact</span>
          </Button>

          {/* Live Users Indicator */}
          <div 
            className="animate-pulse hidden w-4 relative sm:flex gap-2"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Dot */}
            <span 
              className={`ring-2 ring-primary-500 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 bg-card rounded-full transition-opacity duration-300 ${
                showNumber ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span 
              className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/70 rounded-full transition-opacity duration-300 ${
                showNumber ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Number */}
            <span 
              className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm font-mono font-extrabold transition-opacity duration-300 ${
                showNumber ? 'opacity-100' : 'opacity-0'
              } ${
                isNoChange 
                  ? 'text-yellow-500' 
                  : isIncrease 
                    ? 'text-green-500' 
                    : 'text-red-500'
              }`}
            >
              {liveUsersCount}
            </span>
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap pointer-events-none z-50">
                {liveUsersCount} Live Users
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-black" />
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
    </>
  );
}
