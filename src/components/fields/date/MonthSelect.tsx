import { DatePicker } from '@ark-ui/react';
import React from 'react';
import { Row } from '../../layout/Row';
import { StyledPickerNavigationButton } from './StyledComponents';
import { SVGIcon } from '../../../resources/SVGIcon';
import ArrowLeft from '@mdi/svg/svg/arrow-left.svg';
import ArrowRight from '@mdi/svg/svg/arrow-right.svg';

export const MonthSelect = () => {
  return (
    <DatePicker.View view='month'>
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
              <DatePicker.TableBody>
                {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, id) => (
                  <DatePicker.TableRow key={id}>
                    {months.map((month, id) => (
                      <DatePicker.TableCell key={id} value={month.value}>
                        <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
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
