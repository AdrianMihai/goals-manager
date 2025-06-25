import styled from '@emotion/styled';
import { PrimaryButton } from '../buttons/StyledComponents';
import { StyledBasicTextFieldContainer } from '../fields/StyledComponents';

export const StyledPrimaryButton = styled(PrimaryButton)`
  flex-basis: 200px;
  flex-grow: 1;
  justify-content: center;

  &:hover:not(disabled) {
    background: ${({ theme }) => theme.colors.orange.main};
  }
`;

export const StyledField = styled(StyledBasicTextFieldContainer)`
  & [data-part='input'] {
    width: 90%;
    height: 32px;
    font-size: 1.2em;
  }
`;
