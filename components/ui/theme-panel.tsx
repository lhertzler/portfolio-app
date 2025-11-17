'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useUIStore, ThemeMode } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const ACCENT_COLORS = [
  { name: 'Teal', value: 'teal' },
  { name: 'Purple', value: 'purple' },
  { name: 'Green', value: 'green' },
  { name: 'Orange', value: 'orange' },
];

export function ThemePanel() {
  const { isThemePanelOpen, closeThemePanel, themeMode, setThemeMode, accentColor, setAccentColor, motionPreference, setMotionPreference, customCursorEnabled, toggleCustomCursor } = useUIStore();

  return (
    <Sheet open={isThemePanelOpen} onOpenChange={closeThemePanel}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Theme Settings</SheetTitle>
          <SheetDescription>
            Customize the appearance and behavior of the site.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Color Mode */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Color Mode</Label>
            <div className="flex flex-col gap-2">
              {(['light', 'dark', 'studio'] as ThemeMode[]).map((mode) => (
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
            <Label className="text-sm font-medium mb-3 block">Accent Color</Label>
            <div className="flex gap-2 flex-wrap">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccentColor(color.value)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    accentColor === color.value
                      ? 'border-foreground scale-110'
                      : 'border-border'
                  }`}
                  style={{
                    backgroundColor: `var(--color-${color.value})`,
                  }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Motion */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Motion</Label>
            <div className="flex flex-col gap-2">
              {(['full', 'reduced'] as const).map((pref) => (
                <Button
                  key={pref}
                  variant={motionPreference === pref ? 'default' : 'outline'}
                  onClick={() => setMotionPreference(pref)}
                  className="w-full justify-start capitalize"
                >
                  {pref}
                </Button>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Extras</Label>
            <div className="space-y-2">
              <Button
                variant={customCursorEnabled ? 'default' : 'outline'}
                onClick={toggleCustomCursor}
                className="w-full justify-start"
              >
                {customCursorEnabled ? '✓' : ''} Custom Cursor
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

