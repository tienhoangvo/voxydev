// @mui/material
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// @mui/lab
import LoadingButton from '@mui/lab/LoadingButton';

import CircularProgress from '@mui/material/CircularProgress';
// @mui/icons-material
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// @axios
import axios from 'axios';

// @react
import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

// @src/hooks
import useArticleComments from '../../../hooks/useArticleComments';
import useCurrentUserComments from '../../../hooks/useCurrentUserComments';

const DeleteCommentButton = ({ articleId, commentId }) => {
  const [deleteStatus, setDeleteStatus] = useState('idle');

  const { deleteComment } = useCurrentUserComments({
    articleId,
  });
  const onCommentDeleteClick = useCallback(() => {
    setDeleteStatus('pending');
    axios
      .delete(`/api/comments/${commentId}`)
      .then((res) => {
        setDeleteStatus('success');
        console.log('Deleted data', commentId);
        deleteComment(commentId);
      })
      .catch((err) => {
        console.log('💥💥💥 DELETE COMMENT ERROR!');
        console.error(err);
        console.dir(err);
      });
  }, [commentId]);

  return (
    <Tooltip title="Delete this comment!">
      <IconButton
        disabled={deleteStatus === 'pending'}
        size="small"
        onClick={onCommentDeleteClick}
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

export default DeleteCommentButton;
