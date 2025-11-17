import { projects } from './projects';
import { tracks } from './tracks';

export type Command = {
  id: string;
  type: 'page' | 'project' | 'action' | 'track';
  label: string;
  shortcut?: string;
  href?: string;
  actionKey?: string;
};

export const commands: Command[] = [
  // Pages
  {
    id: 'home',
    type: 'page',
    label: 'Home',
    href: '/',
  },
  {
    id: 'about',
    type: 'page',
    label: 'About',
    href: '/about',
  },
  {
    id: 'portfolio',
    type: 'page',
    label: 'Portfolio',
    href: '/portfolio',
  },
  {
    id: 'resume',
    type: 'page',
    label: 'Resume',
    href: '/resume',
  },
  {
    id: 'lab',
    type: 'page',
    label: 'Lab',
    href: '/lab',
  },
  {
    id: 'contact',
    type: 'page',
    label: 'Contact',
    href: '/contact',
  },
  // Projects
  ...projects.map((project) => ({
    id: `project-${project.slug}`,
    type: 'project' as const,
    label: `Open: ${project.title}`,
    href: `/portfolio/${project.slug}`,
  })),
  // Actions
  {
    id: 'toggle-dark-mode',
    type: 'action',
    label: 'Toggle Dark Mode',
    actionKey: 'toggle-theme-dark',
  },
  {
    id: 'toggle-studio-mode',
    type: 'action',
    label: 'Toggle Studio Mode',
    actionKey: 'toggle-theme-studio',
  },
  {
    id: 'toggle-inspect-mode',
    type: 'action',
    label: 'Toggle Inspect Mode',
    actionKey: 'toggle-inspect',
  },
  {
    id: 'open-terminal',
    type: 'action',
    label: 'Open Mini Terminal',
    actionKey: 'open-terminal',
  },
  {
    id: 'open-theme-panel',
    type: 'action',
    label: 'Open Theme Panel',
    actionKey: 'open-theme-panel',
  },
  // Tracks
  ...tracks.map((track) => ({
    id: `play-${track.id}`,
    type: 'track' as const,
    label: `Play Track: ${track.title}`,
    actionKey: `play-track-${track.id}`,
  })),
  {
    id: 'pause-audio',
    type: 'action',
    label: 'Pause Audio',
    actionKey: 'pause-audio',
  },
];

