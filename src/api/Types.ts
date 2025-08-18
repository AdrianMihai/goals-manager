import { Goal, GoalPriority, SubGoal } from '../models/Goal';

export type GoalCreationData = {
  text: string;
};

export interface RoadmapData {
  goal: Goal;
  subGoals: SubGoal[];
}

export type GoalUpdateData = {
  id: string;
  roadmapAnalysis?: string;
  priority?: GoalPriority;
  dueBy?: string;
};
