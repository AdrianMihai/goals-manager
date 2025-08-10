export enum GoalPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export interface Goal {
  id: string;
  text: string;
  priority: GoalPriority;
  dueBy?: string;
}

export interface SubGoal {
  id: string;
  goalId: string;
  text: string;
  isCompleted: boolean;
}

export type GoalRoadmap = {
  isAnalysisInProgress: boolean;
  analysisContent: string;
};

export const EmptyRoadmap = { isAnalysisInProgress: false, analysisContent: '' };
