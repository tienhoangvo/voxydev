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

// @src/hooks
import useCurrentUser from '../../hooks/useCurrentUser';

// @src/lib
import axiosFetcher from './../../lib/utils/apiFetcher';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const { mutate } = useCurrentUser();

  const onLogoutClick = () => {
    setLoading(true);

    axiosFetcher('/api/auth/logout').then(() => {
      setLoading(false);
      mutate(null);
    });
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
