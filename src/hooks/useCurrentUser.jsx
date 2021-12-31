import { getSession } from 'next-auth/react';

import useSWRImmutable from 'swr/immutable';

const fetcher = () => getSession();

const getKey = () => '/api/auth/session';

const useCurrentUser = () => {
  const { data, error, mutate } = useSWRImmutable(
    '/api/auth/session',
    fetcher
  );

  console.log('useCurrentUser');

  console.log({ data, error });
  return {
    currentUser: data,

    mutate,
    loading: !data && !error,
  };
};

export default useCurrentUser;
