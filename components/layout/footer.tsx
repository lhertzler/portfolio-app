import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border/60 py-4 text-xs text-muted-foreground"
      data-component="Footer"
      data-file="components/layout/footer.tsx"
    >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-8">
        <span>© {year} Luke Hertzler. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}

