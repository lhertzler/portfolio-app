'use client';

import { useEffect, useRef, useState } from 'react';

interface WaveformVisualizerProps {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
  className?: string;
}

export function WaveformVisualizer({
  audioElement,
  isPlaying,
  className = '',
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioElement) return;

    // Initialize Web Audio API
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    // Reuse existing context or create new one
    let audioContext = audioContextRef.current;
    if (!audioContext || audioContext.state === 'closed') {
      audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;
    }

    // Create analyser
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Higher resolution for smoother waveform
    analyser.smoothingTimeConstant = 0.3; // Less smoothing for more responsive visualization
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Create source node only if it doesn't exist
    // Note: MediaElementAudioSourceNode can only be created once per audio element
    let source = sourceRef.current;
    if (!source) {
      try {
        source = audioContext.createMediaElementSource(audioElement);
        sourceRef.current = source;
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      } catch (error) {
        // Source may already exist, ignore
      }
    } else {
      // Reconnect analyser if source exists
      try {
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      } catch (error) {
        // Already connected, ignore
      }
    }

    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    return () => {
      // Clean up analyser connections
      try {
        if (analyserRef.current) {
          analyserRef.current.disconnect();
        }
      } catch (e) {
        // Ignore disconnect errors
      }
    };
  }, [audioElement]);

  // Resume audio context when playing (required for Chrome autoplay policy)
  useEffect(() => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    if (isPlaying && audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current || !dataArrayRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    let width = 128;
    let height = 24;

    // Function to update canvas size
    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          width = rect.width;
          height = rect.height;
          const dpr = window.devicePixelRatio || 1;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);
        }
      }
    };

    // Set initial canvas dimensions
    updateCanvasSize();

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    // Also try updating after a short delay to ensure parent is ready
    const timeoutId = setTimeout(() => {
      updateCanvasSize();
    }, 100);

    const draw = () => {
      // Update dimensions in case they changed
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          width = rect.width;
          height = rect.height;
        }
      }

      const bottomY = height; // Bars start from bottom
      const maxBarHeight = height; // Bars can extend full height

      // Get card background color from CSS variables with 70% opacity
      const cardColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--card')
        .trim();
      
      const bgColor = cardColor 
        ? `hsl(${cardColor} / 0.7)` 
        : 'hsla(0, 0%, 100%, 0.7)';

      if (!isPlaying) {
        // When paused, use card background with opacity
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      // Use time-domain data for waveform visualization
      // @ts-expect-error - Web Audio API type mismatch, works fine at runtime
      analyser.getByteTimeDomainData(dataArray);

      // Clear canvas with card background color at 70% opacity
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Reduce number of bars by sampling every nth point
      const sampleRate = 8; // Sample every 8th point for fewer bars
      const barCount = Math.floor(dataArray.length / sampleRate);
      const barWidth = width / barCount;

      // Use primary color from CSS variables
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim();
      
      // Fallback to default primary color if CSS variable not available
      const barColor = primaryColor 
        ? `hsl(${primaryColor})` 
        : 'hsl(221.2 83.2% 53.3%)';
      
      ctx.fillStyle = barColor;
      ctx.imageSmoothingEnabled = false;

      // Draw bars extending upward from bottom
      for (let i = 0; i < barCount; i++) {
        const dataIndex = i * sampleRate;
        const dataValue = dataArray[dataIndex];
        // Convert 0-255 to 0-1 range, using absolute deviation from center (128)
        const normalizedValue = Math.abs(dataValue - 128) / 128;
        const barHeight = normalizedValue * maxBarHeight;

        if (barHeight < 0.5) continue; // Skip very small bars

        const x = i * barWidth;
        const barTop = bottomY - barHeight; // Top of bar

        // Draw sharp vertical bars extending upward from bottom
        ctx.fillRect(
          Math.round(x + barWidth * 0.2),
          Math.round(barTop),
          Math.round(barWidth * 0.6),
          Math.round(barHeight)
        );
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Always start the draw loop
    draw();

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isPlaying]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-full w-full bg-card/70 backdrop-blur-md">
      <canvas
        ref={canvasRef}
        width={128}
        height={24}
        className={`absolute bottom-0 left-0 right-0 ${className}`}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          imageRendering: 'crisp-edges',
        }}
      />
    </div>
  );
}

