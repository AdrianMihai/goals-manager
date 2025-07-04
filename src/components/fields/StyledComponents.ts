import { Field, Select } from '@ark-ui/react';
import styled from '@emotion/styled';

export const StyledBasicTextFieldContainer = styled(Field.Root)`
  display: block;
  width: 100%;

  & [data-part='label'] {
    display: block;
    width: 100%;
  }

  & [data-part='input'] {
    box-sizing: border-box;
    padding: 4px;
    border-radius: ${({ theme }) => theme.field.borderRadius};
    border: ${({ theme }) => theme.field.defaultBorder};
    outline: none;

    &:focus {
      border: ${({ theme }) => theme.field.hoverBorder};
    }
  }

  & [data-part='helper-text'] {
    display: block;
    width: 100%;
  }
`;

export const StyledDecoratedTextInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  border: ${({ theme }) => theme.field.defaultBorder};

  &:focus-within {
    border: ${({ theme }) => theme.field.hoverBorder};
  }

  & [data-part='input'] {
    border: none;
    flex-grow: 1;
    flex-basis: 2;

    &:focus {
      border: none;
    }
  }
`;

export const StyledBasicSelectInput = styled(Select.Root)`
  & [data-part='trigger'] {
    min-width: 200px;
    background: transparent;
    padding: 6px 4px;
    border-radius: ${({ theme }) => theme.field.borderRadius};
    border: ${({ theme }) => theme.field.defaultBorder};
    outline: none;

    &:focus,
    &:active {
      border: ${({ theme }) => theme.field.hoverBorder};
    }
  }
`;

export const StyledBasicSelectContent = styled(Select.Content)`
  min-width: 200px;
  background: white;
  border: ${({ theme }) => theme.field.defaultBorder};

  & [data-part='item'] {
    &:hover {
      background-color: ${({ theme }) => theme.colors.grey.lightAlternative};
    }
  }
`;
