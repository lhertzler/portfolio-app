import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
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
  isAgencyContactDialogOpen: boolean;
  isSettingsOpen: boolean;
  isLogoVisible: boolean;
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
  openAgencyContactDialog: () => void;
  closeAgencyContactDialog: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  toggleLogoVisibility: () => void;
  setLogoVisible: (visible: boolean) => void;
};

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      themeMode: 'dark',
      accentColor: 'lightblue',
      motionPreference: 'full',
      inspectMode: false,
      isThemePanelOpen: false,
      isTerminalOpen: false,
      customCursorEnabled: true,
      isEditorNavOpen: false,
      isContactDialogOpen: false,
      isAgencyContactDialogOpen: false,
      isSettingsOpen: false,
      isLogoVisible: false,

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
      openAgencyContactDialog: () => set({ isAgencyContactDialogOpen: true }),
      closeAgencyContactDialog: () => set({ isAgencyContactDialogOpen: false }),
      openSettings: () => set({ isSettingsOpen: true }),
      closeSettings: () => set({ isSettingsOpen: false }),
      toggleLogoVisibility: () =>
        set((state) => ({ isLogoVisible: !state.isLogoVisible })),
      setLogoVisible: (visible) => set({ isLogoVisible: visible }),
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

