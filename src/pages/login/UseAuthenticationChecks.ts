import { useCallback, useEffect, useState } from 'react';
import { useNativeAuthentication } from './UseNativeAuthentication';
import { useGithubAuthentication } from './UseGithubAuthentication';
import { UserStore } from '../../stores/UserStore';

const isUserAuthenticated = () => UserStore.queries.isAuthenticated();

export const useAuthenticationChecks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nativeAuthentication = useNativeAuthentication();
  const githubAuthentication = useGithubAuthentication();

  const runAuthenticationChain = useCallback(async () => {
    const chain = [nativeAuthentication, githubAuthentication];

    setIsLoading(true);

    for (const authHandler of chain) {
      await authHandler();

      if (isUserAuthenticated()) break;
    }

    setIsLoading(false);
  }, [nativeAuthentication, githubAuthentication]);

  useEffect(() => {
    if (isUserAuthenticated()) return;

    runAuthenticationChain();
  }, [runAuthenticationChain]);

  return { isLoading };
};
