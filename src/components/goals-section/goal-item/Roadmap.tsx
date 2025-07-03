import React, { useContext, useMemo } from 'react';
import { Container } from '../../layout/Container';
import { SubGoalCreator } from './SubGoalCreator';
import { StyledRoadmapItemLink, StyledSubGoalCard, StyledSubGoalTitle } from './StyledComponents';
import { Goal } from '../../../models/Goal';
import { useStore } from '../../../state/UseStore';
import { SubGoalsStore } from '../../../stores/GoalsStore';
import { GoalItemContext } from './GoalItemContext';
import { Conditional } from '../../Conditional';

export const Roadmap = () => {
  const [{ subGoals }] = useStore(SubGoalsStore);
  const { goalData } = useContext(GoalItemContext);

  const matchingSubGoals = useMemo(() => {
    return subGoals[goalData.id] || [];
  }, [subGoals, goalData.id]);

  return (
    <Container ratio={80} verticalSpacing={20}>
      {matchingSubGoals.map((value, index) => (
        <>
          <StyledRoadmapItemLink ratio={90} verticalSpacing={20} />
          <StyledSubGoalCard key={`sub-goal-${value.id}-${index}`}>
            <StyledSubGoalTitle>{value.text}</StyledSubGoalTitle>
          </StyledSubGoalCard>
        </>
      ))}

      <SubGoalCreator />
    </Container>
  );
};
