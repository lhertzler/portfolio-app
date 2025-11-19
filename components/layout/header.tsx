'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUIStore } from '@/store/ui-store';
import { Settings, Terminal, Music, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HOME_SECTIONS = [
  { id: 'solutions', label: 'Solutions', href: '/solutions' },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
  { id: 'lab', label: 'Lab', href: '/lab' },
  { id: 'blog', label: 'Blog', href: '/blog' },
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
  const isHomePage = pathname === '/';

  const openTerminal = useUIStore((s) => s.openTerminal);
  const openSettings = useUIStore((s) => s.openSettings);
  const openContactDialog = useUIStore((s) => s.openContactDialog);
  const openEditorNav = useUIStore((s) => s.openEditorNav);
  const isContactDialogOpen = useUIStore((s) => s.isContactDialogOpen);

  // Sync with body class for player minimized state
  useEffect(() => {
    const checkMinimized = () => {
      setIsPlayerMinimized(document.body.classList.contains('player-minimized'));
    };
    
    // Check initially
    checkMinimized();
    
    // Watch for changes using MutationObserver
    const observer = new MutationObserver(checkMinimized);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
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

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();

    if (href === '/contact' || href === '/#contact') {
      openContactDialog();
      return;
    }

    // If href is a page route (starts with / but not /#), navigate to it
    if (href.startsWith('/') && !href.startsWith('/#')) {
      router.push(href);
      return;
    }

    // Handle section anchors (/#section)
    if (href.startsWith('/#')) {
      if (isHomePage) {
        // On homepage, scroll to section
        const sectionId = href.replace('/#', '');
        if (sectionId) {
          scrollToSection(sectionId);
        }
      } else {
        // On other pages, navigate to homepage with hash
        router.push(href);
      }
      return;
    }

    // Handle root path
    if (href === '/') {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
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
        className={`fixed top-0 left-0 right-0 z-40 mx-auto border backdrop-blur-md font-mono ${
          // Mobile: always fixed at top, no animation
          'lg:rounded-lg lg:transition-all lg:duration-700 lg:ease-in-out lg:will-change-transform'
        } ${
          isScrolled
            ? 'max-w-full bg-card/70 border-none shadow-lg shadow-black/10 translate-y-0'
            : 'max-w-full lg:max-w-7xl bg-card dark:border-none translate-y-0 lg:translate-y-4 xl:translate-y-6'
        }`}
        data-component="Header"
        data-file="components/layout/header.tsx"
      >
        <div className={`bg-transparent flex items-center justify-between px-3 sm:px-6 lg:px-8 transition-all duration-700 ease-in-out ${
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
              }
            }}
            className="flex items-center gap-1 sm:gap-2 font-mono"
          >
            <span className={`font-semibold text-primary tracking-tight transition-all duration-700 ease-in-out ${
              isScrolled 
                ? 'text-base sm:text-lg' 
                : 'text-xl sm:text-2xl'
            }`}>{'</>'}</span>
            <span className={`font-bold tracking-tight transition-all duration-700 ease-in-out hover:text-primary ${
              isScrolled 
                ? 'text-base sm:text-lg' 
                : 'text-xl sm:text-2xl'
            }`}>
              <span className="text-primary sm:text-foreground">Luke</span>
              <span className="sm:ml-1"> Hertzler</span>
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10 text-lg font-mono">
          {navItems.map((item) => {
            const isActive = isHomePage && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.href, e)}
                data-cursor="link"
                className={`transition-colors font-mono font-bold${
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
              }}
              className={`h-9 w-9 hover:bg-accent/50 transition-opacity duration-200 ${
                isPlayerMinimized ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Show music player"
              data-cursor="tap"
            >
              <Music className="h-4 w-4" />
            </Button>

            {/* Terminal Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openTerminal}
              className="h-9 w-9 hover:bg-accent/50"
              aria-label="Open terminal"
              data-cursor="tap"
            >
              <Terminal className="h-4 w-4" />
            </Button>

            {/* Settings Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openSettings}
              className="h-9 w-9 hover:bg-accent/50"
              aria-label="Open settings"
              data-cursor="tap"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Start A Project / Contact Button */}
          <Button
            variant="default"
            onClick={(e) => {
              e.preventDefault();
              openContactDialog();
            }}
            className="font-mono animate-pulse text-sm sm:text-sm px-4 sm:px-4 h-9 sm:h-9"
            data-cursor="tap"
          >
            <span className="hidden sm:inline">Start A Project</span>
            <span className="sm:hidden">Contact</span>
          </Button>
        </div>
      </div>
    </header>
    </>
  );
}
