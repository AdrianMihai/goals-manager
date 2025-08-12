import { useCallback, useRef } from 'react';
import { useDeferredEffect } from '../../common-hooks/UseDeferredEffect';
import { isEmptyString } from '../../utils/StringUtils';

export const useScrollPositioning = (items) => {
  const itemIdentifierToScroll = useRef(null);

  useDeferredEffect(() => {
    if (isEmptyString(itemIdentifierToScroll.current)) return;

    document
      .querySelector(`[data-item-identifier="goal-item-${itemIdentifierToScroll.current}"]`)
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
    itemIdentifierToScroll.current = null;
  }, [items]);

  const setItemToScroll = useCallback((itemId: string) => {
    itemIdentifierToScroll.current = itemId;
  }, []);

  return { setItemToScroll };
};
