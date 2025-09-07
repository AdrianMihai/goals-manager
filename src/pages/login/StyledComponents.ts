import styled from '@emotion/styled';
import { Button } from '../../components/buttons/Button';

export const StyledAppTitle = styled.h1`
  margin: 0 0 70px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StyledGithubLoginTrigger = styled(Button)`
  font-size: 16px;
`;
