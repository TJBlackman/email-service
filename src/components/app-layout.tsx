import React, { PropsWithChildren } from 'react';
import { Grid, Hidden } from '@material-ui/core';
import Header from './header';
import SideMenu from './side-menu';
import Footer from './footer';

const DashBoardLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        <Hidden mdDown>
          <Grid item xs={12} md={3} xl={2}>
            <SideMenu />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={9} xl={10}>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;
