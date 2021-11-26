// @react-hook-forms
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

// @mui/material
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

// @mui/lab
import LoadingButton from '@mui/lab/LoadingButton';

// @react
import { useState } from 'react';

// @axios
import axios from 'axios';

// @src/hooks
import useCurrentUser from '../../../hooks/useCurrentUser';
import useCommentReplies from '../../../hooks/useCommentReplies';

// @./
import replyValidationSchema from './replyValidationSchema';
import LoginButton from '../../auth/LoginButton';

const CreateReplyForm = ({
  commentId,
  repliedToUser,
  onClose,
}) => {
  const { register, handleSubmit, formState, reset } =
    useForm({
      mode: 'all',
      resolver: yupResolver(replyValidationSchema),
    });

  const { currentUser } = useCurrentUser();

  const { addReply } = useCommentReplies({ commentId });

  const [createStatus, setCreateStatus] = useState('idle');

  const onCommentSubmit = async (data) => {
    setCreateStatus('pending');

    const newReply = {
      content: data.content,
      commentId,
      repliedTo: repliedToUser.id,
      createdAt: new Date(),
    };

    axios
      .post(`/api/comments/${commentId}/replies`, newReply)
      .then((res) => {
        const { data: reply } = res;
        setCreateStatus('success');
        console.log('🎇🎇 SUCCESS', reply);
        reset({ content: '' });
        addReply(reply);
      })
      .catch((err) => {
        console.log('💥💥 CREATEING NEW REPLY ERROR');
        console.error(err);
        console.dir(err);
        setCreateStatus('error');
      });
  };

  return (
    <>
      {!currentUser && (
        <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
          <CardActions>
            <LoginButton
              size="large"
              variant="outlined"
              color="primary"
              fullWidth={true}
            >
              Login To Reply
            </LoginButton>
          </CardActions>
        </Card>
      )}

      {currentUser && (
        <Card
          elevation={0}
          sx={{
            bgcolor: 'transparent',

            borderRadius: 'unset',
            borderTop: 1,

            borderColor: 'divider',
          }}
          component={'form'}
          onSubmit={handleSubmit(onCommentSubmit)}
        >
          <CardHeader
            sx={{
              p: (theme) => theme.spacing(1, 1, 0.5, 1),
              '& .MuiCardHeader-avatar': {
                marginRight: 1,
              },
            }}
            avatar={
              <Avatar
                src={currentUser?.avatar}
                alt={currentUser?.name}
                sx={{ height: '1.5rem', width: '1.5rem' }}
              />
            }
            title={
              <>
                <Chip
                  label={`@${repliedToUser.name}`}
                  size="small"
                  sx={{
                    fontSize: '12px',
                    fontWeight: '600',
                  }}
                />
              </>
            }
          />
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              p: (theme) => theme.spacing(0.5, 1, 0.5, 1),
            }}
          >
            <TextField
              variant="filled"
              size="small"
              disabled={createStatus === 'pending'}
              error={!!formState.errors.content}
              multiline
              maxRows={5}
              helperText={
                formState.errors.content?.message || ''
              }
              placeholder="Addd a public reply..."
              fullWidth
              inputProps={{
                ...register('content'),
                sx: { fontSize: '13px', letterSpacing: 0 },
                onKeyDown: (event) => {
                  if (
                    event.key === 'Enter' &&
                    !event.shiftKey
                  ) {
                    onCommentSubmit({
                      content: event.target.value,
                    });
                    event.preventDefault();
                  }
                },
              }}
            />
          </CardContent>

          <CardActions
            sx={{
              p: (theme) => theme.spacing(0.5, 1, 1, 1),
            }}
          >
            <Button
              sx={{ ml: 'auto' }}
              onClick={() => {
                reset({ content: '' });
                onClose();
              }}
              disabled={createStatus === 'pending'}
              size="small"
            >
              Cancel
            </Button>
            <LoadingButton
              loading={createStatus === 'pending'}
              type="submit"
              variant="contained"
              disableElevation
              disabled={
                !formState.isDirty || !formState.isValid
              }
              size="small"
            >
              Reply
            </LoadingButton>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default CreateReplyForm;
