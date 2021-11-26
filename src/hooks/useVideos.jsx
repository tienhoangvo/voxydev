import { useMemo } from 'react';
// @swr/infininite
import useSWRInfinite from 'swr/infinite';

import sanityFetcher from '../lib/sanity/fetcher';

import { getVideosQuery } from '../lib/sanity/queries';

import { BLOG_INDEX_LIMIT } from '../constants';

const getPageQuery = (page) => {
  if (page < 0) return null;

  return getVideosQuery({
    start: BLOG_INDEX_LIMIT * (page - 1),
    end: page * BLOG_INDEX_LIMIT - 1,
  });
};

const getKey = (pageIndex, previousPageData) => {
  console.log({ pageIndex, previousPageData });
  if (previousPageData && !previousPageData.length)
    return null; // reached the end
  return getPageQuery(pageIndex + 1); // SWR key
};

const useVideos = ({ firstPageData = [] }) => {
  const { data, size, setSize, error } = useSWRInfinite(
    getKey,
    sanityFetcher,
    {
      fallbackData: [firstPageData],
    }
  );

  const videoPages = useMemo(() => data || [], [data]);

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
        data[data.length - 1]?.length < BLOG_INDEX_LIMIT),
    [data, isEmpty]
  );

  const isLoadingMore = useMemo(
    () =>
      isLoadingInitialData ||
      (size > 0 &&
        data &&
        typeof data[size - 1] === 'undefined'),
    [isLoadingInitialData, size, data]
  );

  const onLoadMore = () => {
    setSize(size + 1);
  };

  return {
    videoPages,
    isLoadingInitialData,
    isEmpty,
    isReachingEnd,
    isLoadingMore,
    error,
    onLoadMore,
  };
};

export default useVideos;
