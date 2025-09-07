import React, { useContext, useMemo } from 'react';
import { EmptyRoadmap } from '../../../models/Goal';
import { useStore } from '../../../state/UseStore';
import { GoalsCollection, GoalsStore, SubGoalsStore } from '../../../stores/GoalsStore';
import { GoalItemContext } from './GoalItemContext';
import { StyledRoadmapItemLink, StyledRoadmapWrapper, StyledSubGoalCard, StyledSubGoalTitle } from './StyledComponents';
import { SubGoalsActions } from './SubGoalsActions';

const comparer = (prev, next) => prev.subGoals !== next.subGoals;

const roadmapDataComparer = (prev, next) => prev.roadmapAnalysis !== next.roadmapAnalysis;

export const Roadmap = () => {
  const { goalData } = useContext(GoalItemContext);
  const [{ subGoals }] = useStore(SubGoalsStore, comparer);

  const matchingSubGoals = useMemo(() => {
    return subGoals[goalData.id] || [];
  }, [subGoals, goalData.id]);

  const [{ roadmapAnalysis }] = useStore<GoalsCollection>(GoalsStore, roadmapDataComparer);
  const roadmapData = useMemo(() => roadmapAnalysis[goalData.id] || EmptyRoadmap, [roadmapAnalysis, goalData.id]);

  return (
    <StyledRoadmapWrapper ratio={80} verticalSpacing={20}>
      {matchingSubGoals.map((value, index) => (
        <React.Fragment key={`sub-goal-${value.id}-${index}`}>
          <StyledRoadmapItemLink key={`sub-goal-link-${value.id}-${index}`} ratio={90} verticalSpacing={20} />
          <StyledSubGoalCard>
            <StyledSubGoalTitle>{value.text}</StyledSubGoalTitle>
          </StyledSubGoalCard>
        </React.Fragment>
      ))}

      <SubGoalsActions subGoals={matchingSubGoals} roadmapData={roadmapData} />
    </StyledRoadmapWrapper>
  );
};
