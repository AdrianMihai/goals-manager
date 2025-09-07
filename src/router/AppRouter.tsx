import { BrowserRouter, Route, Routes } from 'react-router';
import React from 'react';
import { LoginPage } from '../pages/login/LoginPage';
import { GoalsSection } from '../components/goals-section/GoalsSection';
import { PublicPageGuard } from './PublicPageGuard';
import { ProtectedPageGuard } from './ProtectedPageGuard';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <PublicPageGuard>
              <LoginPage />
            </PublicPageGuard>
          }
        />
        <Route
          path='/goals'
          element={
            <ProtectedPageGuard>
              <GoalsSection />
            </ProtectedPageGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
