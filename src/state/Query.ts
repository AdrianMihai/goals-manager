export type QueryContext = Record<string, any>;

export type QueryHandler<T> = (data: T, context: QueryContext) => any;

export type QueryFunction = (args: QueryContext | Record<string, any>) => any;

export const mergeQueryArguments = (handlerArgs?: QueryContext, queryCallArgs?: Record<string, any>) => {
  return { ...(handlerArgs || {}), ...(queryCallArgs || {}) };
};
