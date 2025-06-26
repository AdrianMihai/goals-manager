import { v6 } from 'uuid';
import { Goal, GoalPriority } from '../models/Goal';
import { createStore } from '../state/StoreBuilder';

type GoalCollection = {
  goalsList: Goal[];
};

export const GoalsStore = createStore<GoalCollection>(
  { goalsList: [] },
  {
    addGoal: (draft, { text }) => {
      draft.goalsList.push({ id: v6(), text, priority: GoalPriority.Low });
    },
    updateGoal: (draft, { goal: goal }) => {
      const itemIndex = draft.goalsList.findIndex((val) => val.id === goal.id);

      draft.goalsList.splice(itemIndex, 1, goal);
    },
  }
);
