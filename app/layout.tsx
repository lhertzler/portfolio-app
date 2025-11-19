import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Script from 'next/script';
import { DM_Mono } from 'next/font/google';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { BodyClassManager } from '@/components/providers/body-class-manager';
import { ToastProvider } from '@/components/ui/toast';
import { SiteShell } from '@/components/layout/site-shell';
import { BackgroundImage } from '@/components/layout/background-image';
import { AnimatedGradients } from '@/components/layout/animated-gradients';
import { AudioPlayer } from '@/components/player/audio-player';
import { CommandPalette } from '@/components/nav/command-palette';
import { CustomCursor } from '@/components/nav/custom-cursor';
import { EditorNavPanel } from '@/components/nav/editor-nav-panel';
import { InspectorOverlay } from '@/components/devtools/inspector-overlay';
import { MiniTerminal } from '@/components/devtools/mini-terminal';
import { SettingsSheet } from '@/components/ui/settings-sheet';
import { ContactDialog } from '@/components/contact/contact-dialog';
import { Toaster } from '@/components/ui/sonner';
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${dmMono.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-mono">
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5ZRNB8JVPS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5ZRNB8JVPS');
          `}
        </Script>
        
        <ThemeProvider>
          <ToastProvider>
            <BodyClassManager />
            <BackgroundImage />
            <AnimatedGradients />
            <SiteShell>{children}</SiteShell>
            <AudioPlayer />
            <CommandPalette />
            <CustomCursor />
            <EditorNavPanel />
            <InspectorOverlay />
            <MiniTerminal />
            <SettingsSheet />
            <ContactDialog />
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

