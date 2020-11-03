import React from 'react';
import { Typography } from '@material-ui/core';
import AppLayout from '../../components/app-layout';
import getUserData from '../api/v1/users/get';
import { GetServerSideProps } from 'next';

const DashboardPage = () => {
  return (
    <AppLayout>
      <Typography variant='h1'>The dashboard</Typography>
    </AppLayout>
  );
};

export default DashboardPage;
