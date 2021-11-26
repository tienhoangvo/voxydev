// @mui/material
import Button from '@mui/material/Button';

// @react
import { useState } from 'react';

import LoginDialog from './LoginDialog';

const LoginButton = ({
  children,
  color = 'primary',
  size = 'small',
  variant = 'contained',
  fullWidth = false,
}) => {
  const [openLoginDialog, setOpenLoginDialog] =
    useState(false);
  const onLoginDialogOpen = () => {
    setOpenLoginDialog(true);
  };

  const onLoginDialogClose = () => {
    setOpenLoginDialog(false);
  };
  return (
    <>
      <Button
        disableElevation={variant === 'contained'}
        color={color}
        variant={variant}
        size={size}
        onClick={onLoginDialogOpen}
        fullWidth={fullWidth}
      >
        {children || 'Login'}
      </Button>
      <LoginDialog
        open={openLoginDialog}
        onClose={onLoginDialogClose}
      />
    </>
  );
};

export default LoginButton;
