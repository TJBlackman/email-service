import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useUserContext } from '../react-contexts/user';

export default function ButtonAppBar() {
  const { logout } = useUserContext();
  return (
    <AppBar position='static' component='header'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          Email Service
        </Typography>
        <Button color='inherit' onClick={logout}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
