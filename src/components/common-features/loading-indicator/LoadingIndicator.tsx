import { StyledSpinner } from './StyledComponents';
import React from 'react';
import Loading from '@mdi/svg/svg/loading.svg';
import { IconSize } from '../../../resources/SVGIcon';
import { LoadingBackdrop } from '../../surfaces/LoadingBackdrop';

export const LoadingIndicator = ({ className = '', spinnerSize = IconSize.VeryLarge }) => {
  return (
    <LoadingBackdrop className={className}>
      <StyledSpinner data-part='loading-spinner' size={spinnerSize}>
        <Loading />
      </StyledSpinner>
    </LoadingBackdrop>
  );
};
