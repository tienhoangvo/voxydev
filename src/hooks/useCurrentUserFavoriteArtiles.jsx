// @swr
import useSWR from 'swr';

// react
import { useCallback, useMemo } from 'react';

// @src

import { sanityClientWithoutUseCdn } from '../lib/sanity/sanity.server';
import { getUserFavoriteArticles } from '../lib/sanity/queries';

const useCurrentUserFavoriteArticles = ({
  currentUserId = '',
}) => {
  const getKey = useCallback(() => {
    return currentUserId
      ? getUserFavoriteArticles({
          currentUserId,
        })
      : null;
  }, [currentUserId]);
  const { data, error } = useSWR(getKey, (query) =>
    sanityClientWithoutUseCdn.fetch(query)
  );

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
