import React, { useCallback, useEffect } from 'react';
import { Goal } from '../../models/Goal';
import { useStore } from '../../state/UseStore';
import { GoalsStore } from '../../stores/GoalsStore';
import { Container } from '../layout/Container';
import { GoalItem } from './goal-item/GoalItem';
import { GoalSetter } from './GoalSetter';
import { GoalsListContext } from './GoalsListContext';
import { useGoalsHandlers } from './UseGoalsHandlers';
import { useScrollPositioning } from './UseScrollPositioning';

const goalsComparer = (prev, next) => prev.goalsList !== next.goalsList;

export const GoalsSection = () => {
  const [{ goalsList }] = useStore(GoalsStore, goalsComparer);

  useGoalsHandlers();

  const { setItemToScroll } = useScrollPositioning(goalsList);

  useEffect(() => {
    const insertSubscription = GoalsStore.onPublishedResult(GoalsStore.events.newGoalInserted, (newGoal) => {
      setItemToScroll(newGoal.id);
    });

    return () => insertSubscription.unsubscribe();
  }, [setItemToScroll]);

  const addGoal = useCallback((text: string) => {
    GoalsStore.dispatchAction(GoalsStore.events.addGoal, { text });
  }, []);

  const updateGoal = useCallback((goal: Goal) => {
    GoalsStore.dispatchAction(GoalsStore.events.updateGoal, { goal });
  }, []);

  return (
    <GoalsListContext.Provider value={{ goalsList, addGoal, updateGoal }}>
      <Container ratio={60} verticalSpacing={32}>
        <GoalSetter />
        <Container verticalSpacing={16}>
          {goalsList.map((goal) => (
            <>
              <GoalItem key={`goal-${goal.id}`} data={goal} />
              <Container key={`goal-spacer-${goal.id}`} verticalSpacing={6} />
            </>
          ))}
        </Container>
      </Container>
    </GoalsListContext.Provider>
  );
};
