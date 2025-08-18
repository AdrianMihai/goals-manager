import { useEffect } from 'react';
import { addNewGoal, addSubGoal, deleteGoal, fetchAllGoals, updateGoal } from '../../api/Goals';
import { AppEvents, AppMediator } from '../../events/AppMediator';
import { GoalsStore, SubGoalsStore } from '../../stores/GoalsStore';
import { analyzeRoadmap } from '../../api/GeminiApi';

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

    const updateGoalSubscription = GoalsStore.onPublishedResult(GoalsStore.events.goalUpdated, (updatedGoal) => {
      const data = updateGoal(updatedGoal);

      if (!data) return;

      AppMediator.publish(AppEvents.showNotificationMessage, {
        title: 'Goal successfully updated.',
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
      updateGoalSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const NOTIFICATION_ID = 'roadmapAnalysisGenerated';

    const onAnaylsisTriggered = async ({ goalId }) => {
      const result = await analyzeRoadmap({
        goal: GoalsStore.dataContainer.value.goalsList.find((val) => val.id === goalId),
        subGoals: SubGoalsStore.dataContainer.value.subGoals[goalId],
      });

      if (!result) return;

      updateGoal(result);
      GoalsStore.dispatchAction(GoalsStore.events.analysisReceived, result);
      AppMediator.publish(AppEvents.showNotificationMessage, {
        id: NOTIFICATION_ID,
        title: 'New analysis succesfully generated.',
        type: 'success',
        action: 'Show',
      });
    };

    const onDisplayAction = () => {
      console.log('displayed');
    };

    const analysisTriggerObserver = AppMediator.subscribe(AppEvents.analyzeRoadmap, onAnaylsisTriggered);
    const anaylsisDisplayObserver = AppMediator.subscribe(
      AppEvents.notificationActionTriggered,
      ({ messageId }) => messageId === NOTIFICATION_ID && onDisplayAction()
    );

    return () => {
      analysisTriggerObserver.unsubscribe();
      anaylsisDisplayObserver.unsubscribe();
    };
  }, []);
};
