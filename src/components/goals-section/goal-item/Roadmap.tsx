import Loading from '@mdi/svg/svg/loading.svg';
import React, { useContext, useMemo } from 'react';
import { EmptyRoadmap } from '../../../models/Goal';
import { IconSize } from '../../../resources/SVGIcon';
import { useStore } from '../../../state/UseStore';
import { GoalsCollection, GoalsStore, SubGoalsStore } from '../../../stores/GoalsStore';
import { Conditional } from '../../Conditional';
import { LoadingBackdrop } from '../../surfaces/LoadingBackdrop';
import { GoalItemContext } from './GoalItemContext';
import {
  StyledAnalysisLoadingSpinner,
  StyledRoadmapItemLink,
  StyledRoadmapWrapper,
  StyledSubGoalCard,
  StyledSubGoalTitle,
} from './StyledComponents';
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
      <Conditional when={roadmapData.isAnalysisInProgress}>
        <LoadingBackdrop>
          <StyledAnalysisLoadingSpinner size={IconSize.VeryLarge}>
            <Loading />
          </StyledAnalysisLoadingSpinner>
        </LoadingBackdrop>
      </Conditional>
    </StyledRoadmapWrapper>
  );
};
