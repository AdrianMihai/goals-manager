import { v6 } from 'uuid';
import { EmptyRoadmap, Goal, GoalRoadmap, SubGoal } from '../models/Goal';
import { createStore } from '../state/StoreBuilder';

export type GoalsCollection = {
  goalsList: Goal[];
  roadmapAnalysis: Record<string, GoalRoadmap>;
};

export const GoalsStore = createStore<GoalsCollection>(
  { goalsList: [], roadmapAnalysis: {} },
  {
    addGoal: (draft, newGoal) => {
      draft.goalsList.push(newGoal);
    },
    updateGoal: (draft, { goal: goal }) => {
      const itemIndex = draft.goalsList.findIndex((val) => val.id === goal.id);

      draft.goalsList.splice(itemIndex, 1, goal);
    },
    deleteGoal: (draft, { goalId }) => {
      draft.goalsList = draft.goalsList.filter((item) => item.id !== goalId);
    },
    startRoadmapAnalysis: (draft, { goalId }) => {
      if (!draft.roadmapAnalysis[goalId]) {
        draft.roadmapAnalysis[goalId] = EmptyRoadmap;
      }

      draft.roadmapAnalysis[goalId] = {
        ...draft.roadmapAnalysis[goalId],
        isAnalysisInProgress: true,
      };
    },
    analysisReceived: (draft, { goalId, analysis }) => {
      if (!draft.roadmapAnalysis[goalId]) {
        draft.roadmapAnalysis[goalId] = EmptyRoadmap;
      }

      draft.roadmapAnalysis[goalId] = {
        ...draft.roadmapAnalysis[goalId],
        isAnalysisInProgress: false,
        analysisContent: analysis,
      };
    },
    setGoals: (draft, allGoals) => {
      draft.goalsList = allGoals;
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
    setSubGoals: (draft, { goalId, allSubGoals }) => {
      draft.subGoals[goalId] = allSubGoals;
    },
  }
);
