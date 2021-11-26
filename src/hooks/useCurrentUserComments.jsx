import useSWR from 'swr/immutable';
import { useCallback, useMemo } from 'react';
import { sanityClientWithoutUseCdn } from '../lib/sanity/sanity.server';
import useCurrentUser from './useCurrentUser';
import { getCurrentUserComments } from '../lib/sanity/queries';

const fetcher = (query) =>
  sanityClientWithoutUseCdn.fetch(query);

const useCurrentUserComments = ({ articleId }) => {
  // list
  // add
  // delete

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

  const { data, error, mutate } = useSWR(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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
    comments,
    loading,
    error,
    addComment,
    deleteComment,
  };
};

export default useCurrentUserComments;
