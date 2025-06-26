import styled from '@emotion/styled';
import { GoalPriority } from '../../../models/Goal';
import { Row } from '../../layout/Row';

export const StyledGoalTitle = styled.h1`
  margin: 0;
  font-weight: 500;
`;

export const StyledGoalFooter = styled(Row)`
  width: 100%;
  padding-top: 16px;
  min-height: 34px;
`;

export const StyledDueDateText = styled.p`
  margin: 0;
  color: gray;
  font-weight: bold;
`;

type PriorityIndicatorProps = {
  priority: GoalPriority;
};

export const StyledPriorityIndicator = styled.div<PriorityIndicatorProps>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ priority }) => {
    if (priority === GoalPriority.Medium) {
      return '#FCBF38';
    }

    if (priority === GoalPriority.High) {
      return '#FF4640';
    }

    return '#6675FF';
  }};
`;
