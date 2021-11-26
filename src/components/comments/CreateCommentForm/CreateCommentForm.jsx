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
import TextField from '@mui/material/TextField';

// @mui/lab
import LoadingButton from '@mui/lab/LoadingButton';

//@react
import { useState } from 'react';

//@axios
import axios from 'axios';

// @src/hooks
import useCurrentUser from '../../../hooks/useCurrentUser';

// @src/components/comments/
import commentValidationSchema from './commentValidationSchema';
import useCurrentUserComments from '../../../hooks/useCurrentUserComments';
import LoginButton from '../../auth/LoginButton';

const CreateCommentForm = ({ articleId }) => {
  const { register, handleSubmit, formState, reset } =
    useForm({
      mode: 'all',
      resolver: yupResolver(commentValidationSchema),
    });

  const { currentUser } = useCurrentUser();

  const { addComment } = useCurrentUserComments({
    articleId,
  });

  const [createStatus, setCreateStatus] = useState('idle');

  const onCommentSubmit = async (data) => {
    setCreateStatus('pending');
    const newComment = {
      content: data.content,
      articleId,
      createdAt: new Date(),
    };

    axios
      .post('/api/comments', newComment)
      .then((res) => {
        const { data: comment } = res;
        setCreateStatus('success');
        console.log('🎇🎇 SUCCESS', comment);
        reset({ content: '' });
        addComment(comment);
      })
      .catch((err) => {
        console.log('💥💥 CREATEING NEW COMMENT ERROR');
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
              variant="contained"
              color="primary"
              fullWidth={true}
            >
              Login To Comment
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
            borderBottom: 1,
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
            title={currentUser?.name}
            titleTypographyProps={{
              fontWeight: 600,
            }}
            avatar={
              <Avatar
                src={currentUser?.avatar}
                alt={currentUser?.name}
              />
            }
          />

          <CardContent
            sx={{ p: (theme) => theme.spacing(0.5, 1) }}
          >
            <TextField
              disabled={createStatus === 'pending'}
              error={!!formState.errors.content}
              helperText={
                formState.errors.content?.message || ''
              }
              multiline
              variant="filled"
              maxRows={5}
              placeholder="Add a public comment..."
              fullWidth
              size="small"
              inputProps={{
                ...register('content'),
                sx: { fontSize: '14px' },
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
              onClick={() => reset({ content: '' })}
              disabled={createStatus === 'pending'}
              size="small"
            >
              Cancel
            </Button>
            <LoadingButton
              loading={createStatus === 'pending'}
              type="submit"
              variant="contained"
              size="small"
              disableElevation
              disabled={
                !formState.isDirty || !formState.isValid
              }
            >
              Comment
            </LoadingButton>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default CreateCommentForm;
