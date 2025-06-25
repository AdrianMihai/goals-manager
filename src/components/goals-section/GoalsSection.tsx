import React, { useCallback, useState } from 'react';
import { Goal, GoalPriority } from '../../models/Goal';
import { v6 } from 'uuid';
import { GoalsListContext } from './GoalsListContext';
import { GoalSetter } from './GoalSetter';
import { Container } from '../layout/Container';
import { GoalItem } from './goal-item/GoalItem';

export const GoalsSection = () => {
  const [goalsList, setGoalsList] = useState<Goal[]>([]);

  const addGoal = useCallback((text: string) => {
    setGoalsList((prevValue) => [...prevValue, { id: v6(), text, priority: GoalPriority.High }]);
  }, []);

  return (
    <GoalsListContext.Provider value={{ goalsList, addGoal }}>
      <GoalSetter />
      <Container verticalSpacing={16}>
        {goalsList.map((goal) => (
          <>
            <GoalItem key={`goal-${goal.id}`} data={goal} />
            <Container verticalSpacing={6} />
          </>
        ))}
      </Container>
    </GoalsListContext.Provider>
  );
};
