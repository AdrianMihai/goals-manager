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
