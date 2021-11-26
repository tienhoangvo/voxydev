import useSWR from 'swr/immutable';

import axiosFetcher from '../lib/utils/apiFetcher';

const getKey = () => '/api/users/me';

const useCurrentUser = () => {
  const { data, error, mutate } = useSWR(
    getKey,
    axiosFetcher,
    {
      shouldRetryOnError: false,
    }
  );

  const loading = !data && !error;

  return {
    currentUser: data || null,
    error,
    mutate,
    loading,
  };
};

export default useCurrentUser;
