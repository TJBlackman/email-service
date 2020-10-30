import { Box, Typography } from '@material-ui/core';
import React from 'react';

const Footer = () => {
  return (
    <Box m={'5, 2'}>
      <Typography variant='body1'>&copy; Copyright {new Date().getFullYear()}</Typography>
    </Box>
  );
};

export default Footer;
