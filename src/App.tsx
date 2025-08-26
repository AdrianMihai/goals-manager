import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { NotificationMessages } from './components/common-features/NotificationMessages';
import { GoalsSection } from './components/goals-section/GoalsSection';
import { LoginPage } from './pages/login/LoginPage';
import { ThemeValues } from './theme/ThemeValues';
import './types.d.ts';

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
