import { createContext } from 'react';
import { Goal } from '../../../models/Goal';

type ItemContextProps = {
  goalData?: Goal;
};

export const GoalItemContext = createContext<ItemContextProps>({});
