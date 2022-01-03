import { getSession } from 'next-auth/react';

import useSWRImmutable from 'swr/immutable';

const fetcher = () => getSession();

const useCurrentUser = () => {
  const { data, error, mutate } = useSWRImmutable(
    '/api/auth/session',
    fetcher
  );

  return {
    currentUser: data,

    mutate,
    loading: !data && !error,
  };
};

export default useCurrentUser;
