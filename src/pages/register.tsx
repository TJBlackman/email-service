import React, { useReducer } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { FormFeedback } from '../components/form-feedback';
import { networkRequest } from '../utils/network-request';
import { useRouter } from 'next/router';

const formValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
  error: '',
  success: '',
};

type Action =
  | {
      type:
        | 'SET EMAIL'
        | 'SET PASSWORD'
        | 'SET CONFIRM PASSWORD'
        | 'SET FIRST NAME'
        | 'SET LAST NAME'
        | 'SET ERROR'
        | 'SET SUCCESS';
      payload: string;
    }
  | { type: 'SUBMIT FORM' };

const reducer = (state: typeof formValues, action: Action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'SET EMAIL': {
      newState.email = action.payload;
      return newState;
    }
    case 'SET FIRST NAME': {
      newState.firstName = action.payload;
      return newState;
    }
    case 'SET LAST NAME': {
      newState.lastName = action.payload;
      return newState;
    }
    case 'SET PASSWORD': {
      newState.password = action.payload;
      return newState;
    }
    case 'SET CONFIRM PASSWORD': {
      newState.confirmPassword = action.payload;
      return newState;
    }
    case 'SUBMIT FORM': {
      newState.loading = true;
      newState.error = '';
      newState.success = '';
      return newState;
    }
    case 'SET ERROR': {
      newState.loading = false;
      newState.error = action.payload;
      newState.success = '';
      return newState;
    }
    case 'SET SUCCESS': {
      newState.loading = true;
      newState.error = '';
      newState.success = action.payload;
      return newState;
    }
    default:
      () => console.warn(`Unknown action.type: ${JSON.stringify(action, null, 2)}`);
  }
};

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();
  const [localState, dispatch] = useReducer(reducer, formValues);

  const submit = (e) => {
    e.preventDefault();
    if (localState.password !== localState.confirmPassword) {
      dispatch({ type: 'SET ERROR', payload: 'Password do not match.' });
      return;
    }
    dispatch({ type: 'SUBMIT FORM' });
    networkRequest({
      url: '/api/v1/users',
      method: 'POST',
      body: {
        firstName: localState.firstName,
        lastName: localState.lastName,
        email: localState.email,
        password: localState.password,
      },
      success: (json) => {
        dispatch({ type: 'SET SUCCESS', payload: 'Successfully Registered!' });
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      },
      error: (err) => {
        dispatch({ type: 'SET ERROR', payload: err.message });
      },
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                value={localState.firstName}
                onChange={(e) => dispatch({ type: 'SET FIRST NAME', payload: e.target.value })}
                disabled={localState.loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                value={localState.lastName}
                onChange={(e) => dispatch({ type: 'SET LAST NAME', payload: e.target.value })}
                disabled={localState.loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={localState.email}
                onChange={(e) => dispatch({ type: 'SET EMAIL', payload: e.target.value })}
                disabled={localState.loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={localState.password}
                onChange={(e) => dispatch({ type: 'SET PASSWORD', payload: e.target.value })}
                disabled={localState.loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Confirm Password'
                type='password'
                id='confirm-password'
                autoComplete='confirm-password'
                value={localState.confirmPassword}
                onChange={(e) => dispatch({ type: 'SET CONFIRM PASSWORD', payload: e.target.value })}
                disabled={localState.loading}
              />
            </Grid>
            <Grid item xs={12}>
              <FormFeedback
                success={localState.success}
                error={localState.error}
                clearError={() => dispatch({ type: 'SET ERROR', payload: '' })}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/sign-in' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

// styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));
