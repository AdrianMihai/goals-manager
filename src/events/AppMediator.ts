import { Mediator } from './Mediator';

export const AppEvents = {
  analyzeRoadmap: 'analyzeRoadmap',
  showNotificationMessage: 'showNotificationMessage',
  goalInserted: 'goalInserted',
};

export const AppMediator = new Mediator(Object.values(AppEvents));
