import { Navigate } from 'react-router';
import { Conditional } from '../components/Conditional';
import { useStore } from '../state/UseStore';
import { CurrentUserStore, UserStore } from '../stores/UserStore';
import React from 'react';

const currentUserComparer = (prev, next) => prev.userData !== next.userData;

export const ProtectedPageGuard = ({ children }) => {
  useStore<CurrentUserStore>(UserStore, currentUserComparer);

  return (
    <>
      <Conditional when={!UserStore.queries.isAuthenticated()}>
        <Navigate to='/' />
      </Conditional>
      <Conditional when={UserStore.queries.isAuthenticated()}>{children}</Conditional>
    </>
  );
};
