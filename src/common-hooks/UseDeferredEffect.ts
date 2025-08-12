import React, { useEffect } from 'react';

export const useDeferredEffect = (handler: React.EffectCallback, dependencies) => {
  useEffect(() => {
    queueMicrotask(handler);
  }, dependencies);
};
