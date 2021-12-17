// @mui/material
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

// @src/hooks
import useCommentReplies from '../../../hooks/useCommentReplies';

// @src/components/
import ReplyList from '../../commentReplies/ReplyList/ReplyList';

const CommentReplies = ({
  commentId,
  commentUserId,
  articleId,
}) => {
  const { replies } = useCommentReplies({
    commentId,
  });

  console.log('commentUserId debug', commentUserId);

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'transparent',
      }}
    >
      <CardContent
        sx={{ p: (theme) => theme.spacing(0, 1, 0, 1) }}
      >
        <ReplyList
          replies={replies}
          commentUserId={commentUserId}
          articleId={articleId}
        />
      </CardContent>
    </Card>
  );
};

export default CommentReplies;
