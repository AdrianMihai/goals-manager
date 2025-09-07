import { AppEvents, AppMediator } from '../events/AppMediator';
import { createAnalysis, Goal, SubGoal } from '../models/Goal';
import { GoalsStore, SubGoalsStore } from '../stores/GoalsStore';
import { GoalUpdateData } from './Types';
import { ApiService } from './ApiService';

const BASE_URL = '/goals';

export const fetchAllGoals = async () => {
  let result = [];

  try {
    result = (await ApiService.get(BASE_URL)).data;
  } catch (e) {
    console.log('error fetching goals', e.message);

    AppMediator.publish(AppEvents.showNotificationMessage, { type: 'error', title: 'Error fetching goals.' });
  }

  if (result.length === 0) return;

  GoalsStore.batchActions(() => {
    GoalsStore.update(({ draft }) => {
      draft.goalsList = result.map((val) => ({ ...val, subGoals: undefined, roadmapAnalysis: undefined }));

      for (const goalData of result) {
        draft.roadmapAnalysis[goalData.id] = createAnalysis(goalData.roadmapAnalysis);
      }
    });

    for (const goalData of result) {
      SubGoalsStore.dispatchAction(SubGoalsStore.events.setSubGoals, {
        goalId: goalData.id,
        allSubGoals: goalData.subGoals,
      });
    }
  });
};

export const addNewGoal = async (goalData: Goal) => {
  try {
    const response = await ApiService.post(BASE_URL, goalData);

    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};

export const updateGoal = async (goalData: Goal | GoalUpdateData) => {
  try {
    const response = await ApiService.put(`${BASE_URL}/${goalData.id}`, goalData);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteGoal = async (goalId: string) => {
  try {
    const response = await ApiService.delete(`${BASE_URL}/${goalId}`);

    GoalsStore.dispatchAction(GoalsStore.events.deleteGoal, { goalId });

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const addSubGoal = async (goalId: string, subGoalData: SubGoal) => {
  try {
    const response = await ApiService.post(`${BASE_URL}/${goalId}/add-subGoal`, subGoalData);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
