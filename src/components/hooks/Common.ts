import { useCallback, useRef, useState } from 'react';

export const useTimedToggle = (initialValue: boolean, delay = 300) => {
  const [isOn, setIsOn] = useState(initialValue);
  const intervalId = useRef(null);

  const cancelTimeout = useCallback(() => clearInterval(intervalId.current), []);
  const switchOn = useCallback(() => {
    cancelTimeout();
    setIsOn(true);
  }, [cancelTimeout]);

  const switchOff = useCallback(() => {
    cancelTimeout();
    setIsOn(false);
  }, [cancelTimeout]);

  const delayedSwitchOff = useCallback(() => {
    intervalId.current = setTimeout(() => {
      setIsOn(false);
    }, delay);
  }, [delay]);

  return {
    isOn,
    switchOn,
    switchOff,
    delayedSwitchOff,
    cancelTimeout,
  };
};
