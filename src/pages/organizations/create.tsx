import React from 'react';
import { Button, Typography, Divider } from '@material-ui/core';
import AppLayout from '../../components/app-layout';
import { CreateOrganizationForm } from '../../forms/organization-create.form';

const CreateOrganization = () => {
  return (
    <AppLayout title='Create New Organization'>
      <Typography variant='h4'>Create a New Organization</Typography>
      <CreateOrganizationForm />
    </AppLayout>
  );
};

export default CreateOrganization;
