import { parseDate } from '@ark-ui/react';
import React, { useCallback, useContext, useRef } from 'react';
import { Goal } from '../../../models/Goal';
import { capitalize } from '../../../utils/StringUtils';
import { Conditional } from '../../Conditional';
import { DatePicker } from '../../fields/date/DatePicker';
import { useTimedToggle } from '../../hooks/Common';
import { Container } from '../../layout/Container';
import { Row } from '../../layout/Row';
import { Spacer } from '../../layout/Spacer';
import { Card } from '../../surfaces/Card';
import { GoalsListContext } from '../GoalsListContext';
import { GoalItemContext } from './GoalItemContext';
import { ItemContextMenu } from './ItemContextMenu';
import { PrioritySelect } from './PrioritySelect';
import { Roadmap } from './Roadmap';
import {
  StyledDueDateText,
  StyledGoalFooter,
  StyledGoalHeader,
  StyledGoalTitle,
  StyledItemWrapper,
  StyledPriorityIndicator,
} from './StyledComponents';
import { AnalysisPreview } from './AnalysisPreview';

type GoalItemProps = {
  data: Goal;
};

export const GoalItem = ({ data }: GoalItemProps) => {
  const { isOn: isEditingActive, switchOn, delayedSwitchOff, switchOff, cancelTimeout } = useTimedToggle(false, 1500);
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
      <StyledItemWrapper
        data-item-identifier={`goal-item-${data.id}`}
        onMouseEnter={cancelTimeout}
        onMouseLeave={closeEditingMode}
      >
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
        <AnalysisPreview />
      </StyledItemWrapper>
    </GoalItemContext>
  );
};
