import React from 'react';
import { UserContextProvider } from './user';

export const GlobalContextProvider = ({ children }) => <UserContextProvider>{children}</UserContextProvider>;
