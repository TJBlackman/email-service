import React, { useReducer } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const formValues = {
  email: '',
  password: '',
  loading: false,
  error: '',
  success: '',
};

type Action =
  | { type: 'SET EMAIL'; payload: string }
  | { type: 'SET PASSWORD'; payload: string }
  | { type: 'SUBMIT FORM' }
  | { type: 'SHOW ERROR'; payload: string }
  | { type: 'SHOW SUCCESS'; payload: string };

const reducer = (state: typeof formValues, action: Action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'SET EMAIL': {
      newState.email = action.payload;
      return newState;
    }
    case 'SET PASSWORD': {
      newState.password = action.payload;
      return newState;
    }
    case 'SUBMIT FORM': {
      newState.loading = true;
      newState.error = '';
      newState.success = '';
      return newState;
    }
    case 'SHOW ERROR': {
      newState.loading = false;
      newState.error = action.payload;
      newState.success = '';
      return newState;
    }
    case 'SHOW SUCCESS': {
      newState.loading = true;
      newState.error = '';
      newState.success = action.payload;
      return newState;
    }
    default:
      () => console.warn(`Unknown action.type: ${JSON.stringify(action, null, 2)}`);
  }
};

export default function SignIn() {
  const [localState, dispatch] = useReducer(reducer, formValues);
  const classes = useStyles();

  const submit = () => {
    dispatch({ type: 'SUBMIT FORM' });
    console.log(localState);
    fetch(`/api/`);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={localState.email}
            onChange={(e) => dispatch({ type: 'SET EMAIL', payload: e.target.value })}
            disabled={localState.loading}
          />
          <TextField
            variant='outlined'
            margin='normal'
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={localState.loading}
          >
            Sign In
          </Button>
          <Grid container direction='row-reverse'>
            <Grid item>
              <Link href='/register' variant='body2'>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
