// @mui/material

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const LoadingSpinner = ({ loading }) => {
  return (
    <>
      {loading && (
        <Stack
          alignItems="center"
          sx={{ p: (theme) => theme.spacing(3, 0) }}
        >
          <CircularProgress size="small" color="primary" />
        </Stack>
      )}
    </>
  );
};

export default LoadingSpinner;
