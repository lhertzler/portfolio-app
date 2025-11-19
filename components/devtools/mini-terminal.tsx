'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUIStore } from '@/store/ui-store';
import { usePlayerStore } from '@/store/player-store';
import { projects } from '@/lib/projects';
import { commands } from '@/lib/command-palette-data';
import { getAllPosts } from '@/lib/blog-posts';

type TerminalLine = {
  timestamp: string;
  content: string;
  type: 'input' | 'output' | 'system';
};

type Command = {
  name: string;
  description: string;
  execute: (args: string[]) => string;
};

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const FAQ: FAQItem[] = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer: 'I offer full-stack development, UI/UX design, Shopify development, Next.js applications, Supabase integrations, and custom web solutions. I can help with everything from initial strategy to ongoing maintenance.',
  },
  {
    id: 2,
    question: 'How do I get started with a project?',
    answer: 'You can reach out through the contact form on the contact page. I typically start with a discovery call to understand your needs, then provide a proposal with timeline and budget estimates.',
  },
  {
    id: 3,
    question: 'What technologies do you work with?',
    answer: 'My core stack includes React, Next.js, TypeScript, Supabase, PostgreSQL, Shopify, and TailwindCSS. I also work with various APIs, payment processors, and modern development tools.',
  },
  {
    id: 4,
    question: 'Do you work with e-commerce platforms?',
    answer: 'Yes! I specialize in Shopify development, including custom themes, app integrations, and headless commerce solutions. I also work with other e-commerce platforms and can help you choose the right one for your needs.',
  },
  {
    id: 5,
    question: 'What is your typical project timeline?',
    answer: 'Timelines vary based on project scope. A simple website might take 2-4 weeks, while a full-scale application could take 2-6 months. I provide detailed timelines during the discovery phase.',
  },
  {
    id: 6,
    question: 'Do you provide ongoing support?',
    answer: 'Yes, I offer ongoing support and maintenance packages. This can include bug fixes, feature additions, performance optimization, and regular updates.',
  },
  {
    id: 7,
    question: 'Can you help with existing projects?',
    answer: 'Absolutely! I can take over existing projects, refactor legacy code, add new features, or help optimize performance. I work with codebases of all sizes and ages.',
  },
  {
    id: 8,
    question: 'What is your pricing model?',
    answer: 'Pricing depends on project scope and requirements. I offer both fixed-price projects and hourly rates. Contact me with your project details for a customized quote.',
  },
];

const formatTimestamp = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// Search function that searches through pages, projects, and blog posts
const performSearch = (query: string): Array<{ type: string; title: string; href?: string; description?: string }> => {
  const results: Array<{ type: string; title: string; href?: string; description?: string }> = [];
  const lowerQuery = query.toLowerCase();

  // Search pages
  commands.forEach((cmd) => {
    if (cmd.type === 'page' && cmd.href) {
      if (cmd.label.toLowerCase().includes(lowerQuery) || cmd.href.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'Page',
          title: cmd.label,
          href: cmd.href,
        });
      }
    }
  });

  // Search projects
  projects.forEach((project) => {
    const searchableText = `${project.title} ${project.summary} ${project.description} ${project.tags.join(' ')} ${project.tech.join(' ')}`.toLowerCase();
    if (searchableText.includes(lowerQuery)) {
      results.push({
        type: 'Project',
        title: project.title,
        href: `/portfolio/${project.slug}`,
        description: project.summary,
      });
    }
  });

  // Search blog posts
  getAllPosts().forEach((post) => {
    const searchableText = `${post.title} ${post.description} ${post.category} ${post.tags?.join(' ') || ''}`.toLowerCase();
    if (searchableText.includes(lowerQuery)) {
      results.push({
        type: 'Blog Post',
        title: post.title,
        href: `/blog/${post.slug}`,
        description: post.description,
      });
    }
  });

  return results;
};

// Check if input matches any FAQ question
// Only matches if input is at least 3 characters and contains meaningful words from FAQ
const findMatchingFAQ = (input: string): FAQItem | null => {
  // Skip matching for very short inputs (single characters, etc.)
  if (input.trim().length < 3) {
    return null;
  }
  
  const lowerInput = input.toLowerCase().trim();
  
  // Only check if input contains the full FAQ question (user asking the question)
  // Don't check if FAQ question contains input (too loose, causes false positives)
  return FAQ.find((faq) => {
    const lowerQuestion = faq.question.toLowerCase();
    // Check if input contains the full question (user typing the question)
    if (lowerInput.includes(lowerQuestion)) {
      return true;
    }
    // Check if input matches key words from the question (at least 2 words match)
    const inputWords = lowerInput.split(/\s+/).filter(w => w.length > 2);
    const questionWords = lowerQuestion.split(/\s+/).filter(w => w.length > 2);
    const matchingWords = inputWords.filter(word => questionWords.some(qWord => qWord.includes(word) || word.includes(qWord)));
    return matchingWords.length >= 2;
  }) || null;
};

