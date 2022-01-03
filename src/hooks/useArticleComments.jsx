// @swr
import useSWRInfinite from 'swr/infinite';

import { useMemo, useCallback } from 'react';

import useCurrentUser from './useCurrentUser';
import { useSWRConfig } from 'swr';
import SanityCDNReadClient from './../lib/sanity/clients/SanityCDNReadClient';

import { COMMENT_PAGE_LIMIT } from './../lib/sanity/queries/constants';

import { getArticleCommentsOnPage } from '../lib/sanity/queries/article';
const sanityFetcher = (query) =>
  SanityCDNReadClient.fetch(query);
const useArticleComments = ({ articleId }) => {
  const { currentUser } = useCurrentUser();

  const { fallback } = useSWRConfig();

  const comments =
    fallback[
      getArticleCommentsOnPage({
        page: 1,
        limit: COMMENT_PAGE_LIMIT,
        articleId,
      })
    ];

  const currentUserId = useMemo(() => {
    if (!currentUser) return undefined;

    return currentUser._id;
  }, [currentUser]);

  const getKey = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length)
        return null;
      return getArticleCommentsOnPage({
        page: pageIndex + 1,
        limit: COMMENT_PAGE_LIMIT,
        articleId,
        currentUserId,
      });
    },
    [articleId, currentUserId]
  );

  const { data, error, mutate, size, setSize } =
    useSWRInfinite(
      getKey,

      sanityFetcher,

      {
        fallbackData: [comments],
        revalidateFirstPage: false,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnMount: false,
      }
    );

  const commentsPages = useMemo(() => data || [], [data]);

  const isLoadingInitialData = useMemo(
    () => !data && !error,
    [data, error]
  );

  const isEmpty = useMemo(
    () => data?.[0]?.length === 0,
    [data]
  );

  const isReachingEnd = useMemo(
    () =>
      isEmpty ||
      (data &&
        data[data.length - 1]?.length < COMMENT_PAGE_LIMIT),
    [isEmpty, data]
  );

  const isLoadingMore = useMemo(() => {
    return (
      isLoadingInitialData ||
      (size > 0 &&
        data &&
        typeof data[size - 1] === 'undefined')
    );
  }, [isLoadingInitialData, size, data]);

  return {
    commentsPages,
    error,
    mutate,
    size,
    setSize,
    isLoadingMore,
    isReachingEnd,
  };
};

export default useArticleComments;
