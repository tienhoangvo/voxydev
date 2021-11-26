// @mui/material
import Stack from '@mui/material/Stack';

import { useMemo } from 'react';

// @/src/components
import ReplyItem from '../ReplyItem/ReplyItem';

const ReplyList = ({
  replies,
  commentUserId,
  articleId,
}) => {
  const renderedReplyItems = useMemo(() => {
    return replies.map((reply) => (
      <ReplyItem
        reply={reply}
        key={reply._id}
        commentUserId={commentUserId}
        articleId={articleId}
      />
    ));
  }, [replies]);

  return <>{renderedReplyItems}</>;
};

export default ReplyList;
