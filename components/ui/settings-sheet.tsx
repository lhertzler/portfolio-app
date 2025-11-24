'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useUIStore, ThemeMode } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Terminal, Sun, Moon, BookOpen, FlaskConical } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ACCENT_COLORS = [
  { name: 'Green', value: 'green', color: 'hsl(120 55% 40%)' },
  { name: 'Yellow', value: 'yellow', color: 'hsl(45 100% 50%)' },
  { name: 'Red', value: 'red', color: 'hsl(0 84% 60%)' },
  { name: 'Blue', value: 'blue', color: 'hsl(217 91% 60%)' },
  { name: 'Purple', value: 'purple', color: 'hsl(280 80% 60%)' },
  { name: 'Pink', value: 'pink', color: 'hsl(330 75% 60%)' },
  { name: 'Orange', value: 'orange', color: 'hsl(25 95% 55%)' },
  { name: 'Light Blue', value: 'lightblue', color: 'hsl(200 100% 65%)' },
];

export function SettingsSheet() {
  const {
    isSettingsOpen,
    closeSettings,
    themeMode,
    setThemeMode,
    accentColor,
    setAccentColor,
    customCursorEnabled,
    toggleCustomCursor,
    inspectMode,
    toggleInspectMode,
    openTerminal,
  } = useUIStore();

  return (
    <Sheet open={isSettingsOpen} onOpenChange={closeSettings}>
      <SheetContent className="bg-card flex flex-col">
        <div className="mt-6 space-y-8 flex-1">
          {/* Explore */}
          <div>
            <Label className="text-xl font-bold mb-3 block">Explore</Label>
            <div className="flex gap-3">
              <Link
                href="/blog"
                onClick={() => closeSettings()}
                className="flex-1 h-24 flex flex-col items-center justify-center gap-2 bg-transparent hover:bg-transparent text-muted-foreground hover:text-primary transition-colors group"
              >
                <BookOpen className="h-8 w-8 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">Blog</span>
              </Link>
              <Link
                href="/lab"
                onClick={() => closeSettings()}
                className="flex-1 h-24 flex flex-col items-center justify-center gap-2 bg-transparent hover:bg-transparent text-muted-foreground hover:text-primary transition-colors group"
              >
                <FlaskConical className="h-8 w-8 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">Lab</span>
              </Link>
            </div>
          </div>

          {/* Color Mode */}
          <div>
            <Label className="text-xl font-bold mb-3 block">Color Mode</Label>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setThemeMode('light')}
                className={cn(
                  "flex-1 h-24 flex flex-col items-center justify-center gap-2 bg-transparent hover:bg-transparent",
                  themeMode === 'light' 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label="Light mode"
              >
                <Sun className={cn("h-8 w-8", themeMode === 'light' ? 'text-primary' : '')} />
                <span className="text-sm font-medium">Light</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setThemeMode('dark')}
                className={cn(
                  "flex-1 h-24 flex flex-col items-center justify-center gap-2 bg-transparent hover:bg-transparent hover:text-primary",
                  themeMode === 'dark' 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label="Dark mode"
              >
                <Moon className={cn("h-8 w-8", themeMode === 'dark' ? 'text-primary' : '')} />
                <span className="text-sm font-medium">Dark</span>
              </Button>
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <Label className="text-xl font-bold mb-3 block">Accent Color</Label>
            <div className="flex gap-3 flex-wrap">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccentColor(color.value)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    accentColor === color.value
                      ? 'border-foreground scale-110'
                      : 'border-border hover:border-foreground/50'
                  }`}
                  style={{
                    backgroundColor: color.color,
                  }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Developer Tools */}
          <div>
            <Label className="text-xl font-bold mb-3 block">Developer Tools</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="inspect-mode" className="text-md font-normal cursor-pointer">
                  Component Highlighter
                  <span className="block text-xs text-muted-foreground">See components under the hood</span>
                </Label>
                <Switch
                  id="inspect-mode"
                  checked={inspectMode}
                  onCheckedChange={toggleInspectMode}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Terminal Button at Bottom */}
        <div className="mt-auto pt-6">
          <Button
            onClick={() => {
              openTerminal();
              closeSettings();
            }}
            variant="default"
            className="w-full flex items-center justify-center gap-2"
          >
            Launch Terminal
            <Terminal className="w-4 h-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

