import React from 'react';
import { StyledLoadingBackdrop } from './StyledComponents';

export const LoadingBackdrop = ({ children, className }: React.PropsWithChildren & { className?: string }) => {
  return <StyledLoadingBackdrop className={className}>{children}</StyledLoadingBackdrop>;
};
