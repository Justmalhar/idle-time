import { createGongOscillator } from '../utils/soundSynthesis';
import { getAudioContext } from '../utils/audioContext';

export function useSound() {
  const playGongSound = () => {
    const ctx = getAudioContext();
    const startTime = ctx.currentTime;
    
    // Fundamental tone
    const fundamental = createGongOscillator({
      frequency: 80,  // Deep fundamental frequency
      type: 'sine',
      gainValue: 0.5,
      fadeOutDuration: 4.0
    }, startTime);
    
    // Mid harmonics
    const midHarmonic = createGongOscillator({
      frequency: 220,  // Mid-range harmonic
      type: 'sine',
      gainValue: 0.3,
      fadeOutDuration: 3.0
    }, startTime);
    
    // High harmonics for shimmer
    const highHarmonic = createGongOscillator({
      frequency: 440,  // Higher harmonic
      type: 'sine',
      gainValue: 0.2,
      fadeOutDuration: 2.0
    }, startTime);
    
    // Noise component for initial strike
    const strikeOsc = createGongOscillator({
      frequency: 200,
      type: 'triangle',
      gainValue: 0.15,
      fadeOutDuration: 0.5
    }, startTime);

    // Start all oscillators
    [fundamental, midHarmonic, highHarmonic, strikeOsc].forEach(({ oscillator, gainNode }) => {
      oscillator.start(startTime);
      oscillator.stop(startTime + 4);
      
      // Cleanup
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    });
  };

  return { playGongSound };
}