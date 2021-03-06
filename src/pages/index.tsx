import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { GetServerSideProps } from 'next';

export default function Index() {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Next.js example
        </Typography>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.writeHead(302, { Location: '/sign-in' });
  context.res.end();
  return { props: {} };
};
