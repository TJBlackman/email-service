import React from 'react';
import { UserContextProvider } from './user';
import { OrganizationContextProvider } from './organizations';

export const GlobalContextProvider = ({ children }) => (
  <UserContextProvider>
    <OrganizationContextProvider>{children}</OrganizationContextProvider>
  </UserContextProvider>
);
