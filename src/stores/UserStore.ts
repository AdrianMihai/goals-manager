import { CurrentUser } from '../models/User';
import { createStore } from '../state/StoreBuilder';
import { isNullOrUndefined } from '../utils/ObjectUtils';

export type CurrentUserStore = {
  userData: CurrentUser | null;
};

export const UserStore = createStore<CurrentUserStore>(
  {
    userData: null,
  },
  {
    setCurrentUser: ({ draft }, userData) => {
      draft.userData = userData;
    },
  },
  {
    isAuthenticated: (data) => !isNullOrUndefined(data.userData),
  }
);
