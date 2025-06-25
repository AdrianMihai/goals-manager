import React, { useMemo } from 'react';
import { ContainerProps } from './Types';
import { ContainerPadding, StyledBox } from './StyledComponents';

export const Container = ({
  children,
  ratio = 100,
  verticalSpacing = 0,
  horizontalSpacing = 0,
  ...rest
}: ContainerProps) => {
  const padding: ContainerPadding = useMemo(() => {
    const value: any = {};

    if (isNaN(Number(verticalSpacing))) {
      value.top = (verticalSpacing as any).top;
      value.bottom = (verticalSpacing as any).bottom;
    } else {
      value.top = verticalSpacing;
      value.bottom = verticalSpacing;
    }

    if (isNaN(Number(horizontalSpacing))) {
      value.left = (horizontalSpacing as any).left;
      value.right = (horizontalSpacing as any).right;
    } else {
      value.left = horizontalSpacing;
      value.right = horizontalSpacing;
    }

    return value;
  }, [verticalSpacing, horizontalSpacing]);

  return (
    <StyledBox ratio={ratio} padding={padding} {...rest}>
      {children}
    </StyledBox>
  );
};
