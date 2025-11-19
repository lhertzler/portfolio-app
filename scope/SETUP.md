# Portfolio Site Setup

This is a Next.js portfolio site built with modern React, TypeScript, TailwindCSS, and shadcn/ui.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── portfolio/         # Portfolio pages
│   ├── resume/            # Resume page
│   ├── lab/               # Lab/experiments page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── layout/            # Layout components (Header, Footer, SiteShell)
│   ├── nav/               # Navigation components (Command Palette, Custom Cursor, Editor Nav)
│   ├── player/            # Audio player components
│   ├── devtools/          # Dev tools (Inspect Mode, Terminal)
│   ├── ui/                # shadcn/ui components
│   └── contact/           # Contact dialog
├── lib/                   # Utilities and data
│   ├── tracks.ts          # Music tracks data
│   ├── projects.ts        # Projects data
│   └── command-palette-data.ts  # Command palette commands
└── store/                 # Zustand stores
    ├── ui-store.ts        # UI state (theme, panels, etc.)
    └── player-store.ts    # Audio player state
```

## Features

### Core Features
- ✅ Next.js App Router with TypeScript
- ✅ TailwindCSS + shadcn/ui components
- ✅ Persistent audio player with waveform visualizer (placeholder)
- ✅ Command palette (⌘K / Ctrl+K)
- ✅ Theme system (Light/Dark/Studio modes)
- ✅ Custom cursor
- ✅ Editor-style navigation panel
- ✅ Dev tools (Inspect Mode, Mini Terminal)
- ✅ Contact dialog

### Pages
- Home page with hero section
- About page
- Portfolio index and individual project pages
- Resume page
- Lab page (component gallery)
- Contact page

## Adding Audio Files

Place your audio files in the `public/audio/` directory and update `lib/tracks.ts` with your track information.

## Customization

### Themes
Edit theme colors in `app/globals.css` under the `:root`, `.dark`, and `.studio` selectors.

### Projects
Add or modify projects in `lib/projects.ts`.

### Commands
Add commands to the command palette in `lib/command-palette-data.ts`.

## Build

```bash
npm run build
npm start
```

## Development Notes

- The audio player requires audio files in `public/audio/`
- Theme persistence is handled via Zustand with localStorage
- All components include `data-component` attributes for inspect mode
- Custom cursor respects reduced motion preferences

