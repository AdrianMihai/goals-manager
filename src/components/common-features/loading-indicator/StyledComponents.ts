import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { SVGIcon } from '../../../resources/SVGIcon';

const spinAnimation = keyframes`
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

export const StyledSpinner = styled(SVGIcon)`
  animation: ${spinAnimation} linear 1s infinite;
  & > path {
    fill: ${({ theme }) => theme.colors.blue.main};
  }
`;
