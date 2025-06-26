import { Goal } from '../../../models/Goal';
import { Row } from '../../layout/Row';
import { Card } from '../../surfaces/Card';
import React, { useCallback, useContext, useState } from 'react';
import { StyledDueDateText, StyledGoalFooter, StyledGoalTitle, StyledPriorityIndicator } from './StyledComponents';
import { Spacer } from '../../layout/Spacer';
import { capitalize } from '../../../utils/StringUtils';
import { Conditional } from '../../Conditional';
import { PrioritySelect } from './PrioritySelect';
import { GoalsListContext } from '../GoalsListContext';
import { useTimedToggle } from '../../hooks/Common';

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

  return (
    <Card onMouseEnter={switchOn} onMouseLeave={delayedSwitchOff}>
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
            <PrioritySelect data={data} onChange={onPriorityChange} />
          </Conditional>
        </Row>
      </StyledGoalFooter>
    </Card>
  );
};
