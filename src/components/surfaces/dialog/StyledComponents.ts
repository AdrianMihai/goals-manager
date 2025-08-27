import { Dialog } from '@ark-ui/react';
import styled from '@emotion/styled';
import { Container } from '../../layout/Container';

export const StyledDialogPositioner = styled(Dialog.Positioner)`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 30%;
  max-height: 90vh;
  background-color: whitesmoke;
  transform: translate(-50%, -50%);
  z-index: 9999;

  & [data-part='content'] {
    height: 100%;
  }

  & [data-part='description'] {
    max-height: calc(90vh - 200px);
    overflow-y: auto;
  }
`;

export const StyledDialogBackdrop = styled(Dialog.Backdrop)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
`;

export const StyledDialogFooter = styled(Container)`
  border-top: 1px solid ${({ theme }) => theme.colors.grey.light};
`;

export const StyledDialogHeader = styled(Container)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.light};
`;
