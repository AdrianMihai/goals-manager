import { Goal } from '../../../models/Goal';
import { Row } from '../../layout/Row';
import { Card } from '../../surfaces/Card';
import React, { useCallback, useContext, useRef } from 'react';
import {
  StyledDueDateText,
  StyledGoalFooter,
  StyledGoalHeader,
  StyledGoalTitle,
  StyledPriorityIndicator,
} from './StyledComponents';
import { Spacer } from '../../layout/Spacer';
import { capitalize } from '../../../utils/StringUtils';
import { Conditional } from '../../Conditional';
import { PrioritySelect } from './PrioritySelect';
import { GoalsListContext } from '../GoalsListContext';
import { useTimedToggle } from '../../hooks/Common';
import { Roadmap } from './Roadmap';
import { Container } from '../../layout/Container';
import { GoalItemContext } from './GoalItemContext';
import { DatePicker } from '../../fields/date/DatePicker';
import { parseDate } from '@ark-ui/react';
import { ItemContextMenu } from './ItemContextMenu';

type GoalItemProps = {
  data: Goal;
};

export const GoalItem = ({ data }: GoalItemProps) => {
  const { isOn: isEditingActive, switchOn, delayedSwitchOff, switchOff } = useTimedToggle(false);
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

  const onDateChange = useCallback(
    (ev) => {
      updateGoal({
        ...data,
        dueBy: new Date(ev.valueAsString[0]).toISOString(),
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
    <GoalItemContext
      value={{
        goalData: data,
        isEditingActive,
        freezeEditMode,
        unFreezeEditMode,
        enableEditMode: switchOn,
        disableEditMode: switchOff,
      }}
    >
      <Container data-item-identifier={`goal-item-${data.id}`} onMouseLeave={closeEditingMode}>
        <Card>
          <StyledGoalHeader mainAxisAlignment='between'>
            <StyledGoalTitle>{data.text}</StyledGoalTitle>
            <ItemContextMenu />
          </StyledGoalHeader>
          <StyledGoalFooter mainAxisAlignment='between' crossAxisAlignment='center'>
            <Conditional when={!isEditingActive}>
              <Row>
                <StyledDueDateText>Due By:</StyledDueDateText>
                <Spacer size={10} />
                <StyledDueDateText>{!data.dueBy ? '— —' : new Date(data.dueBy).toLocaleDateString()}</StyledDueDateText>
              </Row>
            </Conditional>
            <Conditional when={isEditingActive}>
              <DatePicker value={data.dueBy && [parseDate(new Date(data.dueBy))]} onValueChange={onDateChange} />
            </Conditional>
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
