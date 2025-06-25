import React from 'react';
import { CrossAxisAlignment, MainAxisAlignment } from './Types';
import { StyledRow } from './StyledComponents';

type RowProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  stretchToFullHeight?: boolean;
};

export const Row = ({
  children,
  mainAxisAlignment = 'start',
  crossAxisAlignment = 'start',
  stretchToFullHeight = false,
  ...rest
}: RowProps) => {
  return (
    <StyledRow
      mainAxisAlignment={mainAxisAlignment}
      crossAxisAlignment={crossAxisAlignment}
      stretchToFullHeight={stretchToFullHeight}
      {...rest}
    >
      {children}
    </StyledRow>
  );
};
