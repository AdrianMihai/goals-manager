import { Field } from '@ark-ui/react';
import styled from '@emotion/styled';

export const StyledSelectSearchInput = styled(Field.Root)`
  & [data-part='input'] {
    box-sizing: border-box;
    padding: 4px;
    border: none;
    outline: none;

    &:focus {
      border: none;
    }
  }
`;
