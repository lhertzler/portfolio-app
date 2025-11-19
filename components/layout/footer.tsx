import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-card border-t border-border/60 py-4 sm:py-6 text-xs text-muted-foreground"
      data-component="Footer"
      data-file="components/layout/footer.tsx"
    >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8">
        <span className="text-center sm:text-left">© {year} Luke Hertzler. All rights reserved.</span>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/cookies"
            className="hover:text-foreground transition-colors"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

