import { createContext } from 'react';
import { Goal } from '../../models/Goal';

interface ContextType {
  goalsList: Goal[];
  addGoal: (text: string) => void;
}

export const GoalsListContext = createContext<ContextType>({ goalsList: [], addGoal: () => {} });
