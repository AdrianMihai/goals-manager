import { DatePicker } from '@ark-ui/react';
import React from 'react';
import { SVGIcon } from '../../../resources/SVGIcon';
import Calendar from '@mdi/svg/svg/calendar-outline.svg';
import { StyledDatePickerFieldWrapper, StyledTriggerButton } from './StyledComponents';

export const DateField = () => {
  return (
    <DatePicker.Control asChild>
      <StyledDatePickerFieldWrapper>
        <DatePicker.Input />
        <DatePicker.Trigger asChild>
          <StyledTriggerButton>
            <SVGIcon>
              <Calendar />
            </SVGIcon>
          </StyledTriggerButton>
        </DatePicker.Trigger>
      </StyledDatePickerFieldWrapper>
    </DatePicker.Control>
  );
};
