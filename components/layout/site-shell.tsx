'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';

type SiteShellProps = {
  children: ReactNode;
};

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

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  // Get page component name from pathname
  const getPageComponentName = () => {
    if (pathname === '/') return 'HomePage';
    if (pathname.startsWith('/portfolio/')) {
      const slug = pathname.split('/portfolio/')[1];
      return slug ? `ProjectPage-${slug}` : 'PortfolioPage';
    }
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.split('/blog/')[1];
      return slug ? `BlogPostPage-${slug}` : 'BlogPage';
    }
    if (pathname.startsWith('/lab/')) {
      const slug = pathname.split('/lab/')[1];
      return slug ? `LabPage-${slug}` : 'LabPage';
    }
    const pageName = pathname.slice(1).split('/')[0];
    return pageName ? `${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page` : 'Page';
  };

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
            setIsHeaderFixed(currentScrollY > 80);
          } else {
            // Scrolling up
            setIsHeaderFixed(currentScrollY > 40);
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

  // Handle hash navigation on homepage
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash.slice(1);
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToSection(hash);
      }, 300);
    }
  }, [isHomePage]);

  const pageComponentName = getPageComponentName();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <main 
        className="flex-1 px-4 sm:px-8 lg:px-16 pb-28 pt-20 overflow-x-hidden w-full"
        data-component={pageComponentName}
        data-file={`app${pathname === '/' ? '/page.tsx' : pathname}/page.tsx`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
