import { Dialog as ArkDialog, Portal } from '@ark-ui/react';
import React from 'react';
import { StyledDialogBackdrop, StyledDialogPositioner } from './StyledComponents';

export const Dialog = (props: ArkDialog.RootProps) => {
  return (
    <ArkDialog.Root {...props}>
      <StyledDialogBackdrop onClick={() => props.onOpenChange({ open: false })} />
      <Portal>
        <StyledDialogPositioner>
          <ArkDialog.Content>{props.children}</ArkDialog.Content>
        </StyledDialogPositioner>
      </Portal>
    </ArkDialog.Root>
  );
};
