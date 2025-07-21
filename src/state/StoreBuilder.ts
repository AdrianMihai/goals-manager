import { Draft, produce, setAutoFreeze } from 'immer';
import { Mediator } from '../events/Mediator';
import { BehaviorSubject, Subscription } from 'rxjs';

setAutoFreeze(false);

export interface DataObject<T> {
  current: T;
  previous: T;
}

type ObserverFn<T> = (data: DataObject<T>) => void;
export type ComparerFn<T> = (prev: T, current: T) => boolean;
export type SubscriberFn<T> = (observerFn: ObserverFn<T>, comparer?: ComparerFn<T>) => Subscription;

export interface Store<T> {
  dataContainer: { value: T };
  subscribe: SubscriberFn<T>;
  events: Record<string, string>;
  dispatchAction: (eventName: string, args: any) => void;
  batchActions: (handler: any) => void;
}

const eventHandler = (eventArgs, handler, { dataContainer, dataObservable }) => {
  const nextState = produce(dataContainer.value, (draft) => {
    handler(draft, eventArgs);
  });

  dataContainer.value = nextState;

  if (dataContainer.isNotificationPaused) return;

  dataObservable.next({ current: dataContainer.value, previous: dataContainer._previousValue });
  dataContainer._previousValue = dataContainer.value;
};

export const createStore = <T extends Record<string, any>>(
  initialValue: T,
  actionsHandlers: Record<string, (draft: Draft<T>, args: any) => void> = {}
): Store<T> => {
  const dataContainer = { value: initialValue, _previousValue: initialValue, isNotificationPaused: false };
  const dataObservable = new BehaviorSubject<DataObject<T>>({ current: initialValue, previous: {} as T });

  const eventsMap = {};
  const mediator = new Mediator(Object.keys(actionsHandlers));

  for (const [eventName, handler] of Object.entries(actionsHandlers)) {
    eventsMap[eventName] = eventName;

    mediator.subscribe(eventName, (args) => eventHandler(args, handler, { dataContainer, dataObservable }));
  }

  const subscribe = (observerFn: ObserverFn<T>, comparer: ComparerFn<T>) => {
    const observer = dataObservable.subscribe((data) => {
      if (comparer && !comparer(data.previous, data.current)) return;

      observerFn(data);
    });

    return observer;
  };

  const batchActions = (handler: () => void) => {
    dataContainer.isNotificationPaused = true;

    handler();

    dataContainer.isNotificationPaused = false;
  };

  return {
    dataContainer,
    subscribe,
    events: eventsMap,
    dispatchAction: mediator.publish,
    batchActions,
  };
};
