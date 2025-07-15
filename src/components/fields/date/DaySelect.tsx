import { DatePicker } from '@ark-ui/react';
import React from 'react';
import { Row } from '../../layout/Row';
import { SVGIcon } from '../../../resources/SVGIcon';
import ArrowLeft from '@mdi/svg/svg/arrow-left.svg';
import ArrowRight from '@mdi/svg/svg/arrow-right.svg';
import { StyledPickerNavigationButton } from './StyledComponents';

export const DaySelect = () => {
  return (
    <DatePicker.View view='day'>
      <DatePicker.Context>
        {(datePicker) => (
          <>
            <DatePicker.ViewControl asChild>
              <Row mainAxisAlignment='between'>
                <DatePicker.PrevTrigger asChild>
                  <StyledPickerNavigationButton>
                    <SVGIcon>
                      <ArrowLeft />
                    </SVGIcon>
                  </StyledPickerNavigationButton>
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger asChild>
                  <StyledPickerNavigationButton>
                    <DatePicker.RangeText />
                  </StyledPickerNavigationButton>
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger asChild>
                  <StyledPickerNavigationButton>
                    <SVGIcon>
                      <ArrowRight />
                    </SVGIcon>
                  </StyledPickerNavigationButton>
                </DatePicker.NextTrigger>
              </Row>
            </DatePicker.ViewControl>
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  {datePicker.weekDays.map((weekDay, id) => (
                    <DatePicker.TableHeader key={id}>{weekDay.short}</DatePicker.TableHeader>
                  ))}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {datePicker.weeks.map((week, id) => (
                  <DatePicker.TableRow key={id}>
                    {week.map((day, id) => (
                      <DatePicker.TableCell key={id} value={day}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          </>
        )}
      </DatePicker.Context>
    </DatePicker.View>
  );
};
