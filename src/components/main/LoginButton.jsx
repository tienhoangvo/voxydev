// @mui/material
import LoadingButton from '@mui/lab/LoadingButton';

// @react
import { useState } from 'react';

// @mui/icons-material
import GoogleIcon from '@mui/icons-material/Google';

const LoginButton = () => {
  const [loading, setLoading] = useState(false);
  const onLoginClick = () => {
    setLoading(true);

    window.location.replace('/api/auth/google');
  };

  return (
    <>
      <LoadingButton
        loading={loading}
        startIcon={<GoogleIcon />}
        variant="outlined"
        color="google"
        onClick={onLoginClick}
      >
        Login
      </LoadingButton>
    </>
  );
};

export default LoginButton;
