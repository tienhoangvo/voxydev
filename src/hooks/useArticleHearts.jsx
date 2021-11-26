// @next
import { useRouter } from 'next/router';

// @swr
import useSWR from 'swr';

// @react
import { useCallback, useMemo } from 'react';

// @src/lib
import { sanityClientWithoutUseCdn } from '../lib/sanity/sanity.server';

const useArticleHearts = () => {
  const { query } = useRouter();
  const { slug } = query;

  const getKey = useCallback(() => {
    if (!slug) return undefined;
    return `*[_type == "article" && slug.current == "${slug}"] [0] {
        _id,
         hearts,
         heartsQuantity,
        }`;
  }, [slug]);
  const {
    data: heartData,
    error,
    mutate,
  } = useSWR(getKey, (query) =>
    sanityClientWithoutUseCdn.fetch(query)
  );

  const loading = useMemo(() => {
    return !heartData && !error;
  }, [heartData, error]);

  console.log(heartData, error, loading);

  return {
    heartData,
    error,
    loading,
    mutate,
  };
};

export default useArticleHearts;