const COMMANDS: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'List all available commands',
    execute: () => {
      return [
        'help - Will return a list of all available commands',
        'search - Will search the site for pages, projects, and blog posts (usage: search <query>)',
        'faq - Will display a list of frequently asked questions you can ask',
        'skills - Will return a list of core technologies',
        'open - Will open a project or page (usage: open <slug>)',
        'theme - Will set the theme (usage: theme <light|dark>)',
        'clear - Will clear the terminal history',
      ].join('\n');
    },
  },
  skills: {
    name: 'skills',
    description: 'List core technologies',
    execute: () => {
      return 'React, Next.js, TypeScript, Supabase, PostgreSQL, Shopify, TailwindCSS';
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
      return `Project "${slug}" not found.`;
    },
  },
  theme: {
    name: 'theme',
    description: 'Set theme (usage: theme <light|dark>)',
    execute: (args) => {
      if (args.length === 0) {
        return 'Usage: theme <light|dark>';
      }
      const theme = args[0] as 'light' | 'dark';
      if (['light', 'dark'].includes(theme)) {
        useUIStore.getState().setThemeMode(theme);
        return `Theme set to ${theme}`;
      }
      return 'Invalid theme. Use: light or dark';
    },
  },
  faq: {
    name: 'faq',
    description: 'Display frequently asked questions',
    execute: () => {
      return FAQ.map((faq) => `  ${faq.id}. ${faq.question}`).join('\n') + '\n\nType the number of a question to get an answer.';
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
  const [history, setHistory] = useState<TerminalLine[]>(() => {
    // Load persisted history from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('terminal-history');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [awaitingFAQConfirmation, setAwaitingFAQConfirmation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize with welcome messages if history is empty (first time opening)
  useEffect(() => {
    if (isTerminalOpen && history.length === 0) {
      const now = new Date();
      const initialMessages: TerminalLine[] = [
        {
          timestamp: formatTimestamp(now),
          content: 'You can enter "help" for a list of available commands.',
          type: 'system',
        },
      ];
      setHistory(initialMessages);
      localStorage.setItem('terminal-history', JSON.stringify(initialMessages));
    }
  }, [isTerminalOpen, history.length]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Focus input when terminal opens and reset FAQ confirmation state
  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setAwaitingFAQConfirmation(false);
    }
  }, [isTerminalOpen]);

  // Scroll to bottom when history changes
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Persist history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('terminal-history', JSON.stringify(history));
    }
  }, [history]);

  const displayFAQ = (): TerminalLine[] => {
    const faqLines: TerminalLine[] = [
      {
        timestamp: formatTimestamp(new Date()),
        content: 'You can enter "help" for a list of available commands.',
        type: 'system',
      },
      {
        timestamp: formatTimestamp(new Date()),
        content: '',
        type: 'system',
      },
      {
        timestamp: formatTimestamp(new Date()),
        content: 'Here are some questions I can answer:',
        type: 'system',
      },
      {
        timestamp: formatTimestamp(new Date()),
        content: '',
        type: 'system',
      },
    ];
    
    FAQ.forEach((faq) => {
      faqLines.push({
        timestamp: formatTimestamp(new Date()),
        content: `  ${faq.id}. ${faq.question}`,
        type: 'system',
      });
    });
    
    faqLines.push({
      timestamp: formatTimestamp(new Date()),
      content: '',
      type: 'system',
    });
    faqLines.push({
      timestamp: formatTimestamp(new Date()),
      content: 'Type the number of a question to get an answer.',
      type: 'system',
    });
    
    return faqLines;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const now = new Date();
    const timestamp = formatTimestamp(now);
    const trimmedInput = input.trim();
    const inputLine: TerminalLine = {
      timestamp,
      content: trimmedInput,
      type: 'input',
    };

    const [command, ...args] = trimmedInput.split(' ');
    const commandLower = command.toLowerCase();
    const fullQuery = args.join(' ');

    let outputLines: TerminalLine[] = [];

    // Handle Y/n confirmation for FAQ
    if (awaitingFAQConfirmation) {
      setAwaitingFAQConfirmation(false);
      if (commandLower === 'y' || commandLower === 'yes') {
        outputLines = displayFAQ();
      } else {
        outputLines = [{
          timestamp: formatTimestamp(now),
          content: 'No problem! Feel free to ask me anything else.',
          type: 'output',
        }];
      }
      setHistory([...history, inputLine, ...outputLines]);
      setInput('');
      return;
    }

    // Handle FAQ number input
    const faqNumber = parseInt(trimmedInput, 10);
    if (!isNaN(faqNumber) && faqNumber >= 1 && faqNumber <= FAQ.length) {
      const selectedFAQ = FAQ.find((f) => f.id === faqNumber);
      if (selectedFAQ) {
        outputLines = [
          {
            timestamp: formatTimestamp(now),
            content: `Q: ${selectedFAQ.question}`,
            type: 'output',
          },
          {
            timestamp: formatTimestamp(now),
            content: `A: ${selectedFAQ.answer}`,
            type: 'output',
          },
        ];
        setHistory([...history, inputLine, ...outputLines]);
        setInput('');
        return;
      }
    }

    // Handle search command
    if (commandLower === 'search') {
      if (!fullQuery.trim()) {
        outputLines = [
          {
            timestamp: formatTimestamp(now),
            content: 'Usage: search <query>',
            type: 'output',
          },
          {
            timestamp: formatTimestamp(now),
            content: 'Example: search soundvent',
            type: 'output',
          },
        ];
      } else {
        const results = performSearch(fullQuery);
        if (results.length === 0) {
          outputLines = [
            {
              timestamp: formatTimestamp(now),
              content: `No results found for "${fullQuery}".`,
              type: 'output',
            },
            {
              timestamp: formatTimestamp(now),
              content: '',
              type: 'output',
            },
            {
              timestamp: formatTimestamp(now),
              content: 'I can answer some questions if you\'d like. Would you like to see them? (Y/n)',
              type: 'output',
            },
          ];
          setAwaitingFAQConfirmation(true);
        } else {
          outputLines = [
            {
              timestamp: formatTimestamp(now),
              content: `Found ${results.length} result(s) for "${fullQuery}":`,
              type: 'output',
            },
            {
              timestamp: formatTimestamp(now),
              content: '',
              type: 'output',
            },
          ];
          results.forEach((result) => {
            outputLines.push({
              timestamp: formatTimestamp(now),
              content: `  [${result.type}] ${result.title}${result.href ? ` → ${result.href}` : ''}`,
              type: 'output',
            });
            if (result.description) {
              outputLines.push({
                timestamp: formatTimestamp(now),
                content: `    ${result.description}`,
                type: 'output',
              });
            }
          });
        }
      }
      setHistory([...history, inputLine, ...outputLines]);
      setInput('');
      return;
    }

    // Handle clear command
    if (commandLower === 'clear') {
      const clearedHistory: TerminalLine[] = [
        {
          timestamp: formatTimestamp(now),
          content: 'You can enter "help" for a list of available commands.',
          type: 'system',
        },
      ];
      setHistory(clearedHistory);
      setInput('');
      return;
    }

    // Handle --help as well as help
    const cmd = COMMANDS[commandLower === '--help' ? 'help' : commandLower];

    if (cmd) {
      const output = cmd.execute(args);
      outputLines = output.split('\n').map((line) => ({
        timestamp: formatTimestamp(now),
        content: line,
        type: 'output' as const,
      }));
    } else {
      // Check if it's a question that matches an FAQ
      const matchingFAQ = findMatchingFAQ(trimmedInput);
      if (matchingFAQ) {
        outputLines = [
          {
            timestamp: formatTimestamp(now),
            content: `Q: ${matchingFAQ.question}`,
            type: 'output',
          },
          {
            timestamp: formatTimestamp(now),
            content: `A: ${matchingFAQ.answer}`,
            type: 'output',
          },
        ];
      } else {
        // Unknown question/command - show FAQ
        outputLines = [
          {
            timestamp: formatTimestamp(now),
            content: 'I\'m sorry, I don\'t have that information.',
            type: 'output',
          },
          {
            timestamp: formatTimestamp(now),
            content: '',
            type: 'output',
          },
          ...displayFAQ(),
        ];
      }
    }

    setHistory([...history, inputLine, ...outputLines]);
    setInput('');
  };

  return (
    <Sheet open={isTerminalOpen} onOpenChange={closeTerminal}>
      <SheetContent side="bottom" className="h-[500px] bg-[#0d1117] text-[#c9d1d9] border-t border-[#30363d] p-0">
        <div className="h-full flex flex-col font-mono text-sm overflow-hidden">
          {/* Terminal header bar */}
          <div className="px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <span className="text-[#8b949e] text-xs ml-2">Terminal</span>
          </div>

          {/* Terminal content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {history.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-[#6e7681] shrink-0">[{line.timestamp}]</span>
                <span
                  className={
                    line.type === 'input'
                      ? 'text-[#58a6ff]'
                      : line.type === 'system'
                      ? 'text-[#8b949e]'
                      : 'text-[#c9d1d9]'
                  }
                >
                  {line.type === 'input' && '> '}
                  {line.content}
                </span>
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>

          {/* Terminal input */}
          <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-[#30363d] bg-[#0d1117]">
            <div className="flex items-center gap-2">
              <span className="text-[#58a6ff] shrink-0">luke@portfolio:~$</span>
              <div className="flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[#c9d1d9] caret-[#58a6ff]"
                  autoFocus
                  spellCheck={false}
                />
                {showCursor && (
                  <span className="inline-block w-[8px] h-[14px] bg-[#58a6ff] ml-1"></span>
                )}
              </div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

