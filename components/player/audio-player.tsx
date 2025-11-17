'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/player-store';
import { tracks } from '@/lib/tracks';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    queue,
    currentTrackId,
    isPlaying,
    positionSeconds,
    setQueue,
    playTrack,
    pause,
    resume,
    next,
    prev,
    seek,
  } = usePlayerStore();

  // Initialize queue once
  useEffect(() => {
    if (!queue.length && tracks?.length) {
      setQueue(tracks);
    }
  }, [queue.length, setQueue]);

  // Keep audio src in sync with currentTrack
  const currentTrack =
    queue.find((t) => t.id === currentTrackId) ?? queue[0] ?? null;

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    // When the track changes, set src and optionally autoplay
    audioRef.current.src = currentTrack.src;
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // autoplay might get blocked; handle gracefully
      });
    }
  }, [currentTrackId, currentTrack, isPlaying]);

  // Sync play/pause with store
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Update store position as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      seek(audio.currentTime);
    };

    const handleEnded = () => {
      next();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [seek, next]);

  const handlePlayPause = () => {
    if (!currentTrack) return;
    if (!currentTrackId) {
      // first time play
      playTrack(currentTrack.id);
      return;
    }
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const value = Number(e.target.value);
    audio.currentTime = value;
    seek(value);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const duration = currentTrack?.durationSeconds ?? audioRef.current?.duration ?? 0;

  if (!currentTrack) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background/95 backdrop-blur-md shadow-lg shadow-black/10 z-50"
      data-component="AudioPlayer"
      data-file="components/player/audio-player.tsx"
    >
      <audio ref={audioRef} hidden />
      <div className="mx-auto max-w-7xl flex items-center gap-4 px-4 sm:px-8 py-4 text-xs sm:text-sm">
        <div className="flex flex-col min-w-0 flex-shrink-0">
          <span className="font-medium truncate">{currentTrack.title}</span>
          {currentTrack.artist && (
            <span className="text-muted-foreground truncate text-xs">
              {currentTrack.artist}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={prev}
            className="px-3 py-2 rounded-lg hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 active:scale-95"
            aria-label="Previous track"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={handlePlayPause}
            className="px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent/50 hover:border-border hover:shadow-md transition-all duration-200 active:scale-95"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            type="button"
            onClick={next}
            className="px-3 py-2 rounded-lg hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 active:scale-95"
            aria-label="Next track"
          >
            ▶
          </button>
        </div>

        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {formatTime(positionSeconds)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={1}
            value={positionSeconds}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-muted/50 rounded-lg appearance-none cursor-pointer accent-primary transition-all hover:accent-primary/80"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(positionSeconds / duration) * 100}%, hsl(var(--muted) / 0.5) ${(positionSeconds / duration) * 100}%, hsl(var(--muted) / 0.5) 100%)`
            }}
          />
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {formatTime(duration)}
          </span>
        </div>

        {/* Placeholder for WaveformVisualizer */}
        <div className="hidden sm:block w-32 h-6 rounded bg-muted/60 flex-shrink-0">
          {/* WaveformVisualizer will replace this */}
        </div>
      </div>
    </div>
  );
}

