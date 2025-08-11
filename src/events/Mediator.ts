import { filter, Observable, Subject } from 'rxjs';

interface MediatorCommand {
  eventName: string;
  args: any;
}

export class Mediator {
  private readonly baseStream = new Subject<MediatorCommand>();
  private readonly observablesMap = new Map<string, Observable<MediatorCommand>>();

  constructor(eventsNames: string[]) {
    this.initializeObservables(eventsNames);
  }

  initializeObservables = (eventsNames: string[]) => {
    for (const event of eventsNames) {
      this.observablesMap.set(event, this.baseStream.pipe(filter((command) => command.eventName === event)));
    }
  };

  subscribe = (event: string, callback: (args: any) => void) => {
    return this.observablesMap.get(event)?.subscribe(({ args }) => callback(args));
  };

  publish = (eventName: string, args: any) => {
    this.baseStream.next({
      eventName,
      args,
    });
  };

  asyncPublish = (eventName, args) => {
    queueMicrotask(() => this.publish(eventName, args));
  };
}
