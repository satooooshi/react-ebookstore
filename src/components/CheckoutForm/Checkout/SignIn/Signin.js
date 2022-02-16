import * as React from 'react';
//import Button from '@mui/material/Button';
//import CssBaseline from '@mui/material/CssBaseline';
//import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
//import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';
//import Container from '@mui/material/Container';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Checkbox, Link, Grid, Typography, Container, FormControlLabel, CssBaseline, ThemeProvider, TextField,  } from '@material-ui/core';


//const theme = createTheme();

let API_URL=process.env.REACT_APP_DEV_TOKEN_API_URL

async function loginUser(credentials) {
    return fetch(API_URL+'/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }



export default function SignIn({ setToken }) {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for (var value of data.values()) {
        console.log(value);
      }
    // eslint-disable-next-line no-console
    console.log({
      username: data.get('email'),
      password: data.get('password'),
    });
    const token = await loginUser({
        username: data.get('email'),
        password: data.get('password'),
      });
    setToken(token);
  };

  return (
    
    <ThemeProvider >
      {/*<ThemeProvider theme={theme}>*/}
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

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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
              Sign In
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}