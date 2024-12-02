import React from 'react';
import { Timer } from './components/Timer';
import { WelcomeModal } from './components/WelcomeModal';
import { useTimer } from './hooks/useTimer';
import { useFullscreen } from './hooks/useFullscreen';
import { useWelcomeModal } from './hooks/useWelcomeModal';
import { Terminal, Heart } from 'lucide-react';

function App() {
  const { state, setDuration, start, pause, reset } = useTimer();
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();
  const { showWelcome, closeWelcome } = useWelcomeModal();

  const handleToggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };


  const handleStart = () => {
    enterFullscreen();
    start();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {showWelcome && <WelcomeModal onClose={closeWelcome} />}
      
      <div className="flex items-center gap-3 mb-8">
        <Terminal className="text-emerald-400 w-8 h-8" />
        <h1 className="text-5xl font-mono text-emerald-400">idle</h1>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-xl mb-2 font-mono">
          <span className="text-purple-400">system</span>
          <span className="text-white">.</span>
          <span className="text-emerald-400">idle</span>
          <span className="text-yellow-400">(</span>
          <span className="text-orange-400">{state.duration / 60}</span>
          <span className="text-emerald-400"> minute{state.duration > 60 ? 's' : ''}</span>
          <span className="text-yellow-400">)</span>
          <span className="text-white">;</span>
        </p>
        <p className="text-emerald-400/60 text-sm font-mono">
          <span className="text-green-400/60">// when the system rests, so do you</span>
        </p>
        <p className="text-emerald-400/60 text-xs font-mono mt-2 font-bold">
          <span className="text-purple-400/80">⟨ hit space, step back, and let your mind debug itself ⟩</span>
        </p>
        <p className="text-emerald-400/60 text-xs font-mono mt-2 italic">
          <span className="text-cyan-400/80"> no inputs, no outputs - just conscious idle time </span>
        </p>
      </div>

      <Timer
        duration={state.duration}
        timeRemaining={state.timeRemaining}
        isRunning={state.isRunning}
        isFullscreen={isFullscreen}
        onStart={handleStart}
        onPause={pause}
        onReset={reset}
        onChangeDuration={setDuration}
        onToggleFullscreen={handleToggleFullscreen}
      />

      <div className="mt-8 text-center">
        <p className="text-sm font-mono text-emerald-400/60 mb-2">
          <span className="text-purple-400/60">keyboard</span>
          <span className="text-white/60">.</span>
          <span className="text-emerald-400/60">shortcuts</span>
          <span className="text-yellow-400/60">()</span>
          <span className="text-white/60">:</span>
        </p>
        <p className="text-xs font-mono text-emerald-400/40">
          <span className="text-orange-400/40">space</span> - play/pause,{' '}
          <span className="text-orange-400/40">f</span> - fullscreen,{' '}
          <span className="text-orange-400/40">r</span> - reset
        </p>
      </div>

      <footer className="fixed bottom-4 text-sm font-mono text-center">
        <p className="text-emerald-400/40 mb-2">
          Made with <Heart className="inline-block w-4 h-4 text-red-400" /> and AI by{' '}
          <a href="https://x.com/justmalhar" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            justmalhar
          </a>
        </p>
        <p className="text-emerald-400/40">
          Inspired by{' '}
          <a href="https://sit.sonnet.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            Sit
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;