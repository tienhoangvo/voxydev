// @next
import { useRouter } from 'next/router';

// @swr
import useSWR from 'swr';

// @react
import { useCallback, useMemo } from 'react';

// @src/lib
import { sanityClientWithoutUseCdn } from '../lib/sanity/sanity.server';
import useCurrentUser from './useCurrentUser';

const useArticleHearts = ({ defaultHeartData }) => {
  const { query } = useRouter();
  const { currentUser } = useCurrentUser();
  const { slug } = query;

  const getKey = useCallback(() => {
    if (!slug) return undefined;
    if (!currentUser) return undefined;

    return `*[_type == "article" && slug.current == "${slug}"] [0] {
        _id,
         hearts,
         heartsQuantity,
        }`;
  }, [slug, currentUser]);

  const {
    data: heartData,
    error,
    mutate,
  } = useSWR(
    getKey,
    (query) => sanityClientWithoutUseCdn.fetch(query),
    { fallbackData: defaultHeartData }
  );

  const loading = useMemo(() => {
    return !heartData && !error;
  }, [heartData, error]);

  const mutateHeartData = useCallback(
    (newData) => {
      if (!currentUser) return;

      return mutate(newData, false);
    },
    [heartData, currentUser, mutate]
  );

  console.log(heartData, error, loading);

  const hearteStatus = useMemo(() => {
    if (!currentUser) return 'blocking';
    if (!heartData) return 'blocking';

    return heartData.hearts
      ? heartData.hearts.some(
          (heart) => heart._ref === currentUser._id
        )
        ? 'hearted'
        : 'ready'
      : 'ready';
  }, [heartData, currentUser]);

  return {
    hearteStatus,
    heartData,
    error,
    loading,
    mutateHeartData,
  };
};

export default useArticleHearts;
