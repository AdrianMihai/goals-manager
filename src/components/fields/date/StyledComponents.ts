import { DatePicker } from '@ark-ui/react';
import { Button } from '../../buttons/Button';
import { StyledDecoratedTextInputWrapper } from '../StyledComponents';
import styled from '@emotion/styled';

export const StyledDatePickerFieldWrapper = styled(StyledDecoratedTextInputWrapper)`
  & [data-part='input'] {
    box-sizing: border-box;
    padding: 4px;
    border-radius: ${({ theme }) => theme.field.borderRadius};
    outline: none;
  }
`;

export const StyledTriggerButton = styled(Button)`
  border: none;
`;

export const StyledDateGridContent = styled(DatePicker.Content)`
  background: white;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grey.light};

  & [data-part='table-cell-trigger'] {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    min-width: 25px;
    min-height: 25px;
    border-radius: 4px;
    text-align: center;
    user-select: none;

    &:hover {
      background: ${({ theme }) => theme.colors.grey.veryLight};
    }

    &[data-focus] {
      background: ${({ theme }) => theme.colors.grey.lightAlternative};
      outline: none;
    }

    &[data-outside-range] {
      visibility: hidden;
    }

    &[data-selected] {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      font-weight: bold;
    }

    &[data-in-range]:not([data-selected]) {
      background: ${({ theme }) => theme.colors.secondary.main};
    }

    &[data-today] {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
    }

    &[data-unavailable] {
      text-decoration: line-through;
      opacity: 0.4;
    }

    &[data-disabled] {
      opacity: 0.4;
    }
  }
`;

export const StyledPickerNavigationButton = styled(Button)`
  border: none;
`;
