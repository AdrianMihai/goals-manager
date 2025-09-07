import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { NotificationMessages } from './components/common-features/notifications/NotificationMessages';
import { ThemeValues } from './theme/ThemeValues';
import './types.d.ts';
import { AppRouter } from './router/AppRouter';

export const App = () => {
  return (
    <ThemeProvider theme={ThemeValues}>
      <AppRouter />
      <NotificationMessages />
    </ThemeProvider>
  );
};
