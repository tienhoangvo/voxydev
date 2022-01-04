import { createTheme } from '@mui/material/styles';

import PropTypes from 'prop-types';
import LightPalette from './palettes/LightPalette';
import DarkPalette from './palettes/DarkPalette';

// Create a theme instance.
const theme = (mode = 'light') =>
  createTheme({
    palette: mode === 'light' ? LightPalette : DarkPalette,

    typography: {
      fontFamily: "'Philosopher', sans-serif",
      button: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
      },
    },
  });

theme.PropTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
};

export default theme;
