import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { DM_Mono } from 'next/font/google';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SiteShell } from '@/components/layout/site-shell';
import { BackgroundImage } from '@/components/layout/background-image';
import { AudioPlayer } from '@/components/player/audio-player';
import { CommandPalette } from '@/components/nav/command-palette';
import { CustomCursor } from '@/components/nav/custom-cursor';
import { EditorNavPanel } from '@/components/nav/editor-nav-panel';
import { InspectorOverlay } from '@/components/devtools/inspector-overlay';
import { MiniTerminal } from '@/components/devtools/mini-terminal';
import { ThemePanel } from '@/components/ui/theme-panel';
import { ContactDialog } from '@/components/contact/contact-dialog';
import './globals.css';

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Luke Hertzler – Portfolio',
  description: 'Full-Stack Engineer, UI/UX Designer, Musician.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${dmMono.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-mono">
        <ThemeProvider>
          <BackgroundImage />
          <SiteShell>{children}</SiteShell>
          <AudioPlayer />
          <CommandPalette />
          <CustomCursor />
          <EditorNavPanel />
          <InspectorOverlay />
          <MiniTerminal />
          <ThemePanel />
          <ContactDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}

