import React from 'react';
import { Typography } from '@material-ui/core';
import AppLayout from '../components/app-layout';
import { useUserContext } from '../react-contexts/user';

const DashboardPage = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <AppLayout>
      <Typography variant='h1'>The dashboard</Typography>
    </AppLayout>
  );
};

export default DashboardPage;
