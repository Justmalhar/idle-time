import { getAudioContext } from './audioContext';

interface OscillatorConfig {
  frequency: number;
  type: OscillatorType;
  gainValue: number;
  fadeOutDuration: number;
}

export function createGongOscillator(config: OscillatorConfig, startTime: number) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.type = config.type;
  oscillator.frequency.setValueAtTime(config.frequency, startTime);
  
  // Envelope shaping
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(config.gainValue, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + config.fadeOutDuration);
  
  return { oscillator, gainNode };
}