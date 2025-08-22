import { v6 } from 'uuid';
import { createAnalysis, EmptyRoadmap, Goal, GoalPriority, GoalRoadmap, SubGoal } from '../models/Goal';
import { createStore } from '../state/StoreBuilder';

export type GoalsCollection = {
  goalsList: Goal[];
  roadmapAnalysis: Record<string, GoalRoadmap>;
};

export const GoalsStore = createStore<GoalsCollection>(
  { goalsList: [], roadmapAnalysis: {} },
  {
    addGoal: ({ draft, queryBus, events }, { text }) => {
      const newGoal = { id: v6(), text, priority: GoalPriority.Low };

      draft.goalsList.push(newGoal);
      queryBus.publishResult(events.newGoalInserted, { newGoal });
    },
    updateGoal: ({ draft, queryBus, events }, { goal: goal }) => {
      const itemIndex = draft.goalsList.findIndex((val) => val.id === goal.id);

      draft.goalsList.splice(itemIndex, 1, goal);
      queryBus.publishResult(events.goalUpdated, { updatedGoal: goal });
    },
    deleteGoal: ({ draft, queryBus, events }, { goalId }) => {
      const deletedGoal = draft.goalsList.find((item) => item.id === goalId);

      if (!deletedGoal) return;

      draft.goalsList = draft.goalsList.filter((item) => item.id !== deletedGoal.id);
      queryBus.publishResult(events.goalDeleted, { deletedGoal });
    },
    startRoadmapAnalysis: ({ draft }, { goalId }) => {
      if (!draft.roadmapAnalysis[goalId]) {
        draft.roadmapAnalysis[goalId] = EmptyRoadmap;
      }

      draft.roadmapAnalysis[goalId] = {
        ...draft.roadmapAnalysis[goalId],
        isAnalysisInProgress: true,
      };
    },
    analysisReceived: ({ draft }, { id, roadmapAnalysis }) => {
      draft.roadmapAnalysis[id] = createAnalysis(roadmapAnalysis);
    },
    setGoals: ({ draft }, allGoals) => {
      draft.goalsList = allGoals;
    },
  },
  {
    newGoalInserted: (_, { newGoal }) => newGoal,
    goalDeleted: (_, { deletedGoal }) => deletedGoal,
    goalUpdated: (_, { updatedGoal }) => updatedGoal,
    getByPriority: (data, { priority }) => data.goalsList.filter((val) => val.priority === priority),
  }
);

type SubGoalsCollection = {
  subGoals: Record<string, SubGoal[]>;
};

export const SubGoalsStore = createStore<SubGoalsCollection>(
  { subGoals: {} },
  {
    addSubGoal: ({ draft, queryBus, events }, { goalId, text }) => {
      if (!draft.subGoals[goalId]) {
        draft.subGoals[goalId] = [];
      }

      const newSubGoal = {
        id: v6(),
        goalId,
        text,
        isCompleted: false,
      };

      draft.subGoals[goalId].push(newSubGoal);
      queryBus.publishResult(events.subGoalAdded, { newSubGoal });
    },
    setSubGoals: ({ draft }, { goalId, allSubGoals }) => {
      draft.subGoals[goalId] = allSubGoals;
    },
  },
  {
    findParentGoalById: (data, { subGoalId }) => {
      for (const goalId in data.subGoals) {
        if (data.subGoals[goalId].find((val) => val.id === subGoalId)) {
          return goalId;
        }
      }

      return null;
    },
    subGoalAdded: (_, { newSubGoal }) => ({
      subGoal: newSubGoal,
      goalId: SubGoalsStore.queries.findParentGoalById({ subGoalId: newSubGoal.id }),
    }),
  }
);
