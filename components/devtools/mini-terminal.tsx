'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useUIStore } from '@/store/ui-store';
import { usePlayerStore } from '@/store/player-store';
import { projects } from '@/lib/projects';

type Command = {
  name: string;
  description: string;
  execute: (args: string[]) => string;
};

const COMMANDS: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'List all available commands',
    execute: () => {
      return Object.values(COMMANDS)
        .map((cmd) => `  ${cmd.name.padEnd(15)} ${cmd.description}`)
        .join('\n');
    },
  },
  whoami: {
    name: 'whoami',
    description: 'Display user information',
    execute: () => {
      return 'Luke Hertzler - Full-Stack Engineer, UI/UX Designer, Musician';
    },
  },
  skills: {
    name: 'skills',
    description: 'List core technologies',
    execute: () => {
      return 'React, Next.js, TypeScript, Supabase, PostgreSQL, Shopify, TailwindCSS';
    },
  },
  projects: {
    name: 'projects',
    description: 'List all projects',
    execute: () => {
      return projects.map((p) => `  ${p.slug.padEnd(20)} ${p.title}`).join('\n');
    },
  },
  open: {
    name: 'open',
    description: 'Open a project or page (usage: open <slug>)',
    execute: (args) => {
      if (args.length === 0) {
        return 'Usage: open <slug>\nExample: open portfolio/soundvent';
      }
      const slug = args[0];
      const project = projects.find((p) => p.slug === slug);
      if (project) {
        window.location.href = `/portfolio/${slug}`;
        return `Opening ${project.title}...`;
      }
      return `Project "${slug}" not found. Use "projects" to list available projects.`;
    },
  },
  theme: {
    name: 'theme',
    description: 'Set theme (usage: theme <light|dark|studio>)',
    execute: (args) => {
      if (args.length === 0) {
        return 'Usage: theme <light|dark|studio>';
      }
      const theme = args[0] as 'light' | 'dark' | 'studio';
      if (['light', 'dark', 'studio'].includes(theme)) {
        useUIStore.getState().setThemeMode(theme);
        return `Theme set to ${theme}`;
      }
      return 'Invalid theme. Use: light, dark, or studio';
    },
  },
  play: {
    name: 'play',
    description: 'Play a track (usage: play <trackId>)',
    execute: (args) => {
      if (args.length === 0) {
        return 'Usage: play <trackId>';
      }
      const trackId = args[0];
      usePlayerStore.getState().playTrack(trackId);
      return `Playing track: ${trackId}`;
    },
  },
  clear: {
    name: 'clear',
    description: 'Clear terminal history',
    execute: () => {
      return '';
    },
  },
};

export function MiniTerminal() {
  const { isTerminalOpen, closeTerminal } = useUIStore();
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const [command, ...args] = input.trim().split(' ');
    const cmd = COMMANDS[command.toLowerCase()];

    if (command.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = cmd
      ? cmd.execute(args)
      : `Command not found: ${command}. Type "help" for available commands.`;

    setHistory([...history, `luke@portfolio:~$ ${input}`, output]);
    setInput('');
  };

  return (
    <Sheet open={isTerminalOpen} onOpenChange={closeTerminal}>
      <SheetContent side="bottom" className="h-[400px] bg-[#1e1e1e] text-[#cccccc] border-t border-[#3e3e3e]">
        <SheetHeader>
          <SheetTitle className="text-[#cccccc]">Terminal</SheetTitle>
        </SheetHeader>
        <div className="mt-4 h-full flex flex-col font-mono text-sm">
          <div className="flex-1 overflow-y-auto mb-4 space-y-1">
            {history.length === 0 && (
              <div className="text-[#858585]">
                Type &quot;help&quot; for available commands.
              </div>
            )}
            {history.map((line, i) => (
              <div key={i} className={line.startsWith('luke@') ? 'text-[#4ec9b0]' : ''}>
                {line.split('\n').map((l, j) => (
                  <div key={j}>{l}</div>
                ))}
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-[#4ec9b0]">luke@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#cccccc]"
              autoFocus
            />
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

