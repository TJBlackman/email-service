import React, { useReducer } from 'react';
import {
  Grid,
  makeStyles,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@material-ui/core';
import { IProviderCredentials, SupportedEmailProviders } from '../types';
import { validateNewEmailProviderCredentials, validateNewOrganization } from '../utils/validation/organization-create';

type ProviderCredentials = {
  providerEmail: string;
  providerPassword: string;
  providerAPIKey: string;
  providerName: typeof SupportedEmailProviders[number];
};

const defaultState = {
  name: '',
  description: '',
  providerName: '',
  providerAPIKey: '',
  providerEmail: '',
  providerPassword: '',
  savedProviders: new Map<string, object>(),
  error: '',
  success: '',
  loading: false,
};
type LocalState = typeof defaultState;

type Action =
  | { type: 'SET NAME'; payload: string }
  | { type: 'SET DESCRIPTION'; payload: string }
  | { type: 'SET PROVIDER NAME'; payload: string }
  | { type: 'SET PROVIDER API KEY'; payload: string }
  | { type: 'SET PROVIDER EMAIL'; payload: string }
  | { type: 'SET PROVIDER PASSWORD'; payload: string }
  | { type: 'DELETE PROVIDER CREDS'; payload: ProviderCredentials['providerAPIKey'] }
  | { type: 'SAVE PROVIDER CREDS' }
  | { type: 'CLEAR PROVIDER INPUTS' }
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
    case 'SET PROVIDER NAME': {
      newState.providerName = action.payload;
      return newState;
    }
    case 'SET PROVIDER API KEY': {
      newState.providerAPIKey = action.payload;
      return newState;
    }
    case 'SET PROVIDER EMAIL': {
      newState.providerEmail = action.payload;
      return newState;
    }
    case 'SET PROVIDER PASSWORD': {
      newState.providerPassword = action.payload;
      return newState;
    }
    case 'SAVE PROVIDER CREDS': {
      const { error } = validateNewEmailProviderCredentials({
        providerName: newState.providerName,
        providerAPIKey: newState.providerAPIKey,
        providerEmail: newState.providerEmail,
        providerPassword: newState.providerPassword,
      });
      if (error) {
        alert(error.message);
        return state;
      }
      newState.savedProviders.set(newState.providerAPIKey, {
        providerAPIKey: newState.providerAPIKey,
        providerName: newState.providerName,
        providerEmail: newState.providerEmail,
        providerPassword: newState.providerPassword,
      });
      newState.providerName = '';
      newState.providerAPIKey = '';
      newState.providerEmail = '';
      newState.providerPassword = '';
      return newState;
    }
    case 'DELETE PROVIDER CREDS': {
      newState.savedProviders.delete(action.payload);
      return newState;
    }
    case 'CLEAR PROVIDER INPUTS': {
      newState.providerAPIKey = '';
      newState.providerName = '';
      newState.providerEmail = '';
      newState.providerPassword = '';
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

export const CreateOrganizationForm = () => {
  const [localState, dispatch] = useReducer(reducer, defaultState);
  const { root } = useStyles();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const values = await validateNewOrganization({
        name: localState.name,
        description: localState.description,
        providerCredentials: Array.from(localState.savedProviders.values()) as IProviderCredentials[],
      });
      console.log(values);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Grid container spacing={2} className={root}>
      <Grid item xs={12} sm={10} lg={8} xl={6}>
        <form onSubmit={submit}>
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
          {Array.from(localState.savedProviders.values()).map((provider: ProviderCredentials, index) => {
            return (
              <Box pt={2} key={provider.providerAPIKey}>
                <Typography variant='body1' paragraph>
                  Email API Provider #{index + 1}
                </Typography>
                <Grid container spacing={2} justify='flex-end'>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size='small'
                      variant='outlined'
                      label='Email Provider'
                      type='text'
                      disabled={true}
                      value={provider.providerName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size='small'
                      variant='outlined'
                      label='API Key'
                      type='text'
                      disabled={true}
                      value={provider.providerAPIKey}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size='small'
                      variant='outlined'
                      label='Email address'
                      type='text'
                      disabled={true}
                      value={provider.providerEmail}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size='small'
                      variant='outlined'
                      label='Password'
                      type='text'
                      disabled={true}
                      value={provider.providerPassword}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                    <Button
                      type='button'
                      variant='text'
                      fullWidth
                      onClick={() => dispatch({ type: 'DELETE PROVIDER CREDS', payload: provider.providerAPIKey })}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
          <Box pt={2}>
            <Typography variant='body1'>Add an Email API Provider</Typography>
            <Typography variant='body2' color='textSecondary' paragraph>
              The email provider sends the actual email. Select an supported provider and enter the API key they have
              given you. Email and password are optional; they are meant to help you track multiple accounts. When
              adding multiple accounts, Email Service will rotate the keys to equally disperse outgoing email.
            </Typography>
            <Grid container spacing={1} justify='flex-end'>
              <Grid item xs={12} md={6}>
                <FormControl variant='outlined' size='small' fullWidth>
                  <InputLabel id='provider-label'>Email Provider</InputLabel>
                  <Select
                    labelId='provider-label'
                    value={localState.providerName}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET PROVIDER NAME',
                        payload: e.target.value as typeof SupportedEmailProviders[number],
                      })
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
                  value={localState.providerAPIKey}
                  onChange={(e) => dispatch({ type: 'SET PROVIDER API KEY', payload: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size='small'
                  variant='outlined'
                  label='Email address'
                  type='text'
                  value={localState.providerEmail}
                  onChange={(e) => dispatch({ type: 'SET PROVIDER EMAIL', payload: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size='small'
                  variant='outlined'
                  label='Password'
                  type='text'
                  value={localState.providerPassword}
                  onChange={(e) => dispatch({ type: 'SET PROVIDER PASSWORD', payload: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <Button
                  type='button'
                  variant='text'
                  fullWidth
                  onClick={() => dispatch({ type: 'CLEAR PROVIDER INPUTS' })}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <Button
                  type='button'
                  variant='text'
                  fullWidth
                  color='primary'
                  onClick={() => dispatch({ type: 'SAVE PROVIDER CREDS' })}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box pt={5}>
            <Typography variant='body1' align='right' color='textSecondary' style={{ marginBottom: '5px' }}>
              Save Organization Settings
            </Typography>
            <Grid container direction='row-reverse' justify='flex-start' spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <Button type='submit' variant='contained' color='primary' fullWidth>
                  Save Organization
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <Button type='button' variant='contained' fullWidth>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

// styles
const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(2),
    },
  };
});
