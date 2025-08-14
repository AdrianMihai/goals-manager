import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { NotificationMessages } from './components/common-features/NotificationMessages';
import { GoalsSection } from './components/goals-section/GoalsSection';
import { Container } from './components/layout/Container';
import { ThemeValues } from './theme/ThemeValues';
import './types.d.ts';

export const App = () => {
  return (
    <ThemeProvider theme={ThemeValues}>
      <Container ratio={60} verticalSpacing={32}>
        <GoalsSection />
      </Container>
      <NotificationMessages />
    </ThemeProvider>
  );
};
