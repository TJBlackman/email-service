import { IOrganizationContext, defaultOrganizationContext } from './index'
import { IOrganization } from "../../types";

type Action =
  | { type: 'ADD ORGANIZATIONS', payload: IOrganization[] }
  | { type: 'DELETE ORGANIZATION', payload: IOrganization['_id'] }
  | { type: 'RESET ORG CONTEXT' };

export const reducer = (state: IOrganizationContext, action: Action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'ADD ORGANIZATIONS': {
      let i = 0;
      const iMax = action.payload.length;
      for (i; i < iMax; ++i) {
        const newOrg = action.payload[i];
        newState.organizations.set(newOrg._id, newOrg);
      };
      return newState;
    }
    case 'DELETE ORGANIZATION': {
      newState.organizations.delete(action.payload);
      return newState;
    }
    case 'RESET ORG CONTEXT': {
      return defaultOrganizationContext;
    }
    default: () => {
      console.warn(`Unknown action type: ${JSON.stringify(action, null, 4)}`);
      return state;
    }
  }
}; 