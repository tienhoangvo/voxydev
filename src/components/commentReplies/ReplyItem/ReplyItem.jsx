// @mui/material
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';

// @mui/icons-material
import ReplyIcon from '@mui/icons-material/Reply';

// @react
import { useState } from 'react';

// @src/hooks
import useCurrentUser from '../../../hooks/useCurrentUser';

// @src/lib/utils
import timeAgoFormat from '../../../lib/utils/timeAgoFormat';

// @src/components
import CreateReplyForm from '../CreateReplyFrom/CreateReplyForm';
import DeleteReplyButton from '../DeleteReplyButton/DeleteReplyButton';

const ReplyItem = ({ reply, commentUserId, articleId }) => {
  const [createReplyExpaned, setCreateReplyExpanded] =
    useState(false);
  const { currentUser } = useCurrentUser();
  const onCreateReplyClick = () => {
    setCreateReplyExpanded(!createReplyExpaned);
  };

  const onCreateReplyCancel = () => {
    setCreateReplyExpanded(false);
  };

  console.log('commentUserId', commentUserId);

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
          p: (theme) => theme.spacing(1, 2, 0.5, 1),
          ['& .MuiCardHeader-avatar']: {
            marginRight: 1,
          },
        }}
        title={reply?.user?.name}
        avatar={
          <Avatar
            sx={{
              height: '1.5rem',
              width: '1.5rem',
            }}
            src={reply?.user?.avatar || '#'}
            alt={reply?.user?.name}
          />
        }
        subheader={timeAgoFormat(
          reply?.createdAt || new Date().toString()
        )}
        action={
          currentUser ? (
            currentUser._id === reply.user.ref._ref ? (
              <DeleteReplyButton
                replyId={reply._id}
                commentId={reply.comment._ref}
              />
            ) : undefined
          ) : undefined
        }
        titleTypographyProps={{
          fontSize: '0.7rem',
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
            fontSize: '12px',
          }}
        >
          {commentUserId ==
          reply.repliedToUser.ref._ref ? null : (
            <Chip
              component="span"
              label={`@${reply.repliedToUser.name}`}
              size="small"
              sx={{
                fontSize: '10px',
                mr: 1,
                fontWeight: 700,
              }}
            />
          )}

          <span>{reply?.content}</span>
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          p: (theme) => theme.spacing(0.5, 1, 1, 1),
        }}
      >
        <Button
          size="small"
          onClick={onCreateReplyClick}
          aria-expanded={createReplyExpaned}
          aria-label="show create reply form"
          startIcon={<ReplyIcon fontSize="small" />}
        >
          Reply
        </Button>
      </CardActions>

      <Collapse
        in={createReplyExpaned}
        timeout="auto"
        unmountOnExit
      >
        <CardContent
          sx={{
            p: (theme) => theme.spacing(0, 1, 0, 1),
          }}
        >
          <CreateReplyForm
            commentId={reply.comment._ref}
            repliedToUser={reply.user}
            onClose={onCreateReplyCancel}
            articleId={articleId}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ReplyItem;
