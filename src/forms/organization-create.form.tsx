import React, { useReducer } from 'react';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import { OrganizationProvider } from './organization-provider.form';

const defaultState = {
  name: '',
  description: '',
  providers: new Map<string, object>(),
  error: '',
  success: '',
  loading: false,
};
type LocalState = typeof defaultState;

type Action =
  | { type: 'SET NAME'; payload: string }
  | { type: 'SET DESCRIPTION'; payload: string }
  | { type: 'SUBMIT FORM' }
  | { type: 'SET SUCCESS MESSAGE'; payload: string }
  | { type: 'SET ERROR MESSAGE'; payload: string };

const reducer = (state: LocalState, action: Action) => {
  const newState: LocalState = { ...state };
  switch (action.type) {
    case 'SET NAME': {
      newState.name = action.payload;
      return newState;
    }
    case 'SET DESCRIPTION': {
      newState.description = action.payload;
      return newState;
    }
    case 'ADD PROVIDER CREDS': {
      newState.providers.set(action.payload.apiKey, action.payload);
      return newState;
    }
    case 'DELETE PROVIDER CREDS': {
      newState.providers.delete(action.payload);
      return newState;
    }
    case 'SET ERROR MESSAGE': {
      newState.error = action.payload;
      newState.loading = false;
      return newState;
    }
    case 'SET SUCCESS MESSAGE': {
      newState.success = action.payload;
      newState.loading = false;
      return newState;
    }
    case 'SUBMIT FORM': {
      newState.loading = true;
      return newState;
    }
    default: {
      console.warn(`Unknown action.type: ${JSON.stringify(action, null, 4)}`);
      return state;
    }
  }
};
const useStyles = makeStyles((theme) => {
  console.log(theme.breakpoints.down('md'));
  return {
    root: {
      marginTop: theme.spacing(2),
    },
  };
});
export const CreateOrganizationForm = () => {
  const [localState, dispatch] = useReducer(reducer, defaultState);
  const { root } = useStyles();
  return (
    <Grid container spacing={2} className={root}>
      <Grid item xs={12} sm={10} lg={8}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          label='Organization Name'
          type='text'
          margin='normal'
          value={localState.name}
          onChange={(e) => dispatch({ type: 'SET NAME', payload: e.target.value })}
          disabled={localState.loading}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          label='Description'
          type='textarea'
          margin='normal'
          value={localState.description}
          onChange={(e) => dispatch({ type: 'SET DESCRIPTION', payload: e.target.value })}
          disabled={localState.loading}
          multiline
          rows={4}
        />
        <OrganizationProvider />
      </Grid>
    </Grid>
  );
};
