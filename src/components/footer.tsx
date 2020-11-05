import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const year = new Date().getFullYear();

const useStyles = makeStyles((theme) => ({
  footer: {
    minHeight: '200px',
    backgroundColor: theme.palette.grey[200],
  },
}));

const Footer = () => {
  const { footer } = useStyles();
  return (
    <Box p={3} component='footer' className={footer}>
      <Typography variant='body1'>&copy; Copyright {year}</Typography>
    </Box>
  );
};

export default Footer;
