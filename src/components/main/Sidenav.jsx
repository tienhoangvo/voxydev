// @mui/materials
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';

// @react
import { useCallback } from 'react';

// @src/contants
import { DRAWER_WIDTH, MAIN_ROUTES } from '../../constants';

// @src/components
import HeaderToolbar from '../HeaderToolbar';
import Link from '../Link';

// @src/hooks
import useActivePath from '../../hooks/useActivePath';
import Copyright from '../Copyright';

const Sidenav = ({ open = true }) => {
  const activePath = useActivePath({ level: 0 });

  const selectedRoute = useCallback(
    (route) => {
      return activePath === route;
    },
    [activePath]
  );

  const renderMainNavigation = () =>
    MAIN_ROUTES.map((route) => {
      return (
        <ListItemButton
          key={route.route}
          selected={selectedRoute(route.route)}
          component={Link}
          href={route.route}
          noLinkStyle
          disableRipple
          sx={{
            pl: '1.5rem',
            pr: '1.5rem',
            ...(open && {
              flexDirection: 'column',
              width: '4.5rem',
            }),
          }}
        >
          <ListItemIcon
            sx={{
              mr: '1.5rem',
              minWidth: 'unset',
              ...(open && {
                mr: 0,
              }),
            }}
          >
            {route.icon}
          </ListItemIcon>
          <ListItemText
            primary={route.label}
            primaryTypographyProps={{
              sx: {
                fontWeight: 500,
                fontSize: '0.875rem',
                ...(open && {
                  fontSize: '10px',
                }),
              },
            }}
          />
        </ListItemButton>
      );
    });

  return (
    <Drawer
      open
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        width: DRAWER_WIDTH,

        ...(open && {
          width: '4.5rem',
        }),
      }}
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',

          ...(open && {
            width: '4.5rem',
          }),
        },
      }}
    >
      <HeaderToolbar />
      <Box
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          mb: 'auto',
        }}
      >
        <List disablePadding component={'nav'}>
          {renderMainNavigation()}
        </List>
      </Box>

      {!open && <Copyright />}
    </Drawer>
  );
};

export default Sidenav;
