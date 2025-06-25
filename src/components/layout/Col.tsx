import { StyledCol } from './StyledComponents';
import { CrossAxisAlignment, MainAxisAlignment } from './Types';
import React from 'react';

type ColProps = React.PropsWithChildren & {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  stretchToFullWidth?: boolean;
};

export const Col = ({
  children,
  mainAxisAlignment = 'start',
  crossAxisAlignment = 'start',
  stretchToFullWidth = false,
}: ColProps) => (
  <StyledCol
    mainAxisAlignment={mainAxisAlignment}
    crossAxisAlignment={crossAxisAlignment}
    stretchToFullWidth={stretchToFullWidth}
  >
    {children}
  </StyledCol>
);
