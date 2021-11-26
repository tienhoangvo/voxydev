import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      letterSpacing={0}
      boxSizing="border-box"
      pb={1}
    >
      {'© TienHoangVo '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
