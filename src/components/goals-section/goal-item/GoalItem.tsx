import { Goal } from '../../../models/Goal';
import { Row } from '../../layout/Row';
import { Card } from '../../surfaces/Card';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { StyledDueDateText, StyledGoalFooter, StyledGoalTitle, StyledPriorityIndicator } from './StyledComponents';
import { Spacer } from '../../layout/Spacer';
import { capitalize } from '../../../utils/StringUtils';
import { Conditional } from '../../Conditional';
import { PrioritySelect } from './PrioritySelect';
import { GoalsListContext } from '../GoalsListContext';
import { useTimedToggle } from '../../hooks/Common';
import { Roadmap } from './Roadmap';
import { Container } from '../../layout/Container';
import { GoalItemContext } from './GoalItemContext';

type GoalItemProps = {
  data: Goal;
};

export const GoalItem = ({ data }: GoalItemProps) => {
  const { isOn: isEditingActive, switchOn, delayedSwitchOff } = useTimedToggle(false);
  const { updateGoal } = useContext(GoalsListContext);

  const onPriorityChange = useCallback(
    (newPriority) => {
      updateGoal({
        ...data,
        priority: newPriority,
      });
    },
    [updateGoal, data]
  );

  const isEditingModeFrozen = useRef(false);

  const freezeEditMode = useCallback(() => {
    isEditingModeFrozen.current = true;
  }, []);

  const unFreezeEditMode = useCallback(() => {
    isEditingModeFrozen.current = false;
  }, []);

  const closeEditingMode = useCallback(() => {
    if (isEditingModeFrozen.current) return;

    delayedSwitchOff();
  }, [delayedSwitchOff]);

  return (
    <GoalItemContext value={{ goalData: data, freezeEditMode, unFreezeEditMode }}>
      <Container onMouseEnter={switchOn} onMouseLeave={closeEditingMode}>
        <Card>
          <StyledGoalTitle>{data.text}</StyledGoalTitle>
          <StyledGoalFooter mainAxisAlignment='between' crossAxisAlignment='center'>
            <StyledDueDateText>
              Due By:
              <Spacer size={10} />
              {!data.dueBy ? '— —' : data.dueBy}
            </StyledDueDateText>
            <Row crossAxisAlignment='center'>
              <Conditional when={!isEditingActive}>
                <StyledPriorityIndicator priority={data.priority} />
                <Spacer size={5} />
                {capitalize(data.priority)}
                <Spacer size={10} />
              </Conditional>
              <Conditional when={isEditingActive}>
                <PrioritySelect onChange={onPriorityChange} />
              </Conditional>
            </Row>
          </StyledGoalFooter>
        </Card>
        <Conditional when={isEditingActive}>
          <Roadmap />
        </Conditional>
      </Container>
    </GoalItemContext>
  );
};
