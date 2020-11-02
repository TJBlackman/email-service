import React, { PropsWithChildren } from 'react';
import { Box, Grid, Hidden } from '@material-ui/core';
import Header from './header';
import SideMenu from './side-menu';
import Footer from './footer';
import Head from 'next/head';

const DashBoardLayout = ({
  children,
  title = 'Email Service App',
}: PropsWithChildren<{
  title?: string;
}>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <Grid container spacing={2} alignItems='stretch'>
        <Hidden smDown>
          <Grid item xs={12} md={3} xl={2}>
            <SideMenu />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={9} xl={10}>
          <Box pt={5} pb={5} px={3}>
            {children}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default DashBoardLayout;
