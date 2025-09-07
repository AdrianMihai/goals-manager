import { useCallback } from 'react';
import { ApiService } from '../../api/ApiService';
import { UserStore } from '../../stores/UserStore';

export const useNativeAuthentication = () => {
  return useCallback(async () => {
    try {
      const response = (await ApiService.get('/auth/me')).data;

      UserStore.dispatchAction(UserStore.events.setCurrentUser, response.data);
    } catch (e) {}
  }, []);
};
