import React, { useContext, useMemo } from 'react';
import { Container } from '../../layout/Container';
import { SubGoalsActions } from './SubGoalsActions';
import {
  StyledAnalysisLoadingSpinner,
  StyledRoadmapItemLink,
  StyledRoadmapWrapper,
  StyledSubGoalCard,
  StyledSubGoalTitle,
} from './StyledComponents';
import { useStore } from '../../../state/UseStore';
import { GoalsCollection, GoalsStore, SubGoalsStore } from '../../../stores/GoalsStore';
import { GoalItemContext } from './GoalItemContext';
import { LoadingBackdrop } from '../../surfaces/LoadingBackdrop';
import Loading from '@mdi/svg/svg/loading.svg';
import { IconSize } from '../../../resources/SVGIcon';
import { Conditional } from '../../Conditional';
import { EmptyRoadmap } from '../../../models/Goal';

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
        <>
          <StyledRoadmapItemLink key={`sub-goal-link-${value.id}-${index}`} ratio={90} verticalSpacing={20} />
          <StyledSubGoalCard key={`sub-goal-${value.id}-${index}`}>
            <StyledSubGoalTitle>{value.text}</StyledSubGoalTitle>
          </StyledSubGoalCard>
        </>
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
