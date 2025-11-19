'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';
import { commands } from '@/lib/command-palette-data';
import { useUIStore } from '@/store/ui-store';
import { usePlayerStore } from '@/store/player-store';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toggleInspectMode, openThemePanel, openTerminal, setThemeMode } = useUIStore();
  const { playTrack, pause, isPlaying } = usePlayerStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (command: typeof commands[0]) => {
    if (command.href) {
      router.push(command.href);
      setOpen(false);
    } else if (command.actionKey) {
      handleAction(command.actionKey);
      setOpen(false);
    }
  };

  const handleAction = (actionKey: string) => {
    if (actionKey === 'toggle-inspect') {
      toggleInspectMode();
    } else if (actionKey === 'open-terminal') {
      openTerminal();
    } else if (actionKey === 'open-theme-panel') {
      openThemePanel();
    } else if (actionKey === 'toggle-theme-dark') {
      setThemeMode('dark');
    } else if (actionKey === 'pause-audio') {
      pause();
    } else if (actionKey.startsWith('play-track-')) {
      const trackId = actionKey.replace('play-track-', '');
      playTrack(trackId);
    }
  };

  const groupedCommands = {
    pages: commands.filter((c) => c.type === 'page'),
    projects: commands.filter((c) => c.type === 'project'),
    actions: commands.filter((c) => c.type === 'action'),
    tracks: commands.filter((c) => c.type === 'track'),
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {groupedCommands.pages.length > 0 && (
              <CommandGroup heading="Pages">
                {groupedCommands.pages.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => handleSelect(command)}
                  >
                    {command.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {groupedCommands.projects.length > 0 && (
              <CommandGroup heading="Projects">
                {groupedCommands.projects.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => handleSelect(command)}
                  >
                    {command.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {groupedCommands.actions.length > 0 && (
              <CommandGroup heading="Actions">
                {groupedCommands.actions.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => handleSelect(command)}
                  >
                    {command.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {groupedCommands.tracks.length > 0 && (
              <CommandGroup heading="Tracks">
                {groupedCommands.tracks.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => handleSelect(command)}
                  >
                    {command.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

