import { produce, setAutoFreeze } from 'immer';

setAutoFreeze(false);

export const triggerDataUpdate = (eventArgs, handler, { dataContainer, dataObservable, queryBus, events }) => {
  const nextState = produce(dataContainer.value, (draft) => {
    handler({ draft, events, queryBus }, eventArgs);
  });

  dataContainer.value = nextState;

  if (dataContainer.isNotificationPaused) return;

  dataObservable.next({ current: dataContainer.value, previous: dataContainer._previousValue });
  dataContainer._previousValue = dataContainer.value;
};
