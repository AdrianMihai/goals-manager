import { DatePicker as ArkDatePicker, Portal } from '@ark-ui/react';
import React, { isValidElement, useMemo } from 'react';
import { DateField } from './DateField';
import { DaySelect } from './DaySelect';
import { MonthSelect } from './MonthSelect';
import { YearSelect } from './YearSelect';
import { StyledDateGridContent } from './StyledComponents';

export const DatePicker = ({ children, ...rest }: ArkDatePicker.RootProps) => {
  const field = useMemo(() => {
    if (isValidElement(children)) {
      return children;
    }

    return <DateField />;
  }, []);

  return (
    <ArkDatePicker.Root {...rest}>
      {field}
      <Portal>
        <ArkDatePicker.Positioner>
          <StyledDateGridContent>
            <DaySelect />
            <MonthSelect />
            <YearSelect />
          </StyledDateGridContent>
        </ArkDatePicker.Positioner>
      </Portal>
    </ArkDatePicker.Root>
  );
};
