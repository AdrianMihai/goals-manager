import { Mediator } from './Mediator';

export const AppEvents = {
  analyzeRoadmap: 'analyzeRoadmap',
  showNotificationMessage: 'showNotificationMessage',
  deleteGoal: 'deleteGoal',
};

export const AppMediator = new Mediator(Object.values(AppEvents));
