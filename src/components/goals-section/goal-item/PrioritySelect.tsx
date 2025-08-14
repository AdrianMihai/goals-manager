import { Select } from '@ark-ui/react';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { GoalPriority } from '../../../models/Goal';
import { mapValuesOnly } from '../../../utils/ObjectUtils';
import { SelectInput } from '../../fields/select/SelectInput';
import { Container } from '../../layout/Container';
import { Row } from '../../layout/Row';
import { Spacer } from '../../layout/Spacer';
import { GoalItemContext } from './GoalItemContext';
import { StyledPriorityIndicator } from './StyledComponents';

type SelectProps = {
  onChange: (value: GoalPriority) => void;
};

const fieldValueRenderer = ({ value }) => {
  return (
    <Row>
      <StyledPriorityIndicator priority={value} />
      <Spacer size={8} />
      <Select.ValueText />
    </Row>
  );
};

const onContentItemRender = ({ priorityName, value }): React.ReactNode => {
  return (
    <Container verticalSpacing={10} horizontalSpacing={8}>
      <Row crossAxisAlignment='center'>
        <StyledPriorityIndicator priority={value} />
        <Spacer size={8} />
        {priorityName}
      </Row>
    </Container>
  );
};

const collectionItemResolver = ({ priorityName, value }) => ({ label: priorityName, value });

export const PrioritySelect = ({ onChange }: SelectProps) => {
  const { goalData } = useContext(GoalItemContext);
  const [value, setValue] = useState(goalData.priority);

  const onValueChange = useCallback(({ value: newValue }) => {
    setValue(newValue[0]);
    onChange(newValue[0]);
  }, []);

  const items = useMemo(
    () =>
      Object.entries(mapValuesOnly(GoalPriority)).map(([key, priorityValue]) => ({
        priorityName: key,
        value: priorityValue as GoalPriority,
      })),
    []
  );

  return (
    <SelectInput
      collectionItemResolver={collectionItemResolver}
      onFieldValueRender={fieldValueRenderer}
      onContentItemRender={onContentItemRender}
      data={items}
      value={[value]}
      onValueChange={onValueChange}
    />
  );
};
