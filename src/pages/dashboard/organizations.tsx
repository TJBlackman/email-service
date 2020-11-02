import React from 'react';
import { Button, Typography, Divider } from '@material-ui/core';
import AppLayout from '../../components/app-layout';
import AddIcon from '@material-ui/icons/Add';

const DashboardPage = () => {
  return (
    <AppLayout title='Email Organizations'>
      <Typography variant='h4' paragraph>
        Email Organizations
      </Typography>
      <Typography variant='body1' paragraph>
        An organization can be a single website, a collection of similar websites, an app, or even a backend service
        that needs to send an email. After registering a new organization, you will be given an API key to send emails
        on behalf of that organization. You will be able to review all the emails sent by this organization.
      </Typography>
      <Typography paragraph align='right'>
        <Button variant='contained' color='primary' startIcon={<AddIcon />}>
          Create New Organization
        </Button>
      </Typography>
      <Divider />
    </AppLayout>
  );
};

export default DashboardPage;
