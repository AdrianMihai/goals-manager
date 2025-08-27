import { useEffect, useState } from 'react';
import { ComparerFn, Store } from './StoreTypes';

export const useStore = <T>(storeInstance: Store<T>, comparer?: ComparerFn<T>) => {
  const [value, setValue] = useState(storeInstance.dataContainer.value);

  useEffect(() => {
    const dataChangeObsever = storeInstance.subscribe(({ current }) => {
      setValue(current);
    }, comparer);

    return () => dataChangeObsever.unsubscribe();
  }, [storeInstance, comparer]);

  return [value];
};
