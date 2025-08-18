import styled from '@emotion/styled';
import { GoalPriority } from '../../../models/Goal';
import { Row } from '../../layout/Row';
import { Container } from '../../layout/Container';
import { Button } from '../../buttons/Button';
import { StyledBasicTextFieldContainer } from '../../fields/StyledComponents';
import { Card } from '../../surfaces/Card';
import { css, keyframes } from '@emotion/react';
import { SVGIcon } from '../../../resources/SVGIcon';

export const StyledItemWrapper = styled(Container)`
  position: relative;
`;

export const StyledGoalTitle = styled.h1`
  margin: 0;
  font-weight: 500;
`;

export const StyledGoalFooter = styled(Row)`
  width: 100%;
  padding-top: 16px;
  min-height: 34px;
`;

export const StyledDueDateText = styled.span`
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

export const StyledRoadmapWrapper = styled(Container)`
  position: relative;
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
  padding: 8px 4px;

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
  padding: 4px 8px;
`;

export const StyledAnalysisButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: whitesmoke;
  width: max-content;
  padding: 8px 4px;
  border: none;

  & path {
    fill: whitesmoke;
  }

  &:hover:not([disabled]) {
    background-color: ${({ theme }) => theme.colors.secondary.dark};
  }
`;

export const StyledAnalysisPreviewButton = styled(Button)`
  color: ${({ theme }) => theme.colors.primary};
  width: max-content;
  border: none;
`;

export const StyledAnalysisCloseButton = styled(Button)`
  border: none;
`;

export const StyledAnalysisTitle = styled.h2`
  margin: 0;
`;

const analysisLoadingAnimation = keyframes`
  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledAnalysisLoadingSpinner = styled(SVGIcon)`
  animation: ${analysisLoadingAnimation} linear 1s infinite;
  & > path {
    fill: white;
  }
`;

export const StyledGoalHeader = styled(Row)`
  width: 100%;
`;

export const StyledGoalItemButton = styled(Button)`
  border: none;
  width: 100%;
`;
