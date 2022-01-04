import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import {
  FacebookShareButton,
  FacebookShareCount,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

import { useCallback, useMemo, useState } from 'react';

import ContentCopyButton from '../utils/ContentCopyButton';
import useSlug from '../../hooks/useSlug';
import { useMediaQuery } from '@mui/material';

const ShareButton = ({
  url = '',
  title = '',
  hashtags = [],
  quote = '',
}) => {
  const slug = useSlug();

  const matchedSMDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );
  const [openShareDialog, setOpenShareDialog] =
    useState(false);

  const shareUrl = useMemo(() => {
    if (url) return url;

    if (typeof window === 'undefined') return url;

    return `${window.location.href}`;
  }, [url, slug]);

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
        fullScreen={matchedSMDown}
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
          <Stack spacing={1}>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              hashtags={hashtags}
            >
              <Button
                fullWidth
                variant="outlined"
                color="twitter"
                startIcon={<TwitterIcon fontSize="small" />}
              >
                Twitter
              </Button>
            </TwitterShareButton>

            <FacebookShareButton
              url={shareUrl}
              title={title}
              quote={quote}
              hashtag={hashtags[0]}
            >
              <Button
                fullWidth
                variant="outlined"
                color="facebook"
                startIcon={
                  <FacebookIcon fontSize="small" />
                }
              >
                <FacebookShareCount url={shareUrl}>
                  {(count) => count}
                </FacebookShareCount>
                Facebook
              </Button>
            </FacebookShareButton>

            <LinkedinShareButton url={shareUrl}>
              <Button
                fullWidth
                variant="outlined"
                color="linkedin"
                startIcon={
                  <LinkedInIcon fontSize="small" />
                }
              >
                LinkedIn
              </Button>
            </LinkedinShareButton>
            <TextField
              fullWidth
              inputMode="url"
              aria-readonly="true"
              defaultValue={shareUrl}
              disabled
              InputProps={{
                sx: {
                  fontSize: '.875rem',
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <ContentCopyButton
                      content={shareUrl}
                      message="Link copied to clipboard"
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </CardContent>
      </Dialog>
    </>
  );
};

export default ShareButton;
