import { Toast } from '@ark-ui/react';
import styled from '@emotion/styled';
import { Button } from '../buttons/Button';

export const StyledMessageContainer = styled(Toast.Root)`
  display: block;
  translate: var(--x) var(--y);
  scale: var(--scale);
  z-index: var(--z-index);
  height: fit-content;
  opacity: var(--opacity);
  min-width: 200px;
  width: max-content;
  border-radius: 4px;
  will-change: translate, opacity, scale;
  transition: translate 400ms, scale 400ms, opacity 400ms, height 400ms, box-shadow 200ms;
  transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);

  &[data-paused] {
    opacity: 0.75;
  }

  &[data-state='closed'] {
    transition: translate 400ms, scale 400ms, opacity 200ms;
    transition-timing-function: cubic-bezier(0.06, 0.71, 0.55, 1);
  }

  color: ${({ theme }) => theme.colors.black.main};

  &[data-type='success'] {
    background: ${({ theme }) => theme.colors.green.light};
    border: 1px solid ${({ theme }) => theme.colors.green.main};
  }

  &[data-type='error'] {
    background: ${({ theme }) => theme.colors.red.light};
    border: 1px solid ${({ theme }) => theme.colors.red.dark};
  }
`;

export const StyledCloseButton = styled(Button)`
  padding: 0;
  border: none;

  &:hover:not([disabled]) {
    background: transparent;
  }
`;
