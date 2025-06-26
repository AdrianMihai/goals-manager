import React, { useCallback } from 'react';
import { Goal } from '../../models/Goal';
import { GoalsListContext } from './GoalsListContext';
import { GoalSetter } from './GoalSetter';
import { Container } from '../layout/Container';
import { GoalItem } from './goal-item/GoalItem';
import { GoalsStore } from '../../stores/GoalsStore';
import { useStore } from '../../state/UseStore';

export const GoalsSection = () => {
  const [{ goalsList }] = useStore(GoalsStore);

  const addGoal = useCallback((text: string) => {
    GoalsStore.dispatchAction(GoalsStore.events.addGoal, { text });
  }, []);

  const updateGoal = useCallback((goal: Goal) => {
    GoalsStore.dispatchAction(GoalsStore.events.updateGoal, { goal });
  }, []);

  return (
    <GoalsListContext.Provider value={{ goalsList, addGoal, updateGoal }}>
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
