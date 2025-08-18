import { StyledCol } from './StyledComponents';
import { CrossAxisAlignment, FlexWrap, MainAxisAlignment } from './Types';
import React from 'react';

type ColProps = React.PropsWithChildren & {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  wrap?: FlexWrap;
  stretchToFullWidth?: boolean;
};

export const Col = ({
  children,
  mainAxisAlignment = 'start',
  crossAxisAlignment = 'start',
  wrap = 'nowrap',
  stretchToFullWidth = false,
}: ColProps) => (
  <StyledCol
    mainAxisAlignment={mainAxisAlignment}
    crossAxisAlignment={crossAxisAlignment}
    wrap={wrap}
    stretchToFullWidth={stretchToFullWidth}
  >
    {children}
  </StyledCol>
);
