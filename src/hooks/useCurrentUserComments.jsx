import useSWR from 'swr/immutable';
import { useCallback, useMemo } from 'react';

import useCurrentUser from './useCurrentUser';
import { getCurrentUserComments } from '../lib/sanity/queries/article';
import SanityCDNReadClient from '../lib/sanity/clients/SanityCDNReadClient';

const sanityFetcher = (query) =>
  SanityCDNReadClient.fetch(query);

const useCurrentUserComments = ({ articleId }) => {
  const { currentUser } = useCurrentUser();

  const currentUserId = useMemo(() => {
    if (!currentUser) return undefined;

    return currentUser._id;
  }, [currentUser]);

  const getKey = useCallback(() => {
    if (!currentUserId) return undefined;

    if (!articleId) return undefined;

    return getCurrentUserComments({
      articleId,
      currentUserId,
    });
  }, [currentUserId, articleId]);

  const { data, error, mutate } = useSWR(
    getKey,
    sanityFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const comments = useMemo(() => {
    if (!data) return [];

    return data;
  }, [data]);

  const loading = useMemo(
    () => !data && !error,
    [data, error]
  );

  const addComment = (comment) => {
    if (!comment) return;

    mutate((comments) => [comment, ...comments], false);
  };

  const deleteComment = (commentId) => {
    if (!commentId) return;

    if (!comments.length) return;

    console.log(comments, commentId);
    mutate(
      (comments) =>
        comments.filter(
          (comment) => comment._id !== commentId
        ),
      false
    );
  };

  return {
    comments: comments || [],
    loading,
    error,
    addComment,
    deleteComment,
  };
};

export default useCurrentUserComments;
