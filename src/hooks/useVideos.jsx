import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';

import SanityCDNReadClient from '../lib/sanity/clients/SanityCDNReadClient';

import { ARTICLE_PAGE_LIMIT } from '../lib/sanity/queries/constants';
import { listVideosOnPage } from '../lib/sanity/queries/video';

const sanityFetcher = (query) =>
  SanityCDNReadClient.fetch(query);

const getKey = (pageIndex, previousPageData) => {
  console.log({ pageIndex, previousPageData });
  if (previousPageData && !previousPageData.length)
    return null; // reached the end

  return listVideosOnPage({
    page: pageIndex + 1,
    limit: ARTICLE_PAGE_LIMIT,
  });
};

const useVideos = () => {
  const { fallbackData } = useSWRConfig();

  const { data, size, setSize, error } = useSWRInfinite(
    getKey,
    sanityFetcher,
    {
      fallbackData,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateFirstPage: false,
      revalidateIfStale: true,
    }
  );

  console.count('DATA');
  console.log('DATA', data);
  console.log('FALLBACK DATA', fallbackData);
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
        data[data.length - 1]?.length < ARTICLE_PAGE_LIMIT),
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
