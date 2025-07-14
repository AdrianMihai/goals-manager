import { Mediator } from './Mediator';

export const AppEvents = {
  analyzeRoadmap: 'analyzeRoadmap',
};

export const AppMediator = new Mediator(Object.values(AppEvents));
