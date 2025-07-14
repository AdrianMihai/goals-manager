import { Dialog as ArkDialog } from '@ark-ui/react';
import React from 'react';

export const DialogBody = ({ children, ...rest }: ArkDialog.DescriptionProps) => (
  <ArkDialog.Description {...rest}>{children}</ArkDialog.Description>
);
