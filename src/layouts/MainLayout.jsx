// @mui/material
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// @react
import { useState } from 'react';

// @src/components
import Blueprint from '../components/main/Blueprint';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Blueprint />

      <Box
        component="main"
        sx={{
          width: '100%',
          flexGrow: 1,
          paddingTop: {
            xs: 2,
            sm: 2,
            lg: 3,
          },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
