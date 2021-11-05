import React, { useState } from 'react';
import {
  Redirect
} from "react-router-dom"
import { register, createCart } from '../api';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const theme = createTheme();

const Register = ({ setAuthenticated, setToken, setUserCart, cart }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

  const createNewCart = async (userId, token) => {
    try {
        const createUserCart = await createCart(userId, token);
        if(createUserCart) {
            setUserCart(createUserCart);
            const cartId = createUserCart.id;
            localStorage.setItem("cartId", cartId);
            console.log("cart created", createUserCart)
        }
    } catch (error) {
        console.error(error)
    }
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
        setError("Passwords Do Not Match")
        return 
    }
    try {
      const data = await register(username, password, email);
      console.log ("USER RESPONSE", data)
      if (data.token) {
        const token = data.token;
        const userId = data.user.id;
        setToken(data.token)
        localStorage.setItem('token', token)
        localStorage.setItem('username', username)
        localStorage.setItem('userDetails', JSON.stringify(data))
        setFormSubmittedSuccessfully(true);
        setAuthenticated(true);
        createNewCart(userId, token)
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  if (formSubmittedSuccessfully && cart) {
    return <Redirect to="/cart" />
  } 
  
  if (formSubmittedSuccessfully && !cart) {
    return <Redirect to="/" />
  }

  return (
    <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://thejewelryshop.s3.us-east-2.amazonaws.com/Logo/Loops%26StringsLogo3.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {error && <h3>{error}</h3>}
                    <Avatar sx={{ m: 1, bgcolor: 'grey' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="emailAddress"
                            label="Email Address"
                            name="emailAddress"
                            autoComplete="emailAddress"
                            autoFocus
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
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
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Confirm Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value)
                            }}
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
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
);
}

export default Register;