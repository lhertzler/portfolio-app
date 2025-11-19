'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePlayerStore } from '@/store/player-store';
import { tracks } from '@/lib/tracks';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ListMusic, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { WaveformVisualizer } from './waveform-visualizer';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Track mount state for hydration debugging
  useEffect(() => {
    setIsMounted(true);
    console.log('[AudioPlayer] Component mounted on client');
  }, []);

  // Listen for minimize events from other components
  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('[AudioPlayer] useEffect skipped - SSR');
      return;
    }
    
    const handleMinimizeChange = (e: CustomEvent<boolean>) => {
      console.log('[AudioPlayer] Minimize event received:', e.detail);
      setIsMinimized(e.detail);
    };
    
    window.addEventListener('player-minimize-change', handleMinimizeChange as EventListener);
    
    // Check initial state after mount to avoid hydration mismatch
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const bodyHasClass = document.body.classList.contains('player-minimized');
      console.log('[AudioPlayer] Initial body class check:', bodyHasClass);
      setIsMinimized(bodyHasClass);
    });
    
    return () => {
      window.removeEventListener('player-minimize-change', handleMinimizeChange as EventListener);
    };
  }, []);

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
    if (typeof window === 'undefined') return;
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;
    const currentSrc = currentTrack.src;

    // Only update src if it actually changed
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${currentSrc}` : currentSrc;
    if (audio.src !== currentSrc && audio.src !== fullUrl) {
      audio.src = currentSrc;
      seek(0);

      const handleLoadedData = () => {
        audio.currentTime = 0;
        seek(0);
        if (isPlaying) {
          audio.play().catch(() => {});
        }
      };

      audio.addEventListener('loadeddata', handleLoadedData);
      return () => {
        audio.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [currentTrackId, currentTrack?.src, seek, isPlaying]);

  // Sync play/pause with store
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    } else {
      if (!audio.paused) {
        audio.pause();
      }
    }
  }, [isPlaying]);

  // Update store position as audio plays using requestAnimationFrame
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let animationFrameId: number | null = null;

    const updatePosition = () => {
      if (audio && !audio.paused && !audio.ended) {
        const currentTime = audio.currentTime;
        if (currentTime !== undefined && !isNaN(currentTime) && isFinite(currentTime)) {
          seek(currentTime);
        }
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };

    const handleEnded = () => {
      // Auto-play next track when current track ends
      if (audio.ended) {
        next();
      }
    };

    // Start polling when playing
    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    // Also listen to timeupdate as backup
    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      if (currentTime !== undefined && !isNaN(currentTime) && isFinite(currentTime)) {
        seek(currentTime);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [seek, next, isPlaying]);

  const handlePlayPause = () => {
    if (!currentTrack) return;
    if (!currentTrackId) {
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

  const handlePlaylistTrackClick = (trackId: string) => {
    playTrack(trackId);
    setPlaylistOpen(false);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) {
      console.log('[AudioPlayer] formatTime: invalid seconds:', seconds);
      return '0:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formatted = `${mins}:${secs.toString().padStart(2, '0')}`;
    console.log('[AudioPlayer] formatTime:', seconds, '->', formatted);
    return formatted;
  };

  // Use track durationSeconds first to avoid hydration mismatch
  // Only fall back to audio element duration on client after mount
  const initialDuration = currentTrack?.durationSeconds ?? 0;
  console.log('[AudioPlayer] Initial duration from track:', initialDuration, 'currentTrack:', currentTrack?.id);
  const [duration, setDuration] = useState(initialDuration);
  
  useEffect(() => {
    console.log('[AudioPlayer] Duration effect running - isMounted:', isMounted, 'currentTrack:', currentTrack?.id, 'currentDuration:', duration);
    if (typeof window === 'undefined') {
      console.log('[AudioPlayer] Duration effect skipped - SSR');
      return;
    }
    
    // Update duration from audio element after it loads
    const audio = audioRef.current;
    if (audio) {
      const updateDuration = () => {
        if (audio.duration && isFinite(audio.duration)) {
          console.log('[AudioPlayer] Updating duration from audio element:', audio.duration);
          setDuration(audio.duration);
        } else {
          console.log('[AudioPlayer] Audio duration invalid:', audio.duration);
        }
      };
      
      if (audio.duration && isFinite(audio.duration)) {
        updateDuration();
      } else {
        console.log('[AudioPlayer] Waiting for loadedmetadata event');
        audio.addEventListener('loadedmetadata', updateDuration, { once: true });
        return () => {
          audio.removeEventListener('loadedmetadata', updateDuration);
        };
      }
    } else if (currentTrack?.durationSeconds) {
      console.log('[AudioPlayer] No audio element, using track duration:', currentTrack.durationSeconds);
      setDuration(currentTrack.durationSeconds);
    } else {
      console.log('[AudioPlayer] No audio element and no track duration');
    }
  }, [currentTrack?.durationSeconds, isMounted]);


  const isSSR = typeof window === 'undefined';
  console.log('[AudioPlayer] Render - SSR:', isSSR, 'currentTrack:', currentTrack?.id, 'title:', currentTrack?.title, 'artist:', currentTrack?.artist, 'isMinimized:', isMinimized, 'duration:', duration, 'positionSeconds:', positionSeconds, 'isMounted:', isMounted);

  return (
    <>
      {/* Audio element always mounted - CSS handles visibility */}
      <audio ref={audioRef} style={{ display: 'none' }} />
      {typeof window !== 'undefined' && currentTrack && (() => {
        const timeDisplay = formatTime(positionSeconds);
        const durationDisplay = formatTime(duration);
        console.log('[AudioPlayer] Text content - timeDisplay:', timeDisplay, 'durationDisplay:', durationDisplay, 'title:', currentTrack?.title, 'artist:', currentTrack?.artist);
        
        return (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="music-player fixed bottom-0 left-0 right-0 border-t border-border/50 bg-card/70 backdrop-blur-md shadow-lg shadow-black/10 z-50"
            data-component="AudioPlayer"
            data-file="components/player/audio-player.tsx"
            suppressHydrationWarning
          >
            <div className="mx-auto max-w-7xl flex items-center gap-4 px-4 sm:px-8 py-4 text-xs sm:text-sm">
              <div className="flex flex-col min-w-0 flex-shrink-0">
                <span className="font-medium truncate" suppressHydrationWarning>{currentTrack.title}</span>
                {currentTrack.artist && (
                  <span className="text-muted-foreground truncate text-xs" suppressHydrationWarning>
                    {currentTrack.artist}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={prev}
                  className="p-2 rounded-lg hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 active:scale-95"
                  aria-label="Previous track"
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="p-3 rounded-full bg-background/50 backdrop-blur-sm hover:bg-accent/50 hover:shadow-md transition-all duration-200 active:scale-95"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="p-2 rounded-lg hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 active:scale-95"
                  aria-label="Next track"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className="text-xs text-muted-foreground flex-shrink-0" suppressHydrationWarning>
                  {timeDisplay}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={positionSeconds}
                  onChange={handleSeek}
                  className="flex-1 h-1.5 bg-muted/50 rounded-lg appearance-none cursor-pointer accent-primary transition-all hover:accent-primary/80"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${duration > 0 ? (positionSeconds / duration) * 100 : 0}%, hsl(var(--muted) / 0.5) ${duration > 0 ? (positionSeconds / duration) * 100 : 0}%, hsl(var(--muted) / 0.5) 100%)`,
                    transition: 'background 0.1s ease-out'
                  }}
                />
                <span className="text-xs text-muted-foreground flex-shrink-0" suppressHydrationWarning>
                  {durationDisplay}
                </span>
              </div>

              {/* WaveformVisualizer */}
              <div className="hidden bg-card sm:block relative h-8 w-32 flex-shrink-0 overflow-hidden">
                <WaveformVisualizer
                  audioElement={audioRef.current}
                  isPlaying={isPlaying}
                />
              </div>

              {/* Playlist Button */}
              <button
                type="button"
                onClick={() => setPlaylistOpen(true)}
                className="px-3 py-2 rounded-lg hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 active:scale-95 flex-shrink-0"
                aria-label="Open playlist"
              >
                <ListMusic className="h-4 w-4" />
              </button>

              {/* Minimize Button */}
              <button
                type="button"
                onClick={() => {
                  const newMinimized = !isMinimized;
                  setIsMinimized(newMinimized);
                  
                  if (newMinimized) {
                    document.body.classList.add('player-minimized');
                  } else {
                    document.body.classList.remove('player-minimized');
                  }
                  
                  // Dispatch event for other components
                  window.dispatchEvent(new CustomEvent('player-minimize-change', { detail: newMinimized }));
                }}
                className="px-3 py-2 rounded-lg hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 active:scale-95 flex-shrink-0"
                aria-label="Minimize player"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        );
      })()}

      {/* Playlist Sheet */}
      <Sheet open={playlistOpen} onOpenChange={setPlaylistOpen}>
        <SheetContent side="right" className="bg-card w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Playlist</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-1">
            {queue.map((track) => {
              const isActive = track.id === currentTrackId;
              return (
                <button
                  key={track.id}
                  onClick={() => handlePlaylistTrackClick(track.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:bg-accent/50 ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:text-foreground'
                  }`}
                >
                  <div className="font-medium truncate">{track.title}</div>
                  {track.artist && (
                    <div className={`text-sm truncate ${
                      isActive ? 'text-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {track.artist}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

