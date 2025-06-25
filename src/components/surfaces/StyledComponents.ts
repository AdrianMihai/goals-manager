import styled from '@emotion/styled';
import { Container } from '../layout/Container';

export const StyledCard = styled(Container)`
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colors.grey.veryLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.veryLight};
  box-shadow: 0px 0px 10px 1px ${({ theme }) => theme.colors.grey.light};
  min-height: 50px;
`;
