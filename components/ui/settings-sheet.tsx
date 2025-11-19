'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useUIStore, ThemeMode } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Terminal } from 'lucide-react';

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
      <SheetContent className="bg-card">
        <SheetHeader>
          <SheetTitle>Site Settings</SheetTitle>
          <SheetDescription>
            Customize the appearance and behavior of the site.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Color Mode */}
          <div>
            <Label className="text-xl font-bold mb-3 block">Color Mode</Label>
            <div className="flex flex-col gap-2">
              {(['light', 'dark'] as ThemeMode[]).map((mode) => (
                <Button
                  key={mode}
                  variant={themeMode === mode ? 'default' : 'outline'}
                  onClick={() => setThemeMode(mode)}
                  className="w-full justify-start capitalize"
                >
                  {mode}
                </Button>
              ))}
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
                <Label htmlFor="inspect-mode" className="text-sm font-normal cursor-pointer">
                  Component Highlighter
                </Label>
                <Switch
                  id="inspect-mode"
                  checked={inspectMode}
                  onCheckedChange={toggleInspectMode}
                />
              </div>
            </div>
          </div>

          {/* Extras */}
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="custom-cursor" className="text-sm font-normal cursor-pointer">
                  Custom Cursor
                </Label>
                <Switch
                  id="custom-cursor"
                  checked={customCursorEnabled}
                  onCheckedChange={toggleCustomCursor}
                />
              </div>
              <button
                onClick={() => {
                  openTerminal();
                  closeSettings();
                }}
                className={`transition-colors flex items-center gap-2 text-sm pt-2 font-normal ${
                  themeMode === 'light'
                    ? 'text-foreground hover:text-foreground/80'
                    : 'text-primary hover:text-primary/80'
                }`}
              >
                Open Terminal
                <Terminal className="w-4 h-4 blink-icon" />
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

