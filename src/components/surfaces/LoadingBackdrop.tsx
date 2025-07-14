import React from 'react';
import { StyledLoadingBackdrop } from './StyledComponents';

export const LoadingBackdrop = ({ children }: React.PropsWithChildren) => {
  return <StyledLoadingBackdrop>{children}</StyledLoadingBackdrop>;
};
