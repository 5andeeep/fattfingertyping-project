import React from 'react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const UserInfo = ({totalTests}) => {

    const [user] = useAuthState(auth);

  return (
    <div className='userInfo-component'>
        <div className="userInfoContainer">
            <div className="user-photo">
                <AccountCircleIcon style={{display: 'block', transform: 'scale(7)'}}/>
            </div>
            <div className="user-Info">
                <div className="user-email">
                    {user.email}
                </div>
                <div className="joining-date">
                    {user.metadata.creationTime}
                </div>
            </div>
        </div>
        <div className="total-tests">
            Total Test Taken: {totalTests}
        </div>
    </div>
  )
}

export default UserInfo