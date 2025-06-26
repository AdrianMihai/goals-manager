import { Draft, produce, setAutoFreeze } from 'immer';
import { Mediator } from '../events/Mediator';
import { BehaviorSubject, Subject } from 'rxjs';

setAutoFreeze(false);

export interface DataObject<T> {
  current: T;
  previous: T;
}

export interface Store<T> {
  dataContainer: { value: T};
  dataObservable: Subject<DataObject<T>>;
  events: Record<string, string>;
  dispatchAction: (eventName: string, args: any) => void
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

  return {
    dataContainer,
    dataObservable,
    events: eventsMap,
    dispatchAction: mediator.publish,
  };
};
