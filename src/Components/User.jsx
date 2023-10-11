import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // user icon
import LogoutIcon from '@mui/icons-material/Logout'; // logout icon
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

const User = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();
  const googleProvider = new GoogleAuthProvider(); // google auth instance
  const [user] = useAuthState(auth); // getting user from firebase
  
  const navigate = useNavigate();
  
  // const currentUserId = localStorage.getItem('currentUserId');
  // console.log(currentUserId);

  // modal is the login-signup window, so first for open, second for close the madal
  const handleModalOpen = () => {
    if(user){
      // navigate to the user page
      navigate('/user');
    }
    else{
      //open signup/login popup modal
      setOpen(true);
    }
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  // handling value of tabs which for login or signup
  const handleValueChange = (e, val) => {
    setValue(val);
  };

  // handling google account authentication..
  const handleSigninWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
        toast.success('Google Login Successfull!', {
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
        toast.error(errorMapping[err.code] || 'Google Login Unsuccessfull!', {
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


  //handling logout function
  const logout = () => {
    auth.signOut().then((res) => {
      // localStorage.setItem('currentUserId', null);
      toast.success('Logout Successfull!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }).catch((err) => {
      toast.error('Not able to Logout', {
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
    <div>
      <span className="user-icon">
        <AccountCircleIcon onClick={handleModalOpen} style={{marginInline: "10px", cursor: "pointer"}}/>
        {user && <LogoutIcon onClick={logout} style={{cursor: "pointer"}}/>}
      </span>
      <Modal
        open={open}
        onClose={handleModalClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="userFormContainer">
          <AppBar position="static" style={{ background: "white" }}>
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="fullWidth"
            >
              <Tab label="login"></Tab>
              <Tab label="signup"></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleModalClose={handleModalClose}/>}
          {value === 1 && <SignupForm handleModalClose={handleModalClose}/>}
          <span>OR</span>
          <GoogleButton
            onClick={handleSigninWithGoogle}
            style={{ 
                width: "87%", 
                margin: "20px auto",
                background: theme.background,
                color: theme.timerColor,
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default User;
