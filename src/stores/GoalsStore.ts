import { v6 } from 'uuid';
import { Goal, GoalPriority, SubGoal } from '../models/Goal';
import { createStore } from '../state/StoreBuilder';

type GoalsCollection = {
  goalsList: Goal[];
};

export const GoalsStore = createStore<GoalsCollection>(
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

type SubGoalsCollection = {
  subGoals: Record<string, SubGoal[]>;
};

export const SubGoalsStore = createStore<SubGoalsCollection>(
  { subGoals: {} },
  {
    addSubGoal: (draft, { goalId, text }) => {
      if (!draft.subGoals[goalId]) {
        draft.subGoals[goalId] = [];
      }

      draft.subGoals[goalId].push({
        id: v6(),
        goalId,
        text,
        isCompleted: false,
      });
    },
  }
);
