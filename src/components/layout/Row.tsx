import React from 'react';
import { CrossAxisAlignment, FlexWrap, MainAxisAlignment } from './Types';
import { StyledRow } from './StyledComponents';

type RowProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  wrap?: FlexWrap;
  stretchToFullHeight?: boolean;
};

export const Row = ({
  children,
  mainAxisAlignment = 'start',
  crossAxisAlignment = 'start',
  stretchToFullHeight = false,
  wrap = 'nowrap',
  ...rest
}: RowProps) => {
  return (
    <StyledRow
      mainAxisAlignment={mainAxisAlignment}
      crossAxisAlignment={crossAxisAlignment}
      stretchToFullHeight={stretchToFullHeight}
      wrap={wrap}
      {...rest}
    >
      {children}
    </StyledRow>
  );
};
