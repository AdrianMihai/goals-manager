import React, { useCallback, useEffect } from 'react';
import { Goal } from '../../models/Goal';
import { GoalsListContext } from './GoalsListContext';
import { GoalSetter } from './GoalSetter';
import { Container } from '../layout/Container';
import { GoalItem } from './goal-item/GoalItem';
import { GoalsStore, SubGoalsStore } from '../../stores/GoalsStore';
import { useStore } from '../../state/UseStore';
import { AppEvents, AppMediator } from '../../events/AppMediator';
import { analyzeRoadmap } from '../../api/GeminiApi';

const goalsComparer = (prev, next) => prev.goalsList !== next.goalsList;

export const GoalsSection = () => {
  const [{ goalsList }] = useStore(GoalsStore, goalsComparer);

  const addGoal = useCallback((text: string) => {
    GoalsStore.dispatchAction(GoalsStore.events.addGoal, { text });
  }, []);

  const updateGoal = useCallback((goal: Goal) => {
    GoalsStore.dispatchAction(GoalsStore.events.updateGoal, { goal });
  }, []);

  useEffect(() => {
    const analysisTriggerObserver = AppMediator.subscribe(AppEvents.analyzeRoadmap, ({ goalId }) => {
      analyzeRoadmap({
        goal: GoalsStore.dataContainer.value.goalsList.find((val) => val.id === goalId),
        subGoals: SubGoalsStore.dataContainer.value.subGoals[goalId],
      });
    });

    return () => analysisTriggerObserver.unsubscribe();
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
