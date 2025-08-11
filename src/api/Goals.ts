import axios from 'axios';
import { Goal, GoalPriority } from '../models/Goal';
import { GoalsStore } from '../stores/GoalsStore';
import { GoalCreationData } from './Types';
import { v6 } from 'uuid';
import { AppEvents, AppMediator } from '../events/AppMediator';

const BASE_URL = 'localhost:3000/goals';

export const fetchAllGoals = async () => {
  let result: Goal[] = [];

  try {
    result = await axios.get(BASE_URL);
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

export const addNewGoal = ({ text }: GoalCreationData) => {};
