import { useState, useEffect } from 'react';

export function useTimer(onComplete) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timerMode, setTimerMode] = useState('focus'); // 'focus', 'short', 'long'

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const switchTimerMode = (mode) => {
    setIsActive(false);
    setTimerMode(mode);
    switch (mode) {
      case 'focus': setTimeLeft(25 * 60); break;
      case 'short': setTimeLeft(5 * 60); break;
      case 'long': setTimeLeft(15 * 60); break;
      default: setTimeLeft(25 * 60);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => switchTimerMode(timerMode);

  return { 
    timeLeft, 
    isActive, 
    timerMode, 
    switchTimerMode, 
    toggleTimer, 
    resetTimer 
  };
}
