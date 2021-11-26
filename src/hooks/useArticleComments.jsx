// @swr
import useSWRInfinite from 'swr/infinite';

import {
  getOtherPeopleComments,
  getPaginationCommentsByArticleId,
} from '../lib/sanity/queries';

import {
  useMemo,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { sanityClientWithoutUseCdn } from '../lib/sanity/sanity.server';
import useCurrentUser from './useCurrentUser';

const COMMENTS_LIMIT = 6;
const useArticleComments = ({ articleId }) => {
  const { currentUser } = useCurrentUser();

  const currentUserId = useMemo(() => {
    if (!currentUser) return undefined;

    return currentUser._id;
  }, [currentUser]);

  const getKey = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length)
        return null;
      return getPaginationCommentsByArticleId({
        articleId,
        currentUserId,
        startIndex: COMMENTS_LIMIT * pageIndex,
        endIndex:
          COMMENTS_LIMIT * pageIndex + COMMENTS_LIMIT - 1,
      });
    },
    [articleId, currentUserId]
  );

  const { data, error, mutate, size, setSize } =
    useSWRInfinite(
      getKey,

      (query) => sanityClientWithoutUseCdn.fetch(query)
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
        data[data.length - 1]?.length < COMMENTS_LIMIT),
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
