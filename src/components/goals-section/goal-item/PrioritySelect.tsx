import { createListCollection, Portal, Select } from '@ark-ui/react';
import { Goal, GoalPriority } from '../../../models/Goal';
import { mapValuesOnly } from '../../../utils/ObjectUtils';
import React, { useCallback, useMemo, useState } from 'react';
import ArrowDropDown from '@mdi/svg/svg/menu-down.svg';
import { StyledPriorityIndicator } from './StyledComponents';
import { SVGIcon } from '../../../resources/SVGIcon';
import { Spacer } from '../../layout/Spacer';
import { Row } from '../../layout/Row';
import { StyledBasicSelectContent, StyledBasicSelectInput } from '../../fields/StyledComponents';
import { Container } from '../../layout/Container';
import CheckedIcon from '@mdi/svg/svg/check-bold.svg';

type SelectProps = {
  data: Goal;
  onChange: (value: GoalPriority) => void;
};

export const PrioritySelect = ({ data, onChange }: SelectProps) => {
  const [value, setValue] = useState(data.priority);

  const onValueChange = useCallback(({ value: newValue }) => {
    setValue(newValue[0]);
    onChange(newValue[0]);
  }, []);

  const items = useMemo(
    () =>
      Object.entries(mapValuesOnly(GoalPriority)).map(([key, priorityValue]) => ({
        label: key,
        value: priorityValue as GoalPriority,
      })),
    [data]
  );

  const selectItems = createListCollection({ items });

  return (
    <StyledBasicSelectInput value={[value]} onValueChange={onValueChange} collection={selectItems}>
      <Select.Control>
        <Select.Trigger>
          <Row mainAxisAlignment='between'>
            <Row>
              <StyledPriorityIndicator priority={value} />
              <Spacer size={8} />
              <Select.ValueText />
            </Row>
            <Select.Indicator>
              <SVGIcon>
                <ArrowDropDown />
              </SVGIcon>
            </Select.Indicator>
          </Row>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <StyledBasicSelectContent>
            {selectItems.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Container verticalSpacing={10} horizontalSpacing={8}>
                  <Row mainAxisAlignment='between' crossAxisAlignment='center'>
                    <Select.ItemText>
                      <Row crossAxisAlignment='center'>
                        <StyledPriorityIndicator priority={item.value} />
                        <Spacer size={8} />
                        {item.label}
                      </Row>
                    </Select.ItemText>
                    <Spacer size={50} />
                    <Select.ItemIndicator>
                      <SVGIcon>
                        <CheckedIcon />
                      </SVGIcon>
                    </Select.ItemIndicator>
                  </Row>
                </Container>
              </Select.Item>
            ))}
          </StyledBasicSelectContent>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </StyledBasicSelectInput>
  );
};
