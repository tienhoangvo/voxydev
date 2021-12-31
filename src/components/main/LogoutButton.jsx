// @mui/material
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

// @react
import { useState } from 'react';

// @mui/icons-material
import LogoutIcon from '@mui/icons-material/Logout';

// @src/components
import BackdropSpinner from '../progress/BackdropSpinner';

// @src/lib
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const onLogoutClick = () => {
    setLoading(true);

    signOut();
  };

  return (
    <>
      <ListItemButton onClick={onLogoutClick}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>

        <ListItemText
          primary="Logout"
          primaryTypographyProps={{ fontSize: '.875rem' }}
        />
      </ListItemButton>

      <BackdropSpinner open={loading} />
    </>
  );
};

export default LogoutButton;
