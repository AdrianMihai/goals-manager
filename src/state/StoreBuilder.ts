import { BehaviorSubject } from 'rxjs';
import { Mediator } from '../events/Mediator';
import { QueryFunction, queryHandlerMapper } from './Query';
import {
  ComparerFn,
  DataObject,
  EventsImplementationsMap,
  HandlerArgs,
  HandlersMap,
  ObserverFn,
  Store,
} from './StoreTypes';
import { triggerDataUpdate } from './UpdateCommand';

export const createStore = <T extends Record<string, any>>(
  initialValue: T,
  actionsHandlers: HandlersMap<T> = {},
  queryHandlers: EventsImplementationsMap<T> = {}
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
      triggerDataUpdate(args, handler, { dataContainer, dataObservable, queryBus, events: eventsMap })
    );
  }

  const subscribe = (observerFn: ObserverFn<T>, comparer: ComparerFn<T>) => {
    const observer = dataObservable.subscribe((data) => {
      if (comparer && !comparer(data.previous, data.current)) return;

      observerFn(data);
    });

    return observer;
  };

  const update = (handler: (args: HandlerArgs<T>) => void) =>
    triggerDataUpdate(undefined, handler, { dataContainer, dataObservable, queryBus, events: eventsMap });

  const batchActions = (handler: () => void) => {
    dataContainer.isNotificationPaused = true;

    handler();

    dataContainer.isNotificationPaused = false;
    dataObservable.next({ current: dataContainer.value, previous: dataContainer._previousValue });
  };

  return {
    dataContainer,
    subscribe,
    events: eventsMap,
    dispatchAction: mediator.publish,
    queries,
    update,
    batchActions,
    onPublishedResult: queryBus.onPublishedResult,
  };
};
