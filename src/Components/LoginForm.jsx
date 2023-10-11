import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';

const LoginForm = ({handleModalClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {theme} = useTheme();

    const handleLogin = () => {
        if(!email || !password){
            toast.warning('Please fill all the details!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }

        // firebase authentication function using email and password, if someone login
        auth.signInWithEmailAndPassword(email, password).then((res) => {
            // console.log(auth.currentUser.uid);
            // localStorage.setItem('currentUserId', JSON.stringify(auth.currentUser.uid)); 
            toast.success('Login Successfull!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                handleModalClose();
        }).catch((err) => {
            // console.log(err.code);
            toast.error(errorMapping[err.code] || 'Something went wrong!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })

    }


  return (
    <Box
        p={3}
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: 'white', 
        }}
    >
        <TextField 
            // variant='outlined'
            type='email'
            label='Email'
            onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
            // variant='outlined'
            type='password'
            label='Password'
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button
            variant='contained'
            size='large'
            onClick={handleLogin}
        >Login</Button>
    </Box>
  )
}

export default LoginForm