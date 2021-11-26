// @swr
import useSWR from 'swr';

// @src/lib/utils
import sanityFetcher from '../lib/sanity/fetcher';
import {
  getArticleBySlugQuery,
  getReleventArticlesByCategories,
} from './../lib/sanity/queries';
import useArticle from './useArticle';

const useRelevantArticles = ({ slug }) => {
  const { article } = useArticle({ slug });

  const {
    data: articles,
    error,
    mutate,
  } = useSWR(
    getReleventArticlesByCategories({
      slug,
      categories: article?.categories.map(({ _id }) => _id),
    }),
    sanityFetcher
  );

  const loading = !articles && !error;

  return {
    articles: articles || [],
    loading,
    error,
    mutate,
  };
};

export default useRelevantArticles;
