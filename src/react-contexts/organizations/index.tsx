import React, { useContext, createContext, useReducer } from 'react';
import { IOrganization } from '../../types';
import { reducer } from './reducer';

export interface IOrganizationContext {
  organizations: Map<string, IOrganization>;
  addOrganizations: (data: IOrganization[]) => void;
  deleteOrganization: (data: IOrganization['_id']) => void;
  resetOrganizations: () => void;
}

// default context
export const defaultOrganizationContext: IOrganizationContext = {
  organizations: new Map(),
  addOrganizations: () => {},
  deleteOrganization: () => {},
  resetOrganizations: () => {},
};

// create context
const OrganizationContext = createContext(defaultOrganizationContext);

// provider wrapper
export const OrganizationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultOrganizationContext);

  const value: IOrganizationContext = {
    organizations: state.organizations,
    addOrganizations: (payload) => dispatch({ type: 'ADD ORGANIZATIONS', payload }),
    deleteOrganization: (payload) => dispatch({ type: 'DELETE ORGANIZATION', payload }),
    resetOrganizations: () => dispatch({ type: 'RESET ORG CONTEXT' }),
  };

  return <OrganizationContext.Provider value={value}> {children} </OrganizationContext.Provider>;
};

// Hook for using org context
export const useOrganizationContext = () => useContext(OrganizationContext);
