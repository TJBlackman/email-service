import React, { PropsWithChildren } from 'react';
import { Box, Grid, Hidden, makeStyles } from '@material-ui/core';
import Header from './header';
import SideMenu from './side-menu';
import Footer from './footer';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 64px - 200px)',
  },
  sideBar: {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
}));

const DashBoardLayout = ({
  children,
  title = 'Email Service App',
}: PropsWithChildren<{
  title?: string;
}>) => {
  const { main, sideBar } = useStyles();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <Grid container>
        <Hidden smDown>
          <Grid item xs={12} md={3} xl={2} className={sideBar}>
            <SideMenu />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={9} xl={10}>
          <Box pt={5} pb={5} px={3} component='main' className={main}>
            {children}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default DashBoardLayout;
