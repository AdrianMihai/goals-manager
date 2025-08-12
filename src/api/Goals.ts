import axios from 'axios';
import { Goal } from '../models/Goal';
import { GoalsStore } from '../stores/GoalsStore';

const BASE_URL = 'http://localhost:3000/goals';

export const fetchAllGoals = async () => {
  let result: Goal[] = [];

  try {
    result = (await axios.get(BASE_URL)).data;
  } catch (e) {
    console.log('error fetching goals', e.message);
  }

  if (result.length === 0) return;

  GoalsStore.batchActions(() => {
    GoalsStore.dispatchAction(
      GoalsStore.events.setGoals,
      result.map((val) => ({ ...val, subGoals: undefined, roadmapAnalysis: undefined }))
    );
  });
};

export const addNewGoal = async (goalData: Goal) => {
  try {
    const response = await axios.post(BASE_URL, goalData, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};

export const deleteGoal = async (goalId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${goalId}`);

    GoalsStore.dispatchAction(GoalsStore.events.deleteGoal, { goalId });

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
