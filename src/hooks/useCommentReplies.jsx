import useSWR from 'swr/immutable';
import { useMemo, useCallback } from 'react';

import SanityCDNReadClient from './../lib/sanity/clients/SanityCDNReadClient';
import { listRepliesByCommentId } from '../lib/sanity/queries/articleComment';

const sanityFetcher = (query) =>
  SanityCDNReadClient.fetch(query);

const useCommentReplies = ({ commentId }) => {
  const getKey = useCallback(() => {
    if (!commentId) return undefined;

    return listRepliesByCommentId({ commentId });
  }, [commentId]);

  const { data, error, mutate } = useSWR(
    getKey,
    sanityFetcher
  );

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
