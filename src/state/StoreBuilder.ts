import { Draft, produce, setAutoFreeze } from 'immer';
import { Mediator } from '../events/Mediator';
import { BehaviorSubject, Subscription } from 'rxjs';
import { mergeQueryArguments, QueryContext, QueryFunction, QueryHandler } from './Query';

setAutoFreeze(false);

export interface DataObject<T> {
  current: T;
  previous: T;
}

type ObserverFn<T> = (data: DataObject<T>) => void;
export type ComparerFn<T> = (prev: T, current: T) => boolean;
export type SubscriberFn<T> = (observerFn: ObserverFn<T>, comparer?: ComparerFn<T>) => Subscription;
export type QueryObserverFn = (eventName: string, handler: (queryResult: any) => any) => Subscription;

type EventsMap = Record<string, string>;
type HandlerArgs<T> = {
  draft: Draft<T>;
  events: EventsMap;
  queryBus: { publishResult: (eventName: string, args: any) => Promise<any> };
};

export interface Store<T> {
  dataContainer: { value: T };
  subscribe: SubscriberFn<T>;
  events: EventsMap;
  dispatchAction: (eventName: string, args: any) => void;
  batchActions: (handler: any) => void;
  queries: Record<string, QueryFunction>;
  onPublishedResult: QueryObserverFn;
}

const eventHandler = (eventArgs, handler, { dataContainer, dataObservable, queryBus, events }) => {
  const nextState = produce(dataContainer.value, (draft) => {
    handler({ draft, events, queryBus }, eventArgs);
  });

  dataContainer.value = nextState;

  if (dataContainer.isNotificationPaused) return;

  dataObservable.next({ current: dataContainer.value, previous: dataContainer._previousValue });
  dataContainer._previousValue = dataContainer.value;
};

export const queryHandlerMapper = <T>(getData: () => T, handler: QueryHandler<T>): QueryFunction => {
  return (args: QueryContext | Record<string, any>) => handler(getData(), args);
};

export const createStore = <T extends Record<string, any>>(
  initialValue: T,
  actionsHandlers: Record<string, (handlerContext: HandlerArgs<T>, args: any) => void> = {},
  queryHandlers: Record<string, QueryHandler<T>> = {}
): Store<T> => {
  const dataContainer = { value: initialValue, _previousValue: initialValue, isNotificationPaused: false };
  const dataObservable = new BehaviorSubject<DataObject<T>>({ current: initialValue, previous: {} as T });

  const eventsMap = [...Object.keys(actionsHandlers), ...Object.keys(queryHandlers)].reduce((accMap, eventName) => {
    accMap[eventName] = eventName;

    return accMap;
  }, {});

  const queries: Record<string, QueryFunction> = Object.entries(queryHandlers).reduce(
    (queriesMap, [queryName, handler]) => {
      queriesMap[queryName] = queryHandlerMapper(() => dataContainer.value, handler);

      return queriesMap;
    },
    {}
  );

  const mediator = new Mediator(Object.keys(actionsHandlers));
  const queryMediator = new Mediator(Object.keys(queryHandlers));
  const queryBus = {
    publishResult: (eventName, args) => queryMediator.asyncPublish(eventName, args),
    onPublishedResult: (queryName: string, handler: (queryResult: any) => any) =>
      Object.keys(queries).includes(queryName) &&
      queryMediator.subscribe(queryName, (args) => handler(queries[queryName](args))),
  };

  for (const [eventName, handler] of Object.entries(actionsHandlers)) {
    mediator.subscribe(eventName, (args) =>
      eventHandler(args, handler, { dataContainer, dataObservable, queryBus, events: eventsMap })
    );
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
    queries,
    batchActions,
    onPublishedResult: queryBus.onPublishedResult,
  };
};
