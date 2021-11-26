// @mui/material
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';

// @mui/icons-material
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// @react
import { useState, useMemo } from 'react';

// @src/components/main
import LogoutButton from './LogoutButton';
import Link from './../Link';

// @src/constants
import { DRAWER_WIDTH } from '../../constants';
import useActivePath from '../../hooks/useActivePath';

const UserAvatarButton = ({ userAvatar, userName }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const activePath = useActivePath({ level: 1 });

  const openMenu = useMemo(
    () => Boolean(anchorEl),
    [anchorEl]
  );

  const onAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={onAccountClick}>
        <Avatar
          src={userAvatar}
          alt={userName}
          sx={{
            height: { xs: '1.5rem', sm: '2rem' },
            width: { xs: '1.5rem', sm: '2rem' },
          }}
        />
      </IconButton>
      <Menu
        open={openMenu}
        anchorEl={anchorEl}
        onClose={onMenuClose}
        PaperProps={{
          elevation: 0,

          sx: {
            border: 1,
            borderColor: 'divider',

            minWidth: DRAWER_WIDTH,

            overflow: 'visible',
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <ListItem alignItems="flex-start" divider>
          <ListItemAvatar>
            <Avatar src={userAvatar} alt={userName} />
          </ListItemAvatar>

          <ListItemText
            primary={userName}
            secondary="Manage your account"
            primaryTypographyProps={{
              fontSize: '1rem',
            }}
            secondaryTypographyProps={{
              fontSize: '.875rem',
              letterSpacing: 0,
            }}
          />
        </ListItem>
        <ListItemButton
          onClick={onMenuClose}
          component={Link}
          href="/me/favorites"
          selected={activePath === '/favorites'}
        >
          <ListItemIcon>
            <FavoriteBorderIcon />
          </ListItemIcon>

          <ListItemText
            primary="Favorites Article"
            primaryTypographyProps={{ fontSize: '.875rem' }}
          />
        </ListItemButton>
        <LogoutButton />
      </Menu>
    </>
  );
};

export default UserAvatarButton;
