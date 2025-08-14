import { useEffect } from 'react';
import { addNewGoal, addSubGoal, deleteGoal, fetchAllGoals } from '../../api/Goals';
import { AppEvents, AppMediator } from '../../events/AppMediator';
import { GoalsStore, SubGoalsStore } from '../../stores/GoalsStore';

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

    const subGoalAddSubscription = SubGoalsStore.onPublishedResult(
      SubGoalsStore.events.subGoalAdded,
      ({ subGoal, goalId }) => {
        addSubGoal(goalId, subGoal);
      }
    );

    return () => {
      insertUserSubscription.unsubscribe();
      deleteGoalSubscription.unsubscribe();
      subGoalAddSubscription.unsubscribe();
    };
  }, []);
};
