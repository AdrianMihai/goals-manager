import React, { useCallback, useContext, useMemo, useState } from 'react';
import AddIcon from '@mdi/svg/svg/map-plus.svg';
import {
  StyledAddSubGoalButton,
  StyledAnalysisButton,
  StyledNewRoadmapItemLink,
  StyledSubGoalCreatorContainer,
} from './StyledComponents';
import { Spacer } from '../../layout/Spacer';
import { IconSize, SVGIcon } from '../../../resources/SVGIcon';
import { Conditional } from '../../Conditional';
import { SubGoalsStore } from '../../../stores/GoalsStore';
import { GoalItemContext } from './GoalItemContext';
import { Col } from '../../layout/Col';
import { Row } from '../../layout/Row';
import { SubGoalCreator } from './SubGoalCreator';
import ChartIcon from '@mdi/svg/svg/chart-scatter-plot.svg';
import { AppEvents, AppMediator } from '../../../events/AppMediator';
import { AnalysisPreview } from './AnalysisPreview';

export const SubGoalsActions = ({ subGoals, roadmapData }) => {
  const [isAddingSubGoal, setIsAddingSubGoal] = useState(false);
  const { goalData } = useContext(GoalItemContext);

  const onGoalAdd = useCallback(
    (subGoalText) => {
      SubGoalsStore.dispatchAction(SubGoalsStore.events.addSubGoal, { goalId: goalData.id, text: subGoalText });
      setIsAddingSubGoal(false);
    },
    [goalData.id]
  );

  const startAnalysis = useCallback(
    () => AppMediator.publish(AppEvents.analyzeRoadmap, { goalId: goalData.id }),
    [goalData.id]
  );

  const isAnalysisDisabled = useMemo(
    () => roadmapData.isAnalysisInProgress || subGoals.length === 0,
    [roadmapData.isAnalysisInProgress, subGoals]
  );

  return (
    <>
      <StyledNewRoadmapItemLink ratio={90} verticalSpacing={20} />
      <StyledSubGoalCreatorContainer ratio={90}>
        <Conditional when={!isAddingSubGoal}>
          <Col>
            <Row>
              <StyledAddSubGoalButton onClick={() => setIsAddingSubGoal(true)}>
                <SVGIcon size={IconSize.Large}>
                  <AddIcon />
                </SVGIcon>
                <Spacer size={8} />
                Add sub-goal
              </StyledAddSubGoalButton>
              <Spacer size={16} />
              <StyledAnalysisButton disabled={isAnalysisDisabled} onClick={startAnalysis}>
                <SVGIcon size={IconSize.Large}>
                  <ChartIcon />
                </SVGIcon>
                <Spacer size={8} />
                Analyze roadmap
              </StyledAnalysisButton>
              <Spacer size={16} />
              <AnalysisPreview analysisData={roadmapData} />
            </Row>
          </Col>
        </Conditional>
        <Conditional when={isAddingSubGoal}>
          <SubGoalCreator onGoalAdd={onGoalAdd} />
        </Conditional>
      </StyledSubGoalCreatorContainer>
    </>
  );
};
