import { createContext } from 'react';
import { Goal } from '../../../models/Goal';

type ItemContextProps = {
  goalData?: Goal;
  unFreezeEditMode?: () => void;
  freezeEditMode?: () => void;
};

export const GoalItemContext = createContext<ItemContextProps>({});
