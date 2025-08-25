import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { NotificationMessages } from './components/common-features/NotificationMessages';
import { GoalsSection } from './components/goals-section/GoalsSection';
import { ThemeValues } from './theme/ThemeValues';
import './types.d.ts';
import { BrowserRouter, Route, Routes } from 'react-router';
import { LoginPage } from './components/pages/login/LoginPage';

export const App = () => {
  return (
    <ThemeProvider theme={ThemeValues}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/goals' element={<GoalsSection />} />
        </Routes>
      </BrowserRouter>
      <NotificationMessages />
    </ThemeProvider>
  );
};
