import { Draft, produce, setAutoFreeze } from 'immer';
import { Mediator } from '../events/Mediator';
import { BehaviorSubject, Observer, Subject, Subscription } from 'rxjs';

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
}

export const createStore = <T extends Record<string, any>>(
  initialValue: T,
  actionsHandlers: Record<string, (draft: Draft<T>, args: any) => void> = {}
): Store<T> => {
  const dataContainer = { value: initialValue };
  const dataObservable = new BehaviorSubject<DataObject<T>>({ current: initialValue, previous: {} as T });

  const eventsMap = {};
  const mediator = new Mediator(Object.keys(actionsHandlers));

  for (const [eventName, handler] of Object.entries(actionsHandlers)) {
    eventsMap[eventName] = eventName;

    mediator.subscribe(eventName, (args) => {
      const nextState = produce(dataContainer.value, (draft) => {
        handler(draft, args);
      });

      const previous = dataContainer.value;

      dataContainer.value = nextState;
      dataObservable.next({ current: dataContainer.value, previous });
    });
  }

  const subscribe = (observerFn: ObserverFn<T>, comparer: ComparerFn<T>) => {
    const observer = dataObservable.subscribe((data) => {
      if (comparer && !comparer(data.previous, data.current)) return;

      observerFn(data);
    });

    return observer;
  };

  return {
    dataContainer,
    subscribe,
    events: eventsMap,
    dispatchAction: mediator.publish,
  };
};
