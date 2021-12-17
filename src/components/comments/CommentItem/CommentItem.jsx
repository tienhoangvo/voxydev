// @mui/material
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';

// @mui/icons-material
import ReplyIcon from '@mui/icons-material/Reply';

// @react
import { useState } from 'react';

// @src/lib/utils
import timeAgoFormat from '../../../lib/utils/timeAgoFormat';

// @src/components
import CommentReplies from '../CommentReplies/CommentReplies';
import CreateReplyForm from '../../commentReplies/CreateReplyFrom/CreateReplyForm';

// @src/hooks

const CommentItem = ({ comment }) => {
  const [repliesExpanded, setRepliesExpanded] =
    useState(false);

  const onRepliesClick = () => {
    setRepliesExpanded(!repliesExpanded);
  };

  const onRepliesClose = () => {
    setRepliesExpanded(false);
  };

  console.log('comment', comment.user.ref._ref);

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'transparent',

        borderRadius: 'unset',

        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <CardHeader
        sx={{
          p: (theme) => theme.spacing(1, 1, 0.5, 1),
          ['& .MuiCardHeader-avatar']: {
            mr: 1,
          },
        }}
        title={comment?.user?.name}
        avatar={
          <Avatar
            src={comment?.user?.avatar}
            alt={comment?.user?.name}
          />
        }
        subheader={timeAgoFormat(
          comment?.createdAt || new Date().toString()
        )}
        titleTypographyProps={{
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
        subheaderTypographyProps={{
          fontSize: '0.7rem',
        }}
      />

      <CardContent
        sx={{ p: (theme) => theme.spacing(0.5, 1, 0.5, 1) }}
      >
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-wrap',
            letterSpacing: 0,
            fontSize: '0.875rem',
          }}
        >
          {comment?.content}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          p: (theme) => theme.spacing(0.5, 1, 0.5, 1),
        }}
      >
        <Button
          startIcon={<ReplyIcon />}
          size="small"
          onClick={onRepliesClick}
          aria-expanded={repliesExpanded}
          aria-label="show replies"
        >
          View {comment.repliesQuantity} replies
        </Button>
      </CardActions>

      <Collapse
        in={repliesExpanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent
          sx={{ p: (theme) => theme.spacing(0, 1, 0, 1) }}
        >
          <CreateReplyForm
            commentId={comment._id}
            repliedToUser={comment.user}
            onClose={onRepliesClose}
            articleId={comment.article._ref}
          />
        </CardContent>
        <CommentReplies
          commentId={comment._id}
          commentUserId={comment.user.ref._ref}
          articleId={comment.article._ref}
        />
      </Collapse>
    </Card>
  );
};

export default CommentItem;
