'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUIStore } from '@/store/ui-store';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HOME_SECTIONS = [
  { id: 'about', label: 'About me', href: '/#about' },
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'portfolio', label: 'Portfolio', href: '/#portfolio' },
  { id: 'resume', label: 'Resume', href: '/#resume' },
  { id: 'lab', label: 'Lab', href: '/#lab' },
  { id: 'contact', label: 'Contact', href: '/contact' },
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
  const isHomePage = pathname === '/';

  const openThemePanel = useUIStore((s) => s.openThemePanel);
  const toggleInspectMode = useUIStore((s) => s.toggleInspectMode);
  const openTerminal = useUIStore((s) => s.openTerminal);
  const openEditorNav = useUIStore((s) => s.openEditorNav);
  const openContactDialog = useUIStore((s) => s.openContactDialog);
  const isContactDialogOpen = useUIStore((s) => s.isContactDialogOpen);
  const themeMode = useUIStore((s) => s.themeMode);

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

    if (isHomePage) {
      // On homepage, scroll to section
      const sectionId = href.replace('/#', '');
      if (sectionId) {
        scrollToSection(sectionId);
      } else if (href === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to homepage with hash
      if (href.startsWith('/#')) {
        router.push(href);
      } else {
        router.push(href);
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
      <div className="h-[73px]" />
      <header
        className={`fixed top-0 left-0 right-0 z-40 mx-auto border rounded-lg backdrop-blur-md transition-all duration-700 ease-in-out font-mono will-change-transform ${
          isScrolled
            ? 'max-w-full bg-card/70 border-none shadow-lg shadow-black/10 translate-y-0'
            : 'max-w-7xl bg-card dark:border-none translate-y-6'
        }`}
        data-component="Header"
        data-file="components/layout/header.tsx"
      >
        <div className={`bg-transparent flex items-center justify-between px-4 sm:px-8 transition-all duration-700 ease-in-out ${
          isScrolled
            ? 'py-3 shadow-lg shadow-black/5'
            : 'py-4'
        }`}>
        {/* Left: Hamburger + Brand */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={openEditorNav}
            className="h-9 w-9 hover:bg-accent/50"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link
            href="/"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 font-mono"
          >
            <span className={`font-semibold text-primary tracking-tight transition-all duration-700 ease-in-out ${
              isScrolled ? 'text-lg' : 'pl-2 text-2xl'
            }`}>{'</>'}</span>
            <span className={`font-bold tracking-tight transition-all duration-700 ease-in-out hover:text-primary ${
              isScrolled ? 'text-lg' : 'pl-2 text-2xl'
            }`}>
              Luke Hertzler
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-md font-mono">
          {navItems.map((item) => {
            const isActive =
              item.id === 'contact'
                ? isContactDialogOpen
                : isHomePage && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.href, e)}
                data-cursor="link"
                className={`transition-colors font-mono ${
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Theme Toggle + Dev Tools */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={openThemePanel}
            className="h-9 w-9 hover:bg-accent/50"
            aria-label="Toggle theme"
            data-cursor="tap"
          >
            {themeMode === 'dark' ? (
              <Sun className="h-4 w-4 text-yellow-400" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Dev Tools (hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleInspectMode}
              className="h-9 w-9 hover:bg-accent/50"
              aria-label="Toggle inspect mode"
              data-cursor="tap"
            >
              {'</>'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={openTerminal}
              className="h-9 w-9 hover:bg-accent/50"
              aria-label="Open mini terminal"
              data-cursor="tap"
            >
              {'>_'}
            </Button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
