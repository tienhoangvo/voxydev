import { createTheme } from '@mui/material/styles';

import PropTypes from 'prop-types';
import LightPalette from './palettes/LightPalette';
import DarkPalette from './palettes/DarkPalette';

// Create a theme instance.
const theme = (mode = 'light') =>
  createTheme({
    palette: mode === 'light' ? LightPalette : DarkPalette,
    typography: {
      fontFamily: "'Karla', sans-serif",
    },
  });

theme.PropTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
};

export default theme;
