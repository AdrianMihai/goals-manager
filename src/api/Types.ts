import { Goal, SubGoal } from '../models/Goal';

export type GoalCreationData = {
  text: string;
};

export interface RoadmapData {
  goal: Goal;
  subGoals: SubGoal[];
}
