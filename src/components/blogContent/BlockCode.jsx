// @react
import { useRef, useEffect } from 'react';

// @react-dom
import { findDOMNode } from 'react-dom';

// @highlight.js
import highlight from 'highlight.js';
import 'highlight.js/styles/monokai.css';

// @mui/material
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import { useMediaQuery } from '@mui/material';

import ContentCopyButton from '../utils/ContentCopyButton';

const BlockCode = ({
  language = 'shell',
  children,
  filename,
}) => {
  const codeRef = useRef();

  const matchedSmDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );

  useEffect(() => {
    highlight.highlightElement(
      findDOMNode(codeRef.current)
    );
  }, []);

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: (theme) =>
          theme.palette.background.primary,
      }}
    >
      <CardContent
        component="pre"
        className={`language-${language}`}
        sx={{
          fontSize: matchedSmDown ? '0.625rem' : '.8rem',
          letterSpacing: 0,
          borderRadius: '5px',
          width: '100%',
          whiteSpace: 'pre-wrap',
          p: 0,
          mb: 0,
          mt: 0,
        }}
      >
        <Box
          component="code"
          ref={codeRef}
          sx={{
            wordBreak: 'break-word',
          }}
        >
          {`// -- ${filename} --\n`}
          {children}
        </Box>
      </CardContent>
      <CardHeader
        title={filename}
        titleTypographyProps={{ fontSize: '.875rem' }}
        action={
          <ContentCopyButton
            content={children}
            message={'Code copied to clipboard'}
          />
        }
      />
    </Card>
  );
};

export default BlockCode;
