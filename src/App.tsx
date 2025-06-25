import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { ThemeValues } from './theme/ThemeValues';
import { Container } from './components/layout/Container';
import { GoalsSection } from './components/goals-section/GoalsSection';
import './types.d.ts';

export const App = () => {
  return (
    <ThemeProvider theme={ThemeValues}>
      <Container ratio={60} verticalSpacing={32}>
        <GoalsSection />
      </Container>
    </ThemeProvider>
  );
};
