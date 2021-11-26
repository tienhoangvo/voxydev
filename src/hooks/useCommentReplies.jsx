import useSWR from 'swr/immutable';
import { useMemo, useCallback } from 'react';

import { getRepliesByCommentId } from '../lib/sanity/queries';
import { sanityClientWithoutUseCdn } from '../lib/sanity/sanity.server';

const fetcher = (query) =>
  sanityClientWithoutUseCdn.fetch(query);

const useCommentReplies = ({ commentId }) => {
  const getKey = useCallback(() => {
    if (!commentId) return undefined;

    return getRepliesByCommentId({ commentId });
  }, [commentId]);

  const { data, error, mutate } = useSWR(getKey, fetcher, {
    revalidateIfStale: false,
  });

  const replies = useMemo(() => data || [], [data]);

  const loading = useMemo(
    () => !data && !error,
    [data, error]
  );

  const addReply = (reply) => {
    mutate((replies) => [reply, ...replies], false);
  };

  const deleteReply = (replyId) => {
    if (!replyId) return;

    if (!replies.length) return;

    mutate(
      (replies) =>
        replies.filter((reply) => reply._id !== replyId),
      false
    );
  };

  return {
    replies,
    error,
    loading,
    deleteReply,
    addReply,
  };
};

export default useCommentReplies;
