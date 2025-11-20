'use client';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUIStore } from '@/store/ui-store';
import { useRouter } from 'next/navigation';
import { FileText, Settings, Music, Home, Briefcase, FlaskConical, Mail, ChevronRight, Search, Palette, BookOpen, Sparkles } from 'lucide-react';
import { useState } from 'react';

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

const NAV_STRUCTURE = [
  {
    label: 'app',
    items: [
      { icon: Home, label: 'Home', href: '/', id: 'home', sectionId: 'hero' },
      { icon: Sparkles, label: 'Solutions', href: '/solutions', id: 'solutions', sectionId: null },
      { icon: Briefcase, label: 'Portfolio', href: '/portfolio', id: 'portfolio', sectionId: null },
      { icon: FlaskConical, label: 'Lab', href: '/lab', id: 'lab', sectionId: null },
      { icon: BookOpen, label: 'Blog', href: '/blog', id: 'blog', sectionId: null },
      { icon: Mail, label: 'Contact.tsx', action: 'contact', id: 'contact' },
    ],
  },
  {
    label: 'system',
    items: [
      { icon: Search, label: 'Search.tsx', action: 'search', id: 'search' },
      { icon: Settings, label: 'Settings.tsx', action: 'settings', id: 'settings' },
    ],
  },
];

export function EditorNavPanel() {
  const { isEditorNavOpen, closeEditorNav, openContactDialog, openThemePanel, openTerminal, openSettings } = useUIStore();
  const router = useRouter();
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['app', 'system']);

  const toggleFolder = (folderLabel: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderLabel)
        ? prev.filter((f) => f !== folderLabel)
        : [...prev, folderLabel]
    );
  };

  const handleClick = (item: typeof NAV_STRUCTURE[0]['items'][0]) => {
    if ('action' in item) {
      if (item.action === 'contact') {
        openContactDialog();
        closeEditorNav();
      } else if (item.action === 'search') {
        openTerminal();
        closeEditorNav();
      } else if (item.action === 'settings') {
        openSettings();
        closeEditorNav();
      } else if (item.action === 'theme') {
        openThemePanel();
        closeEditorNav();
      } else if (item.action === 'player') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        closeEditorNav();
      }
      return;
    }
    
    if ('sectionId' in item && item.sectionId) {
      // Has a section ID - scroll to section
      if (window.location.pathname === '/') {
        scrollToSection(item.sectionId);
        closeEditorNav();
      } else {
        router.push(`/#${item.sectionId}`);
        closeEditorNav();
      }
      return;
    }
    
    if ('href' in item && item.href) {
      // Has href - navigate to page
      router.push(item.href);
      closeEditorNav();
    }
  };

  return (
    <Sheet open={isEditorNavOpen} onOpenChange={closeEditorNav}>
      <SheetContent 
        side="left" 
        className="w-72 bg-[#1e1e1e] text-[#cccccc] border-r border-[#3e3e3e] p-0 font-mono"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#3e3e3e]">
            <h2 className="text-xs font-medium text-[#cccccc] uppercase tracking-wider font-mono">
              Explorer
            </h2>
          </div>

          {/* Navigation Tree */}
          <div className="flex-1 overflow-y-auto py-2 text-xs font-mono">
            {NAV_STRUCTURE.map((group) => {
              const isExpanded = expandedFolders.includes(group.label);
              
              return (
                <div key={group.label} className="mb-1">
                  {/* Folder Header */}
                  <button
                    onClick={() => toggleFolder(group.label)}
                    className="w-full flex items-center gap-1 px-4 py-1.5 hover:bg-[#2a2d2e] transition-colors text-left"
                  >
                    <ChevronRight 
                      className={`h-3 w-3 text-[#858585] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                    />
                    <span className="text-[#858585] text-xs uppercase tracking-wider font-medium">
                      {group.label}
                    </span>
                  </button>

                  {/* Folder Items */}
                  {isExpanded && (
                    <div className="ml-2">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleClick(item)}
                            className="w-full flex items-center gap-2 px-4 py-1.5 hover:bg-[#2a2d2e] text-left transition-colors group"
                          >
                            <Icon className="h-3.5 w-3.5 text-[#858585] group-hover:text-[#cccccc] flex-shrink-0" />
                            <span className="text-[#cccccc] text-xs">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
