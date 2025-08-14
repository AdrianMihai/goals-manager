import { DatePicker as ArkDatePicker, Portal } from '@ark-ui/react';
import React, { isValidElement, useCallback, useMemo, useState } from 'react';
import { DateField } from './DateField';
import { DaySelect } from './DaySelect';
import { MonthSelect } from './MonthSelect';
import { StyledDateGridContent } from './StyledComponents';
import { YearSelect } from './YearSelect';

type PickerViews = 'day' | 'month' | 'year';
type DatePickerProps = ArkDatePicker.RootProps & {
  views?: PickerViews[];
};

export const DatePicker = ({ children, views = [], ...rest }: DatePickerProps) => {
  const [view, setView] = useState(views.length === 0 ? 'day' : views[0]);

  const field = useMemo(() => {
    if (isValidElement(children)) {
      return children;
    }

    return <DateField />;
  }, []);

  const onViewChange = useCallback(
    (ev) => {
      setView((currentView) => {
        if (views.includes(ev.view)) return ev.view;

        const nextView = views.filter((val) => val !== ev.view && val !== currentView)[0];

        return nextView || currentView;
      });
    },
    [views]
  );

  return (
    <ArkDatePicker.Root {...rest} view={view} onViewChange={onViewChange}>
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
