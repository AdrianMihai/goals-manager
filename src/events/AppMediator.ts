import { Mediator } from './Mediator';

export const AppEvents = {
  analyzeRoadmap: 'analyzeRoadmap',
  showNotificationMessage: 'showNotificationMessage',
};

export const AppMediator = new Mediator(Object.values(AppEvents));
