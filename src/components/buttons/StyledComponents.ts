import styled from '@emotion/styled';

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  font-family: inherit;
  background: transparent;
  border-radius: 4px;
  border: none;
  padding: 10px 5px;
  color: ${({ theme }) => theme.colors.black.main};
  border: 1px solid ${({ theme }) => theme.colors.grey.light};

  transition: background 0.25s ease-in-out;

  &:not([disabled]) {
    cursor: pointer;
  }

  &[disabled] {
    opacity: 0.85;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(StyledButton)`
  background: ${({ theme }) => theme.colors.primary};
`;
