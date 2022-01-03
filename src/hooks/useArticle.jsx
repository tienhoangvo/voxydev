// @swr
import useSWR from 'swr/immutable';
import SanityCDNReadClient from '../lib/sanity/clients/SanityCDNReadClient';

// @src/lib/utils

import { getArticleDetailsBySlug } from '../lib/sanity/queries/article';
import useSlug from './useSlug';

const sanityFetcher = (query) =>
  SanityCDNReadClient.fetch(query);

const getKey = (slug) => getArticleDetailsBySlug({ slug });
const useArticle = () => {
  const slug = useSlug();

  const {
    data: article,
    error,
    mutate,
  } = useSWR(getKey(slug), sanityFetcher, {
    revalidateOnMount: false,
  });

  const loading = !article && !error;

  return { article, loading, error, mutate };
};

export default useArticle;
