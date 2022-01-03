// @swr
import useSWR from 'swr';

// react
import { useCallback, useMemo } from 'react';

// @src

import { listUserFavoriteArticles } from '../lib/sanity/queries/article';
import SanityCDNReadClient from '../lib/sanity/clients/SanityCDNReadClient';

const sanityFetcher = (query) =>
  SanityCDNReadClient.fetch(query);

const useCurrentUserFavoriteArticles = ({
  currentUserId = '',
}) => {
  console.log(
    'debug useCurrentUserFavoriteArticles',
    currentUserId
  );
  const getKey = useCallback(() => {
    return currentUserId
      ? listUserFavoriteArticles({
          currentUserId,
        })
      : null;
  }, [currentUserId]);
  const { data, error } = useSWR(getKey, sanityFetcher);

  const articles = useMemo(() => {
    if (!data) return [];

    return data.favoriteArticles;
  }, [data]);

  const loading = useMemo(() => {
    return !data && !error;
  });

  return { articles, error, loading };
};

export default useCurrentUserFavoriteArticles;
