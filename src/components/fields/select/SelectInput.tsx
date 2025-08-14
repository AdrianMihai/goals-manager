import { createListCollection, Portal, Select } from '@ark-ui/react';
import ArrowDropDown from '@mdi/svg/svg/menu-down.svg';
import React, { useCallback } from 'react';
import { SVGIcon } from '../../../resources/SVGIcon';
import { Conditional } from '../../Conditional';
import { Row } from '../../layout/Row';
import { StyledBasicSelectContent, StyledBasicSelectInput } from '../StyledComponents';
import { CollectionItem } from './Types';

type SelectInputProps = Omit<Select.RootProps<any>, 'collection'> & {
  data: any[];
  collectionItemResolver: (item: any) => CollectionItem;
  onContentItemRender?: (item: any) => React.ReactNode;
  onFieldValueRender?: (item: any) => React.ReactNode;
  placeholder?: string;
};

export const SelectInput = ({
  data,
  collectionItemResolver,
  onContentItemRender,
  onFieldValueRender,
  placeholder,
  value,
  multiple,
  ...rest
}: SelectInputProps) => {
  const options = createListCollection({ items: data.map((val) => collectionItemResolver(val)) });

  const mapOption = useCallback((val) => options.items.find((item) => item.value === val), [options]);

  const findFullData = useCallback(
    (item: CollectionItem) => {
      return data.find((fullData) => collectionItemResolver(fullData).value === item.value);
    },
    [data, collectionItemResolver]
  );

  return (
    <>
      <StyledBasicSelectInput collection={options} value={value} multiple={multiple} {...rest}>
        <Select.Control>
          <Select.Trigger>
            <Row mainAxisAlignment='between'>
              <Conditional when={!onFieldValueRender}>
                <Select.ValueText placeholder={placeholder} />
              </Conditional>
              {onFieldValueRender && onFieldValueRender(value[0] && findFullData(mapOption(value[0])))}
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
              {options.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  {!onContentItemRender ? item.label : onContentItemRender(findFullData(item))}
                </Select.Item>
              ))}
            </StyledBasicSelectContent>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </StyledBasicSelectInput>
    </>
  );
};
