import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {useTheme} from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';

const SignupForm = ({handleModalClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const {theme} = useTheme;

    const handleSignup = () => {
        if(!email || !password || !confirmPass){
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
        if(password !== confirmPass){
            toast.error('Password is not matching!', {
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

        //firebase user creation..
        auth.createUserWithEmailAndPassword(email, password).then((res) => {
            toast.success('User successfully created!', {
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
            toast.error(errorMapping[err.code] || 'Something went wrong, Try again!', {
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
            type='email'
            label='Email'
            onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
            type='password'
            label='Password'
            onChange={(e) => setPassword(e.target.value)}
        />
        <TextField 
            type='password'
            label='Confirm Password'
            onChange={(e) => setConfirmPass(e.target.value)}
        />
        <Button
            variant='contained'
            size='large'
            onClick={handleSignup}
        >Signup</Button>
    </Box>
  )
}

export default SignupForm