import { create } from 'zustand';

export type Track = {
  id: string;
  title: string;
  artist?: string;
  src: string;
  bpm?: number;
  durationSeconds?: number;
  coverArt?: string;
};

type PlayerState = {
  queue: Track[];
  currentTrackId: string | null;
  isPlaying: boolean;
  positionSeconds: number;
  showing: boolean;
};

type PlayerActions = {
  setQueue: (tracks: Track[]) => void;
  playTrack: (id: string) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  seek: (seconds: number) => void;
  setShowing: (showing: boolean) => void;
};

export const usePlayerStore = create<PlayerState & PlayerActions>((set, get) => ({
  queue: [],
  currentTrackId: null,
  isPlaying: false,
  positionSeconds: 0,
  showing: true,

  setQueue: (tracks) => set({ queue: tracks }),
  playTrack: (id) =>
    set({
      currentTrackId: id,
      isPlaying: true,
      positionSeconds: 0,
    }),
  pause: () => set({ isPlaying: false }),
  resume: () => {
    const { currentTrackId } = get();
    if (!currentTrackId) return;
    set({ isPlaying: true });
  },
  next: () => {
    const { queue, currentTrackId } = get();
    if (!queue.length) return;

    const currentIndex = queue.findIndex((t) => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % queue.length;
    set({
      currentTrackId: queue[nextIndex].id,
      isPlaying: true,
      positionSeconds: 0,
    });
  },
  prev: () => {
    const { queue, currentTrackId } = get();
    if (!queue.length) return;

    const currentIndex = queue.findIndex((t) => t.id === currentTrackId);
    const prevIndex =
      currentIndex <= 0 ? queue.length - 1 : (currentIndex - 1) % queue.length;
    set({
      currentTrackId: queue[prevIndex].id,
      isPlaying: true,
      positionSeconds: 0,
    });
  },
  seek: (seconds) => set({ positionSeconds: seconds }),
  setShowing: (showing) => set({ showing }),
}));

