import Dialog from '@mui/material/Dialog';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery } from '@mui/material';

import { signIn } from 'next-auth/react';
import BackdropSpinner from '../progress/BackdropSpinner';
import { useState } from 'react';
const PROVIDERS = [
  {
    id: 'google',
    name: 'Google',
  },
  {
    id: 'facebook',
    name: 'Facebook',
  },
  {
    id: 'twitter',
    name: 'Twitter',
  },
  {
    id: 'github',
    name: 'GitHub',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
  },
];

const LoginDialog = ({
  open = false,
  onClose = (f) => f,
}) => {
  const [loading, setLoading] = useState(false);

  const matchedSMDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );

  const onListItemClick = (providerId) => () => {
    setLoading(true);
    signIn(providerId);
  };

  const renderIcon = (id) => {
    switch (id) {
      case 'google':
        return (
          <GoogleIcon fontSize="small" color="google" />
        );
      case 'facebook':
        return (
          <FacebookIcon fontSize="small" color="facebook" />
        );
      case 'twitter':
        return (
          <TwitterIcon fontSize="small" color="twitter" />
        );
      case 'github':
        return (
          <GitHubIcon fontSize="small" color="github" />
        );
      case 'linkedin':
        return (
          <LinkedInIcon fontSize="small" color="linkedin" />
        );
      default:
        return <LoginIcon />;
    }
  };

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
            <CloseIcon fontSize="small" />
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
          {PROVIDERS.map((provider, index) => (
            <ListItemButton
              dense
              key={provider.id}
              onClick={onListItemClick(provider.id)}
              sx={{
                mt: index > 0 && 2,
                border: 2,
                borderColor: `${provider.id}.main`,
                borderRadius: '4px',
              }}
            >
              <ListItemIcon>
                {renderIcon(provider.id)}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontWeight: 700,
                }}
                primary={`Continue with ${provider.name}`}
              />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
      <BackdropSpinner open={loading} />
    </Dialog>
  );
};

export default LoginDialog;
