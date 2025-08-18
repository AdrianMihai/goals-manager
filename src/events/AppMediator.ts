import { Mediator } from './Mediator';

export const AppEvents = {
  analyzeRoadmap: 'analyzeRoadmap',
  showNotificationMessage: 'showNotificationMessage',
  notificationActionTriggered: 'notificationActionTriggered',
  showRoadmapAnalysis: 'showRoadmapAnalysis',
  deleteGoal: 'deleteGoal',
};

export const AppMediator = new Mediator(Object.values(AppEvents));
