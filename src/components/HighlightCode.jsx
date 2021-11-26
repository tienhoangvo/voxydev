// @react
import { useRef, useEffect } from 'react';

// @react-dom
import { findDOMNode } from 'react-dom';

// @highlight.js
import highlight from 'highlight.js';
import 'highlight.js/styles/monokai.css';

// @mui/material
import Box from '@mui/material/Box';

const HighlightCode = ({
  language,
  children,
  filename,
}) => {
  const codeRef = useRef();

  useEffect(() => {
    highlight.highlightBlock(findDOMNode(codeRef.current));
  }, []);

  return (
    <Box
      component="pre"
      className={`language-${language}`}
      sx={{
        fontSize: '.875rem',
        letterSpacing: 0,
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <code ref={codeRef}>
        {`// -- ${filename} --\n`}
        {children}
      </code>
    </Box>
  );
};

export default HighlightCode;
