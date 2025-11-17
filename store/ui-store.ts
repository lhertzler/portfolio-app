import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'studio';
export type MotionPreference = 'full' | 'reduced';

type UIState = {
  themeMode: ThemeMode;
  accentColor: string;
  motionPreference: MotionPreference;
  inspectMode: boolean;
  isThemePanelOpen: boolean;
  isTerminalOpen: boolean;
  customCursorEnabled: boolean;
  isEditorNavOpen: boolean;
  isContactDialogOpen: boolean;
};

type UIActions = {
  setThemeMode: (mode: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  setMotionPreference: (pref: MotionPreference) => void;
  toggleInspectMode: () => void;
  openThemePanel: () => void;
  closeThemePanel: () => void;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleCustomCursor: () => void;
  openEditorNav: () => void;
  closeEditorNav: () => void;
  openContactDialog: () => void;
  closeContactDialog: () => void;
};

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      themeMode: 'dark',
      accentColor: 'teal',
      motionPreference: 'full',
      inspectMode: false,
      isThemePanelOpen: false,
      isTerminalOpen: false,
      customCursorEnabled: true,
      isEditorNavOpen: false,
      isContactDialogOpen: false,

      setThemeMode: (mode) => set({ themeMode: mode }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setMotionPreference: (motionPreference) => set({ motionPreference }),
      toggleInspectMode: () =>
        set((state) => ({ inspectMode: !state.inspectMode })),
      openThemePanel: () => set({ isThemePanelOpen: true }),
      closeThemePanel: () => set({ isThemePanelOpen: false }),
      openTerminal: () => set({ isTerminalOpen: true }),
      closeTerminal: () => set({ isTerminalOpen: false }),
      toggleCustomCursor: () =>
        set((state) => ({ customCursorEnabled: !state.customCursorEnabled })),
      openEditorNav: () => set({ isEditorNavOpen: true }),
      closeEditorNav: () => set({ isEditorNavOpen: false }),
      openContactDialog: () => set({ isContactDialogOpen: true }),
      closeContactDialog: () => set({ isContactDialogOpen: false }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        themeMode: state.themeMode,
        accentColor: state.accentColor,
        motionPreference: state.motionPreference,
        customCursorEnabled: state.customCursorEnabled,
      }),
    }
  )
);

