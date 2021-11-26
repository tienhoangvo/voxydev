// @react
import { useState } from 'react';

// @props-types
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

// @mui/icons-material
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// @react-copy-to-clipboard
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ContentCopyButton = ({
  content,
  children,
  message,
}) => {
  const [copied, setCopied] = useState(false);
  const onSnackBarOpen = () => {
    setCopied(true);
  };

  const onSnackbarClose = () => {
    setCopied(false);
  };

  return (
    <>
      <CopyToClipboard
        text={content}
        onCopy={onSnackBarOpen}
      >
        {children || (
          <Tooltip title="Click to copy">
            <IconButton size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </CopyToClipboard>
      <Snackbar
        open={copied}
        onClose={onSnackbarClose}
        message={message}
        TransitionComponent={(props) => (
          <Slide {...props} direction="up" />
        )}
        autoHideDuration={3000}
        key={content + new Date()}
      />
    </>
  );
};

ContentCopyButton.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default ContentCopyButton;
