// @mui/material
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

// @mui/icons-material
import MenuIcon from '@mui/icons-material/Menu';
import WhatshotIcon from '@mui/icons-material/Whatshot';

// @src/components
import Link from '../Link';
import HeaderToolbar from '../HeaderToolbar';
import UserMenu from './UserMenu';
import SearchButton from '../search/SearchButton';
const Header = ({ onMenuClick }) => {
  return (
    <AppBar
      color="inherit"
      position="fixed"
      elevation={0}
      sx={{
        borderBottom: (theme) =>
          `2px solid ${theme.palette.divider}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <HeaderToolbar>
        <IconButton
          aria-label="Toggle Main Sidenav"
          onClick={onMenuClick}
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        <Button
          size="small"
          color="inherit"
          component={Link}
          noLinkStyle
          href="/"
          startIcon={
            <WhatshotIcon sx={{ color: 'primary.light' }} />
          }
          variant="text"
          disableElevation
          disableRipple
          sx={{
            '&:focus': {
              bgcolor: 'unset',
            },
            '&:hover': {
              bgcolor: 'unset',
            },
            pl: 2,
          }}
        >
          VoxyDev
        </Button>

        <SearchButton />

        <UserMenu />
      </HeaderToolbar>
    </AppBar>
  );
};

export default Header;
