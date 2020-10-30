import { IUser } from '../../types';
import { defaultUserContext, IUserContext } from "./index";

type Action =
  | { type: 'SET USER DATA', payload: Partial<Omit<IUser, 'password'>> }
  | { type: 'LOG OUT' };

export const reducer = (state: IUserContext, action: Action) => {
  const newState = {
    ...state,
    user: { ...state.user }
  };
  switch (action.type) {
    case 'LOG OUT': {
      return defaultUserContext;
    }
    case 'SET USER DATA': {
      newState.user = {
        ...newState.user,
        ...action.payload
      };
      return newState;
    }
    default: {
      console.warn(`Unknown action type: ${JSON.stringify(action, null, 4)}`);
      return state;
    }
  }
};