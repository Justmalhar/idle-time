export type TimerState = {
  duration: number;
  isRunning: boolean;
  timeRemaining: number;
};

export type TimerAction =
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'TICK' };