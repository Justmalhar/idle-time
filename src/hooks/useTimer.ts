import { useReducer, useEffect } from 'react';
import { TimerState, TimerAction } from '../types/timer';
import { useSound } from './useSound';

const initialState: TimerState = {
  duration: 60,
  isRunning: false,
  timeRemaining: 60,
};

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
        timeRemaining: action.payload,
      };
    case 'START':
      return { ...state, isRunning: true };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'RESET':
      return { ...state, timeRemaining: state.duration, isRunning: false };
    case 'TICK':
      const newTimeRemaining = Math.max(0, state.timeRemaining - 1);
      return {
        ...state,
        timeRemaining: newTimeRemaining,
        isRunning: newTimeRemaining > 0,
      };
    default:
      return state;
  }
}

export function useTimer() {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const { playGongSound } = useSound();

  useEffect(() => {
    let interval: number;
    if (state.isRunning) {
      playGongSound(); // Play gong when timer starts
      interval = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    }
    return () => clearInterval(interval);
  }, [state.isRunning]);

  useEffect(() => {
    if (state.timeRemaining === 0) {
      playGongSound(); // Play gong when timer ends
    }
  }, [state.timeRemaining]);

  return {
    state,
    setDuration: (duration: number) => dispatch({ type: 'SET_DURATION', payload: duration }),
    start: () => dispatch({ type: 'START' }),
    pause: () => dispatch({ type: 'PAUSE' }),
    reset: () => dispatch({ type: 'RESET' }),
  };
}