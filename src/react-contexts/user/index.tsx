import React, { useContext, createContext, useReducer } from 'react';
import { IUser } from '../../types';
import { reducer } from './reducer';

export interface IUserContext {
  user: Omit<IUser, 'password'>;
  setUserData(data: Partial<Omit<IUser, 'password'>>): void;
  logout(): void;
}

// default context
export const defaultUserContext: IUserContext = {
  user: {
    _id: '',
    __v: 0,
    firstName: '',
    lastName: '',
    email: '',
    organizations: [],
  },
  setUserData: () => {},
  logout: () => {},
};

// create context
const UserContext = createContext(defaultUserContext);

// provider wrapper
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultUserContext);

  const value: IUserContext = {
    user: state.user,
    setUserData: (payload) => dispatch({ type: 'SET USER DATA', payload }),
    logout: () => dispatch({ type: 'LOG OUT' }),
  };

  return <UserContext.Provider value={value}> {children} </UserContext.Provider>;
};

// Hook for using user context
export const useUserContext = () => useContext(UserContext);
