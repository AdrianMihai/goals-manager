export type QueryContext = Record<string, any>;

export type QueryHandler<T> = (data: T, context: QueryContext) => any;

export type QueryFunction = (args?: QueryContext | Record<string, any>) => any;

export const queryHandlerMapper = <T>(getData: () => T, handler: QueryHandler<T>): QueryFunction => {
  return (args: QueryContext | Record<string, any> = {}) => handler(getData(), args);
};
