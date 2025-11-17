import type { Track } from '@/store/player-store';

export const tracks: Track[] = [
  {
    id: 'prisoner-in-me',
    title: 'Prisoner In Me',
    artist: 'Kavalkade',
    src: '/audio/prisoner-in-me.mp3',
    bpm: 180,
    durationSeconds: 240,
  },
  {
    id: 'track-2',
    title: 'Sample Track 2',
    artist: 'Luke Hertzler',
    src: '/audio/track-2.mp3',
    bpm: 140,
    durationSeconds: 200,
  },
  {
    id: 'track-3',
    title: 'Sample Track 3',
    artist: 'Luke Hertzler',
    src: '/audio/track-3.mp3',
    bpm: 160,
    durationSeconds: 220,
  },
];

