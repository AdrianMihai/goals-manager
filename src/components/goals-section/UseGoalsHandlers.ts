import { useEffect } from 'react';
import { addNewGoal, deleteGoal, fetchAllGoals } from '../../api/Goals';
import { AppEvents, AppMediator } from '../../events/AppMediator';
import { GoalsStore } from '../../stores/GoalsStore';

export const useGoalsHandlers = () => {
  useEffect(() => {
    fetchAllGoals();
  }, []);

  useEffect(() => {
    const insertUserSubscription = GoalsStore.onPublishedResult(GoalsStore.events.newGoalInserted, (newGoal) => {
      addNewGoal(newGoal);
    });

    const deleteGoalSubscription = AppMediator.subscribe(AppEvents.deleteGoal, ({ goalId }) => {
      const result = deleteGoal(goalId);

      if (!result) return;

      AppMediator.publish(AppEvents.showNotificationMessage, {
        title: 'Goal removed from the list.',
        type: 'success',
        duration: 5000,
      });
    });

    return () => {
      insertUserSubscription.unsubscribe();
      deleteGoalSubscription.unsubscribe();
    };
  }, []);
};
