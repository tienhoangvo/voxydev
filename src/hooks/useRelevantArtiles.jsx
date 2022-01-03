import useSWR from 'swr/immutable';

import { listRelevantArticlesByArticleId } from '../lib/sanity/queries/article';
import useArticle from './useArticle';
import SanityCDNReadClient from '../lib/sanity/clients/SanityCDNReadClient';

const sanityFetcher = (query) =>
  SanityCDNReadClient.fetch(query);

const getKey = ({ articleId, articleCategories }) =>
  articleId
    ? listRelevantArticlesByArticleId({
        articleId,
        articleCategories,
      })
    : null;

const useRelevantArticles = () => {
  const { article } = useArticle();

  const { data, error, mutate } = useSWR(
    getKey({
      articleId: article?._id,
      articleCategories: article?.categories.map(
        ({ _id }) => _id
      ),
    }),
    sanityFetcher
  );

  const loading = !data && !error;

  return {
    articles: data || [],
    loading,
    error,
    mutate,
  };
};

export default useRelevantArticles;
