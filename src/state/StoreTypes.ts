import { Draft } from 'immer';
import { Subscription } from 'rxjs';
import { QueryFunction, QueryHandler } from './Query';

export interface DataObject<T> {
  current: T;
  previous: T;
}

export type ObserverFn<T> = (data: DataObject<T>) => void;
export type ComparerFn<T> = (prev: T, current: T) => boolean;
export type SubscriberFn<T> = (observerFn: ObserverFn<T>, comparer?: ComparerFn<T>) => Subscription;
export type QueryObserverFn = (eventName: string, handler: (queryResult: any) => any) => Subscription;

export type EventsMap = Record<string, string>;
export type HandlerArgs<T> = {
  draft: Draft<T>;
  events: EventsMap;
  queryBus: { publishResult: (eventName: string, args: any) => any };
};

export interface Store<T> {
  dataContainer: { value: T };
  subscribe: SubscriberFn<T>;
  events: EventsMap;
  dispatchAction: (eventName: string, args: any) => void;
  update: (handler: (handlerArgs: HandlerArgs<T>) => void) => void;
  batchActions: (handler: any) => void;
  queries: Record<string, QueryFunction>;
  onPublishedResult: QueryObserverFn;
}

export type HandlersMap<T> = Record<string, (handlerContext: HandlerArgs<T>, args: any) => void>;

export type EventsImplementationsMap<T> = Record<string, QueryHandler<T>>;
