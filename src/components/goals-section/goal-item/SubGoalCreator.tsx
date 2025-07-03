import React, { useCallback, useContext, useEffect, useState } from 'react';
import AddIcon from '@mdi/svg/svg/map-plus.svg';
import ArrowRightIcon from '@mdi/svg/svg/chevron-right-box-outline.svg';
import {
  StyledAddSubGoalButton,
  StyledNewRoadmapItemLink,
  StyledSubGoalConfirmButton,
  StyledSubGoalCreatorContainer,
  StyledSubGoalInput,
} from './StyledComponents';
import { Spacer } from '../../layout/Spacer';
import { IconSize, SVGIcon } from '../../../resources/SVGIcon';
import { Conditional } from '../../Conditional';
import { Field, FocusTrap } from '@ark-ui/react';
import { StyledDecoratedTextInputWrapper } from '../../fields/StyledComponents';
import { SubGoalsStore } from '../../../stores/GoalsStore';
import { GoalItemContext } from './GoalItemContext';

export const SubGoalCreator = () => {
  const [isAddingSubGoal, setIsAddingSubGoal] = useState(false);
  const [subGoalText, setGoalText] = useState('');
  const { goalData } = useContext(GoalItemContext);

  const onTextChange = useCallback((ev) => setGoalText(ev.target.value), []);
  const onGoalAdd = useCallback(() => {
    SubGoalsStore.dispatchAction(SubGoalsStore.events.addSubGoal, { goalId: goalData.id, text: subGoalText });
    setIsAddingSubGoal(false);
  }, [subGoalText, goalData.id]);

  useEffect(() => {
    if (isAddingSubGoal) return;

    setGoalText('');
  }, [isAddingSubGoal]);

  return (
    <>
      <StyledNewRoadmapItemLink ratio={90} verticalSpacing={20} />
      <StyledSubGoalCreatorContainer ratio={90}>
        <Conditional when={!isAddingSubGoal}>
          <StyledAddSubGoalButton onClick={() => setIsAddingSubGoal(true)}>
            <SVGIcon size={IconSize.Large}>
              <AddIcon />
            </SVGIcon>
            <Spacer size={8} />
            Add sub-goal
          </StyledAddSubGoalButton>
        </Conditional>
        <Conditional when={isAddingSubGoal}>
          <FocusTrap disabled={false}>
            <StyledSubGoalInput>
              <StyledDecoratedTextInputWrapper>
                <Field.Input placeholder='Set sub-goal' value={subGoalText} onChange={onTextChange} />
                <StyledSubGoalConfirmButton onClick={onGoalAdd}>
                  <SVGIcon>
                    <ArrowRightIcon />
                  </SVGIcon>
                </StyledSubGoalConfirmButton>
              </StyledDecoratedTextInputWrapper>
            </StyledSubGoalInput>
          </FocusTrap>
        </Conditional>
      </StyledSubGoalCreatorContainer>
    </>
  );
};
