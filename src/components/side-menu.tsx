import React from 'react';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { useRouter } from 'next/router';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const SideMenu = () => {
  const router = useRouter();
  return (
    <List component='nav'>
      <ListItem button onClick={() => router.push('/emails')}>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary='Emails' />
      </ListItem>
      <ListItem button onClick={() => router.push('/organizations')}>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary='Organizations' />
      </ListItem>
      <ListItem button onClick={() => router.push('/account')}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Account' />
      </ListItem>
    </List>
  );
};

export default SideMenu;
