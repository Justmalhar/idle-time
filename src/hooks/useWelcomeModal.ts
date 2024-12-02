import { useState, useEffect } from 'react';

const WELCOME_SHOWN_KEY = 'idle-welcome-shown';

export function useWelcomeModal() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasShownWelcome = localStorage.getItem(WELCOME_SHOWN_KEY);
    if (!hasShownWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const closeWelcome = () => {
    localStorage.setItem(WELCOME_SHOWN_KEY, 'true');
    setShowWelcome(false);
  };

  return { showWelcome, closeWelcome };
}