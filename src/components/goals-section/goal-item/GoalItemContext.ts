import { createContext } from 'react';
import { Goal } from '../../../models/Goal';

type ItemContextProps = {
  goalData?: Goal;
  isEditingActive: boolean;
  unFreezeEditMode?: () => void;
  freezeEditMode?: () => void;
  enableEditMode?: () => void;
  disableEditMode?: () => void;
};

export const GoalItemContext = createContext<ItemContextProps>({ isEditingActive: false });
