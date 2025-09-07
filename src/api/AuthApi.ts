import { AppEvents, AppMediator } from '../events/AppMediator';
import { UserStore } from '../stores/UserStore';
import { ApiService, ResponseType } from './ApiService';

export const githubLogin = async (sessionCode: string) => {
  try {
    const result = await ApiService.get('/auth/github-login', {
      params: {
        code: sessionCode,
      },
    });
    const response = result.data;

    if (response.type === ResponseType.error) {
      AppMediator.publish(AppEvents.showNotificationMessage, {
        type: 'error',
        title: response.data,
      });

      return;
    }

    UserStore.dispatchAction(UserStore.events.setCurrentUser, response.data);

    return response.data;
  } catch (e) {
    AppMediator.publish(AppEvents.showNotificationMessage, {
      type: 'error',
      title: !e.response ? e.message : e.response.data || e.message,
    });
  }
};
