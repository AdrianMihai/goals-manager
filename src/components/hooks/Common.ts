import { useCallback, useRef, useState } from 'react';

export const useTimedToggle = (initialValue: boolean) => {
  const [isOn, setIsOn] = useState(initialValue);
  const intervalId = useRef(null);

  const switchOn = useCallback(() => {
    clearInterval(intervalId.current);
    setIsOn(true);
  }, []);

  const switchOff = useCallback(() => {
    clearInterval(intervalId.current);
    setIsOn(false);
  }, []);

  const delayedSwitchOff = useCallback(() => {
    intervalId.current = setTimeout(() => {
      setIsOn(false);
    }, 300);
  }, []);

  return {
    isOn,
    switchOn,
    switchOff,
    delayedSwitchOff,
  };
};
