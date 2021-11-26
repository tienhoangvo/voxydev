//@mui/icons-material
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// @mui/material
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

//@axios
import axios from 'axios';

import { useState } from 'react';
import useCommentReplies from '../../../hooks/useCommentReplies';

const DeleteReplyButton = ({ replyId, commentId }) => {
  const [deleteStatus, setDeleteStatus] = useState('idle');

  const { deleteReply } = useCommentReplies({ commentId });

  const onReplyDeleteClick = () => {
    setDeleteStatus('pending');
    axios
      .delete(
        `/api/comments/${commentId}/replies?replyId=${replyId}`
      )
      .then((res) => {
        setDeleteStatus('success');
        deleteReply(replyId);
      })
      .catch((err) => {
        console.log('💥💥💥 DELETE REPLY ERROR!');
        console.error(err);
        console.dir(err);
        setDeleteStatus('error');
      });
  };

  return (
    <Tooltip title="Delete this reply">
      <IconButton
        disabled={deleteStatus === 'pending'}
        size="small"
        onClick={onReplyDeleteClick}
        color="warning"
        sx={{ border: 1, borderColor: 'divider' }}
      >
        {deleteStatus === 'pending' ? (
          <CircularProgress
            size={20}
            color="inherit"
            sx={{ p: 0, m: 0 }}
          />
        ) : (
          <DeleteForeverIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default DeleteReplyButton;
