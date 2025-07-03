import styled from '@emotion/styled';
import { GoalPriority } from '../../../models/Goal';
import { Row } from '../../layout/Row';
import { Container } from '../../layout/Container';
import { Button } from '../../buttons/Button';
import { StyledBasicTextFieldContainer } from '../../fields/StyledComponents';
import { Card } from '../../surfaces/Card';
import { css } from '@emotion/react';

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

const ItemsLinkIndent = '3%';

export const StyledRoadmapItemLink = styled(Container)`
  margin: 10px 0;
  position: relative;
  left: ${ItemsLinkIndent};
  border: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.grey.light};
`;

export const StyledNewRoadmapItemLink = styled(StyledRoadmapItemLink)`
  border-style: dashed;
`;

export const StyledSubGoalCreatorContainer = styled(Container)`
  margin: 0;
  position: relative;
  left: calc(${ItemsLinkIndent} - 12px);
`;

export const StyledAddSubGoalButton = styled(Button)`
  border: none;
  width: max-content;
  padding: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey.veryLight};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.grey.light};
  }
`;

export const StyledSubGoalInput = styled(StyledBasicTextFieldContainer)`
  & [data-part='input'] {
    height: 28px;
  }
`;

export const StyledSubGoalCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.blue.light};
`;

export const StyledSubGoalTitle = styled.h3`
  margin: 0;
  font-weight: 500;
`;

export const StyledSubGoalConfirmButton = styled(Button)`
  border: none;
  padding: 4px;
`;
