import { useEffect, useState } from 'react';
import { Store } from './StoreBuilder';

export const useStore = <T>(storeInstance: Store<T>) => {
  const [value, setValue] = useState(storeInstance.dataContainer.value);

  useEffect(() => {
    const dataChangeObsever = storeInstance.dataObservable.subscribe(({ current }) => {
      setValue(current);
    });

    return () => dataChangeObsever.unsubscribe();
  }, [storeInstance]);

  return [value];
};
