import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

interface TimerProps {
  duration: number;
  timeRemaining: number;
  isRunning: boolean;
  isFullscreen: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onChangeDuration: (duration: number) => void;
  onToggleFullscreen: () => void;
}

export function Timer({
  duration,
  timeRemaining,
  isRunning,
  isFullscreen,
  onStart,
  onPause,
  onReset,
  onChangeDuration,
  onToggleFullscreen,
}: TimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
          onPause();
        } else {
          onStart();
        }
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        onToggleFullscreen();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        onReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, onStart, onPause, onToggleFullscreen, onReset]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onChangeDuration(duration + 60)}
          className="text-emerald-400 hover:text-emerald-300 transition-colors font-mono group relative"
          aria-label="Increase duration"
        >
          <span className="text-2xl">++</span>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs opacity-60 group-hover:opacity-100">min</span>
        </button>
        <div className="font-mono text-5xl font-light text-emerald-400 w-48 text-center tracking-wider">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
        <button
          onClick={() => onChangeDuration(Math.max(60, duration - 60))}
          className="text-emerald-400 hover:text-emerald-300 transition-colors font-mono group relative"
          aria-label="Decrease duration"
        >
          <span className="text-2xl">--</span>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs opacity-60 group-hover:opacity-100">min</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => {
            if (!isRunning) {
              onToggleFullscreen();  // Enter fullscreen before starting
            }
            if (isRunning) {
              onPause();
            } else {
              onStart();
            }
          }}
          className="bg-emerald-500 text-gray-900 px-6 py-2 rounded hover:bg-emerald-400 transition-colors font-mono"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={onReset}
          className="bg-emerald-500 text-gray-900 px-6 py-2 rounded hover:bg-emerald-400 transition-colors font-mono"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={onToggleFullscreen}
          className="bg-emerald-500 text-gray-900 px-6 py-2 rounded hover:bg-emerald-400 transition-colors font-mono"
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>
    </div>
  );
}