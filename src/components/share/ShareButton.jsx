// @mui/material
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

// @mui/icons-material
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

// @react
import { useCallback, useMemo, useState } from 'react';

// @next
import { useRouter } from 'next/router';

// @src/components
import ContentCopyButton from '../utils/ContentCopyButton';

const ShareButton = () => {
  const { query } = useRouter();

  const { slug } = query;
  const [openShareDialog, setOpenShareDialog] =
    useState(false);

  const link = useMemo(() => {
    if (typeof window === 'undefined') return slug;

    return `${window.location.href}`;
  }, [slug]);

  const onShareDialogClose = () => {
    setOpenShareDialog(false);
  };

  const toggleOpenShareDialog = useCallback(() => {
    setOpenShareDialog(!openShareDialog);
  }, [openShareDialog]);

  return (
    <>
      <Tooltip title="Share">
        <Button
          variant="outlined"
          size="small"
          startIcon={<ShareIcon />}
          onClick={toggleOpenShareDialog}
        >
          Share
        </Button>
      </Tooltip>
      <Dialog
        open={openShareDialog}
        onClose={onShareDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <CardHeader
          title="Share"
          action={
            <IconButton onClick={onShareDialogClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Stack direction={'row'} spacing={1}>
            <IconButton
              sx={{ border: 1, borderColor: 'twitter' }}
              size="large"
              color="twitter"
              href={`https://twitter.com/intent/tweet?url=${link}`}
              aria-label="twitter share"
              title="Twitter"
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>

            <IconButton
              sx={{ border: 1, borderColor: 'facebook' }}
              size="large"
              color="facebook"
              component={'a'}
              rel="noopener"
              href={`https://www.facebook.com/dialog/share?app_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&display=popup&href=${link}`}
              target="_blank"
              aria-label="facebook share"
              title="Facebook"
            >
              <FacebookIcon />
            </IconButton>
          </Stack>
          <TextField
            fullWidth
            inputMode="url"
            aria-readonly="true"
            defaultValue={link}
            disabled
            InputProps={{
              sx: {
                fontSize: '.875rem',
                mt: 1,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <ContentCopyButton
                    content={link}
                    message="Link copied to clipboard"
                  />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Dialog>
    </>
  );
};

export default ShareButton;
