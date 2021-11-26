// @swr
import useSWR from 'swr';

// @src/lib/utils
import sanityFetcher from '../lib/sanity/fetcher';
import { getArticleBySlugQuery } from './../lib/sanity/queries';

const useArticle = ({ slug }) => {
  const {
    data: article,
    error,
    mutate,
  } = useSWR(getArticleBySlugQuery(slug), sanityFetcher);

  const loading = !article && !error;

  return { article, loading, error, mutate };
};

export default useArticle;
