
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from '../authSlice';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { AuthLogin } from 'models';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'components/FormFields';
import { CircularProgress } from '@material-ui/core';
import Copyright from 'components/Common/Copyright';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter email.'),
  password: yup
    .string()
    .required('Please enter password.')
});

const theme = createTheme();

export default function SignIn() {

  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLogin>({
    defaultValues: {
      password: '',
      email: ''
    },
    resolver: yupResolver(schema),
  });


  const handleLoginClick = async (formValues: AuthLogin) => {
    try {
      dispatch(authActions.login({
        username: formValues.email,
        password: formValues.password,
      }))
    } catch (error: any) {
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(handleLoginClick)} style={{width: '100%'}}>

            <InputField name="email" control={control} label="Email" type="email" />

            <InputField name="password" control={control} label="Password" type="password" />
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Sign In

            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <br />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}