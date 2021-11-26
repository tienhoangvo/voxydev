import Dialog from '@mui/material/Dialog';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';

const LoginDialog = ({
  open = false,
  onClose = (f) => f,
}) => {
  const matchedSMDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      fullScreen={matchedSMDown}
    >
      <CardHeader
        title="Login"
        sx={{
          borderBottom: 2,
          borderColor: 'divider',
          p: (theme) => theme.spacing(1, 2),
        }}
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        titleTypographyProps={{
          sx: {
            fontSize: '1rem',
            fontWeight: 700,
          },
        }}
      />

      <CardContent>
        <List>
          <ListItemButton
            component="a"
            href="/api/auth/google"
            sx={{ border: 1, borderColor: 'divider' }}
          >
            <ListItemIcon>
              <GoogleIcon color="google" />
            </ListItemIcon>
            <ListItemText primary="Continue with Google" />
          </ListItemButton>
          <ListItemButton
            component="a"
            href="/api/auth/facebook"
            sx={{
              border: 1,
              borderColor: 'divider',
              mt: 2,
            }}
          >
            <ListItemIcon>
              <FacebookIcon color="facebook" />
            </ListItemIcon>
            <ListItemText primary="Continue with Facebook" />
          </ListItemButton>
        </List>
      </CardContent>
    </Dialog>
  );
};

export default LoginDialog;
