import { Field } from '@ark-ui/react';
import styled from '@emotion/styled';

export const StyledBasicTextFieldContainer = styled(Field.Root)`
  display: block;
  width: 100%;

  & [data-part='label'] {
    display: block;
    width: 100%;
  }

  & [data-part='input'] {
    padding: 4px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.grey.veryLight};
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.orange.veryLight};
    }
  }

  & [data-part='helper-text'] {
    display: block;
    width: 100%;
  }
`;
