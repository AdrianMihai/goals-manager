import styled from '@emotion/styled';
import { Container } from '../layout/Container';

export const StyledCard = styled(Container)`
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colors.grey.veryLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.veryLight};
  box-shadow: 0px 0px 10px 1px ${({ theme }) => theme.colors.grey.light};
  min-height: 50px;
`;

export const StyledLoadingBackdrop = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

export const StyledContextMenuContent = styled(Container)`
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 1px ${({ theme }) => theme.colors.grey.light};
`;
