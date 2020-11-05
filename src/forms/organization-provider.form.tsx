import { Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useReducer } from 'react';
import { SupportedEmailProviders } from '../types';

export type ProviderCredentials = {
  email: string;
  password: string;
  apiKey: string;
  provider: typeof SupportedEmailProviders[number];
};

type Action =
  | { type: 'SET EMAIL'; payload: ProviderCredentials['email'] }
  | { type: 'SET PASSWORD'; payload: ProviderCredentials['password'] }
  | { type: 'SET PROVIDER'; payload: ProviderCredentials['provider'] }
  | { type: 'SET API KEY'; payload: ProviderCredentials['apiKey'] }
  | { type: 'SAVE PROVIDER INFO'; payload: ProviderCredentials }
  | { type: 'DELETE PROVIDER INFO'; payload: ProviderCredentials['apiKey'] };

const defaultState = {
  email: '',
  password: '',
  provider: '',
  apiKey: '',
  savedProviders: new Map<ProviderCredentials['apiKey'], ProviderCredentials>(),
};
type DefaultState = typeof defaultState;
const reducer = (state: DefaultState, action: Action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'SET API KEY': {
      newState.apiKey = action.payload;
      return newState;
    }
    case 'SET EMAIL': {
      newState.email = action.payload;
      return newState;
    }
    case 'SET PASSWORD': {
      newState.password = action.payload;
      return newState;
    }
    case 'SET PROVIDER': {
      newState.provider = action.payload;
      return newState;
    }

    default: {
      console.warn(`Unknown aciton.type:${JSON.stringify(action, null, 4)}`);
      return state;
    }
  }
};

export const OrganizationProvider = () => {
  const [localState, dispatch] = useReducer(reducer, defaultState);
  const number = localState.savedProviders.size;
  return (
    <div style={{}}>
      <Typography variant='body1' paragraph>
        Email API Provider #{number + 1}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl variant='outlined' size='small' fullWidth>
            <InputLabel id='provider-label'>Email Provider</InputLabel>
            <Select
              labelId='provider-label'
              value={localState.provider}
              onChange={(e) =>
                dispatch({ type: 'SET PROVIDER', payload: e.target.value as typeof SupportedEmailProviders[number] })
              }
              label='Email Provider'
            >
              {SupportedEmailProviders.map((i) => (
                <MenuItem value={i} key={i}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            label='API Key'
            type='text'
            value={localState.apiKey}
            onChange={(e) => dispatch({ type: 'SET API KEY', payload: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            label='Email address'
            type='text'
            value={localState.email}
            onChange={(e) => dispatch({ type: 'SET EMAIL', payload: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            label='Password'
            type='text'
            value={localState.password}
            onChange={(e) => dispatch({ type: 'SET PASSWORD', payload: e.target.value })}
          />
        </Grid>
      </Grid>
    </div>
  );
};
