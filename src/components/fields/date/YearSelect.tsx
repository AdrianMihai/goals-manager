import { DatePicker } from '@ark-ui/react';
import React from 'react';
import { Row } from '../../layout/Row';
import { StyledPickerNavigationButton } from './StyledComponents';
import { SVGIcon } from '../../../resources/SVGIcon';
import ArrowLeft from '@mdi/svg/svg/arrow-left.svg';
import ArrowRight from '@mdi/svg/svg/arrow-right.svg';

export const YearSelect = () => {
  return (
    <DatePicker.View view='year'>
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
                {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                  <DatePicker.TableRow key={id}>
                    {years.map((year, id) => (
                      <DatePicker.TableCell key={id} value={year.value}>
                        <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
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
