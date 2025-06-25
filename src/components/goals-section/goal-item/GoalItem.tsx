import { Goal } from '../../../models/Goal';
import { Row } from '../../layout/Row';
import { Card } from '../../surfaces/Card';
import React from 'react';
import { StyledDueDateText, StyledGoalFooter, StyledGoalTitle, StyledPriorityIndicator } from './StyledComponents';
import { Spacer } from '../../layout/Spacer';
import { capitalize } from '../../../utils/StringUtils';

type GoalItemProps = {
  data: Goal;
};

export const GoalItem = ({ data }: GoalItemProps) => {
  return (
    <Card>
      <StyledGoalTitle>{data.text}</StyledGoalTitle>
      <StyledGoalFooter mainAxisAlignment='between'>
        <StyledDueDateText>
          Due By:
          <Spacer size={10} />
          {!data.dueBy ? '— —' : data.dueBy}
        </StyledDueDateText>
        <Row crossAxisAlignment='center'>
          <StyledPriorityIndicator priority={data.priority} />
          <Spacer size={5} />
          {capitalize(data.priority)}
          <Spacer size={10} />
        </Row>
      </StyledGoalFooter>
    </Card>
  );
};
