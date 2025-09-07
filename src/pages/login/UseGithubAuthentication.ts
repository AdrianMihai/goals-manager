import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { isNullOrUndefined } from '../../utils/ObjectUtils';
import { githubLogin } from '../../api/AuthApi';

export const useGithubAuthentication = () => {
  const [queryParams] = useSearchParams();

  return useCallback(() => {
    const sessionCode = queryParams.get('code');

    if (isNullOrUndefined(sessionCode)) return;

    return githubLogin(sessionCode);
  }, [queryParams]);
};
